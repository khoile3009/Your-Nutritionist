from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from social.models import Follow, Action
from accounts.helpers import get_user_from_id
from social.helpers import get_action_target_name_url

import json

class ActionAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, *args, **kwargs):
        user_id = kwargs['user_id']
        user = get_user_from_id(user_id=user_id)
        if(not user):
            return JsonResponse({'status': 'No user'}, status=404)
        context = {'actions': []}
        action_instances = Action.objects.filter(user = user)
        for action_instance in action_instances:
            target_name_image = get_action_target_name_url(
                action_type=action_instance.action_type,
                target_id=action_instance.target_id
                )
            context['actions'].append({
                'action_id': action_instance.id,
                'from_name': action_instance.user.get_full_name(),
                'from_id': action_instance.user.id,
                'type' : action_instance.action_type,
                'target_id': action_instance.target_id,
                'target_name': target_name_image['name'],
                'image_url': target_name_image['image_url']
            })
        return JsonResponse(context, safe=True)

class FollowingActionAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, *args, **kwargs):
        before_id = -1
        number_actions = 20
        if(self.request.GET.get('before_id')):
            before_id = int(self.request.GET.get('before_id'))
        if(self.request.GET.get('num')):
           number_actions = int(self.request.GET.get('num'))
        user = self.request.user
        following_instance = Follow.objects.filter(from_user=user)
        following_user_ids = following_instance.values_list('target_user__id',flat=True)
        if(before_id != -1):
            action_instances = Action.objects.filter(
                user__id__in=following_user_ids,
                id__lt = before_id
                ).order_by('-done_at')
        else:
            action_instances = Action.objects.filter(
                user__id__in=following_user_ids,
                ).order_by('-done_at')
        context = {'actions': []}
        for action_index in range(min(len(action_instances), number_actions)):
            action_instance = action_instances[action_index]
            target_name_image = get_action_target_name_url(
                action_type=action_instance.action_type,
                target_id=action_instance.target_id
                )
            context['actions'].append({
                'action_id': action_instance.id,
                'from_name': action_instance.user.get_full_name(),
                'from_id': action_instance.user.id,
                'type' : action_instance.action_type,
                'target_id': action_instance.target_id,
                'target_name': target_name_image['name'],
                'image_url': target_name_image['image_url']
            })
        return JsonResponse(context, safe=True)