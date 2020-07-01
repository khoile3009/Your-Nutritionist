from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from social.models import Action
from .recipe import create_recipe, edit_recipe, get_recipe
import json
from .files import GCLOUD
from .models import Recipe
from django.views.decorators.csrf import csrf_exempt
from .helpers import get_recipe_from_id
class RecipeCreateAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, *args, **kwargs):
        recipe = json.loads(self.request.POST['recipe'])
        media_ids_map = [media['fileId'] if(media['type'] in [1,3]) else None for media in recipe["medias"]]
        urls = GCLOUD.upload_and_return_url(self.request.user.id,self.request.FILES, media_ids_map)
        recipe_id = create_recipe(recipe, self.request.user.id, urls)
        Action.objects.create(
            user = self.request.user,
            action_type = 3,
            target_id = recipe_id
        )
        return JsonResponse({'recipe_id': recipe_id})


class RecipeAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def delete(self, *args, **kwargs):
        user_id = self.request.user
        recipe_id =  kwargs['recipe_id']
        recipe = get_recipe_from_id(recipe_id)
        if(not recipe):
            return JsonResponse({'status': 'No recipe'}, status=404)
        if(user_id != recipe.creator.id):
            return JsonResponse({'status': 'Not Allowed'}, status=405)
        recipe.delete()
        return JsonResponse({'status': 'Deleted'})

    def put(self, *args, **kwargs):
        print(self.request.POST)
        user_id = self.request.user
        recipe = json.loads(self.request.PUT['recipe'])
        recipe_id =  kwargs['recipe_id']
        recipe_instance = get_recipe_from_id(recipe_id)
        if(not recipe_instance):
            return JsonResponse({'status': 'No recipe'}, status=404)
        if(user_id != recipe_instance.creator):
            return JsonResponse({'status': 'Not Allowed'}, status=405)
        edit_recipe(recipe, recipe_instance)

<<<<<<< HEAD
    def get(self, *args, **kwargs):
        user_id = self.request.user
        recipe = json.loads(self.request.POST['recipe'])
=======
class RecipeEditable(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, *args, **kwargs):
        user_id = self.request.user
>>>>>>> backend
        recipe_id =  kwargs['recipe_id']
        recipe_instance = get_recipe_from_id(recipe_id)
        if(not recipe_instance):
            return JsonResponse({'status': 'No recipe'}, status=404)
<<<<<<< HEAD
        if(user_id != recipe_instance.creator.id):
            return JsonResponse({'status': 'Not Allowed'}, status=405)
=======
        if(user_id != recipe_instance.creator):
            return JsonResponse({'status': 'Not Allowed'}, status=405)    
        return JsonResponse({'status': 'ok'})
>>>>>>> backend
