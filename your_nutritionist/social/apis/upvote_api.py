from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from social.models import Follow, Action, Upvote
from accounts.helpers import get_user_from_id
from recipe.helpers import get_recipe_from_id
import json
from recipe.models import Recipe


class UpvoteAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        from_id = self.request.user.id
        target_recipe = get_recipe_from_id(recipe_id)
        from_user = self.request.user
        if(not target_recipe):
            return JsonResponse({'status': 'No recipe'}, status=404)
        if(target_recipe.creator.id != from_id):
            print(Upvote.objects.get_or_create(
                target_recipe=target_recipe,
                from_user=from_user
            ))
            Action.objects.get_or_create(
                user=from_user,
                action_type=4,
                target_id=recipe_id
            )
            return JsonResponse({'status': 'ok'}, safe=True)
        else:
            return JsonResponse({'status': 'Cannot self-upvote'}, status=405)

    def delete(self, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        from_id = self.request.user.id
        target_recipe = get_recipe_from_id(recipe_id)
        from_user = self.request.user
        if(not target_recipe):
            return JsonResponse({'status': 'No recipe'}, status=404)
        if(target_recipe.creator.id != from_id):
            Upvote.objects.filter(
                target_recipe=target_recipe,
                from_user=from_user
            ).delete()
            Action.objects.filter(
                target_id=recipe_id,
                user=from_user,
                action_type=4
            ).delete()
            return JsonResponse({'status': 'ok'}, safe=True)
        else:
            return JsonResponse({'status': 'Cannot self-rate'}, status=405)


class IsUpvotedAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        from_id = self.request.user.id
        target_recipe = get_recipe_from_id(recipe_id)
        from_user = self.request.user
        if(not target_recipe):
            return JsonResponse({'status': 'No recipe'}, status=404)
        return JsonResponse({'upvoted': get_is_upvoted(target_recipe, self.request.user)},safe=True)

def get_number_upvote(recipe_id):
    try:
        recipe_instance = Recipe.objects.get(id = recipe_id)
        return Upvote.objects.filter(target_recipe=recipe_instance).count()
    except Recipe.DoesNotExist:
        return 0

def get_is_upvoted(recipe_instance, user_instance):
    if(user_instance.is_anonymous):
        return False
    if(not recipe_instance):
        return False
    if(recipe_instance.creator.id != user_instance.id):
        if(Upvote.objects.filter(
            target_recipe=recipe_instance,
            from_user=user_instance
        ).exists()):
            return True
        else:
            return False
    else:
        return False