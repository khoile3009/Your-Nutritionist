from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from social.models import Follow, Action, Upvote
from accounts.helpers import get_user_from_id
from recipe.helpers import get_recipe_from_id
import json

class UpvoteAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    def post(self, *args, **kwargs):
        target_id = kwargs['target_id']
        from_id = self.request.user.id
        target_user = get_recipe_from_id(from_id)