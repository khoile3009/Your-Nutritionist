from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from django.contrib.auth.models import User
import json
from accounts.user import *
class UserInfoAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    def get(self, *args, **kwargs):
        user_id = kwargs['user_id']
        return JsonResponse({},safe=True)

class UserHeadlineAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    def post(self, *args, **kwargs):
        user_instance = self.request.user
        data = json.loads(self.request.body)
        return create_user_headline(user_instance, data['headline'])
        
    
    def put(self, *args, **kwargs):
        user_instance = self.request.user
        data = json.loads(self.request.body)
        return edit_user_headline(user_instance, data['headline'])
        
class UserIntroductionAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    def post(self, *args, **kwargs):
        user_instance = self.request.user
        data = json.loads(self.request.body)
        return create_user_introduction(user_instance, data['introduction'])
        
    
    def put(self, *args, **kwargs):
        user_instance = self.request.user
        data = json.loads(self.request.body)
        return edit_user_introduction(user_instance, data['introduction'])