from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from social.models import Action
from .recipe import create_recipe
import json


class RecipeAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, *args, **kwargs):
        recipe = json.loads(self.request.POST['recipe'])
        recipe_id = create_recipe(recipe, self.request.user.id)
        Action.objects.create(
            user = self.request.user,
            action_type = 3,
            target_id = recipe_id
        )
        return JsonResponse({'recipe_id': recipe_id})