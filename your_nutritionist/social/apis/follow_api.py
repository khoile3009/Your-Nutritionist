from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from social.models import Follow, Action
from accounts.helpers import get_user_from_id
import json

class FollowAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    # serializer_classes = FollowSerializer

    def post(self, *args, **kwargs):
        target_id = kwargs['target_id']
        from_id = self.request.user.id
        target_user = get_user_from_id(user_id=target_id)
        if(not target_user):
            return JsonResponse({'status': 'No recipe'}, status=404)
        from_user = self.request.user
        if(target_id != from_id):
            Follow.objects.get_or_create(
                target_user = target_user,
                from_user = from_user
            )
            Action.objects.get_or_create(
                user = from_user,
                action_type = 0,
                target_id = target_id
            )
            return JsonResponse({'status':'ok'}, safe=True)
        else:
            return JsonResponse({'status':'Cannot self-follow'}, status=405)


    def delete(self, *args, **kwargs):
        target_id = kwargs['target_id']
        from_id = self.request.user.id
        target_user = get_user_from_id(user_id=target_id)
        if(not target_user):
            return JsonResponse({'status': 'No recipe'}, status=404)
        from_user = self.request.user
        if(target_id != from_id):
            Follow.objects.filter(
                target_user = target_user,
                from_user = from_user
            ).delete()
            Action.objects.filter(
                user = from_user,
                action_type = 0,
                target_id = target_id
            ).delete()
            return JsonResponse({'status':'ok'}, safe=True)
        else:
            return JsonResponse({'status':'Cannot self-follow'}, status=405)
        

    def get(self, *args, **kwargs):
        target_id = kwargs['target_id']
        target_user = get_user_from_id(user_id=target_id)
        if(not target_user):
            return JsonResponse({'status': 'No recipe'}, status=404)
        context = {'followers':[]}
        follow_instances = Follow.objects.filter(target_user = target_user)
        for follow_instance in follow_instances:
            context['followers'].append(
                {
                    'id': follow_instance.from_user.id,
                    'username': follow_instance.from_user.username,
                    'profile_pic': 'https://i.ibb.co/nQmRB25/cook.jpg'
                }
            )
        return JsonResponse(context, safe=True)

class FollowingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, *args, **kwargs):
        from_id = kwargs['from_id']
        from_user = get_user_from_id(user_id=from_id)
        if(not from_user):
            return JsonResponse({'status': 'No recipe'}, status=404)
        context = {'followings':[]}
        follow_instances = Follow.objects.filter(from_user = from_user)
        for follow_instance in follow_instances:
            context['followings'].append(
                {
                    'id': follow_instance.target_user.id,
                    'username': follow_instance.target_user.username,
                    'profile_pic': 'https://i.ibb.co/nQmRB25/cook.jpg'
                }
            )
        return JsonResponse(context, safe=True)

class IsFollowingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, *args, **kwargs):
        target_id = kwargs['target_id']
        target_user = get_user_from_id(user_id=target_id)
        if(not target_user):
            return JsonResponse({'status': 'No recipe'}, status=404)
        from_user = self.request.user
        if(target_id != from_user.id):
            if(Follow.objects.filter(
                    target_user = target_user,
                    from_user = from_user
                ).exists()):
                return JsonResponse({'following': True}, safe=True)
            else:
                return JsonResponse({'following': False}, safe=True)
        else:
            return JsonResponse({'following': False}, safe=True)

