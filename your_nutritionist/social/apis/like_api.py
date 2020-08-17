from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from social.models import Like, Comment
from post.models import Post
import json
from social.models import Action
from post.api.post_api import update_post_like

class LikeAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

    def post(self, *args, **kwargs):
        target_id = kwargs['post_id']
        try:
            post_instance = Post.objects.get(id=target_id)
            Like.objects.get_or_create(
                target_post = post_instance,
                from_user = self.request.user
            )
            Action.objects.get_or_create(
                    user = self.request.user,
                    action_type = 8,
                    target_id = target_id
                )
            update_post_like(post_instance)
            return JsonResponse({'status':'ok'}, safe=True)
        except Post.DoesNotExist:
            return JsonResponse({'status': 'No post'}, status=404)
        
        
        
    def delete(self, *args, **kwargs):
        target_id = kwargs['post_id']
        try:
            post_instance = Post.objects.get(id=target_id)
            Like.objects.filter(
                target_post=post_instance,
                from_user=self.request.user
            ).delete()
            Action.objects.filter(
                    user = self.request.user,
                    action_type = 8,
                    target_id = target_id
                ).delete()
            update_post_like(post_instance)
            return JsonResponse({'status':'ok'}, safe=True)
        except Post.DoesNotExist:
            return JsonResponse({'status': 'No post'}, status=404)
        
def get_number_of_like(post_instance):
    return Like.objects.filter(target_post=post_instance).count()