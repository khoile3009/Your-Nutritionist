from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from social.models import Rating, Action
from recipe.helpers import get_recipe_from_id
from social.helpers import put_rating_into_range
from accounts.helpers import get_user_from_id
from django.db.models import Sum
import json


class RatingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        rater = self.request.user
        data = json.loads(self.request.body)
        recipe = get_recipe_from_id(recipe_id)
        if not Rating.objects.filter(recipe=recipe, rater=rater).exists():
            Rating.objects.get_or_create(
                recipe=recipe,
                rating=put_rating_into_range(data['rating']),
                comment=data['comment'],
                rater=rater
            )
            Action.objects.get_or_create(
                user=rater,
                action_type=1,
                target_id=recipe_id
            )
        return JsonResponse({'status': 'ok'}, safe=True)

    def delete(self, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        rater = self.request.user
        recipe = get_recipe_from_id(recipe_id)
        Rating.objects.filter(
            recipe=recipe,
            rater=rater
        ).delete()
        Action.objects.filter(
            user=rater,
            action_type=1,
            target_id=recipe_id
        ).delete()
        return JsonResponse({'status': 'ok'}, safe=True)

    def put(self, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        rater = self.request.user
        data = json.loads(self.request.body)
        recipe = get_recipe_from_id(recipe_id)
        try:
            rating_instance = Rating.objects.get(
                recipe=recipe,
                rater=rater
            )
            rating_instance.rating = put_rating_into_range(data['rating'])
            rating_instance.comment = data['comment']
            rating_instance.save()
        except Rating.DoesNotExist:
            rating_instance = Rating.objects.create(
                recipe=recipe,
                rating=put_rating_into_range(data['rating']),
                comment=data['comment'],
                rater=rater
            )
            Action.objects.get_or_create(
                user=rater,
                action_type=1,
                target_id=recipe_id
            )
        return JsonResponse({'status': 'ok'}, safe=True)

def get_all_rating(request, *args, **kwargs):
    recipe_id = kwargs['recipe_id']
    recipe = get_recipe_from_id(recipe_id)
    context = {'ratings': []}
    rating_instances = Rating.objects.filter(
        recipe = recipe
    )
    for rating_instance in rating_instances:
        context['ratings'].append({
            'rating': rating_instance.rating,
            'comment': rating_instance.comment,
            'name': rating_instance.rater.get_full_name(),
            'user_id': rating_instance.rater.id
        })
    return JsonResponse(context, safe=True)

def get_total_rating(request, *args, **kwargs):
    recipe_id = kwargs['recipe_id']
    recipe = get_recipe_from_id(recipe_id)
    rating_instances = Rating.objects.filter(
        recipe = recipe
    )
    context = {
        'total_rating' :rating_instances.aggregate(Sum('rating'))['rating__sum'],
        'number_rating' :rating_instances.count()
    }
    return JsonResponse(context, safe=True)


def get_rated(request, *args, **kwargs):
    if(request.method == 'GET'):
        recipe_id = kwargs['recipe_id']
        user_id = kwargs['user_id']
        recipe = get_recipe_from_id(recipe_id)
        user = get_user_from_id(user_id)
        
        if(recipe.creator.id != user_id):
            print(Rating.objects.filter(
                recipe = recipe,
                rater = user
            ).count())
            if Rating.objects.filter(
                recipe = recipe,
                rater = user
            ).exists():
                rating_instance = Rating.objects.get(recipe = recipe, rater=user)
                return JsonResponse({
                    'rated': True,
                    'rating': rating_instance.rating,
                    'comment': rating_instance.comment
                }, safe=True)
            else:
                return JsonResponse({'rated': False}, safe=True)
        else:
            return JsonResponse({'rated': False}, safe=True)


