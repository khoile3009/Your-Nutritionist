from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from django.contrib.auth.models import User
import json

class UserInfoAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

    def get(self, *args, **kwargs):
        user_id = kwargs['user_id']
        return JsonResponse({},safe=True)