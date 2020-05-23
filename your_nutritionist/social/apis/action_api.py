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
        context = {'actions': []}
        action_instances = Action.objects.filter(user = user)
        for action_instance in action_instances:
            target_name_image = get_action_target_name_url(
                action_type=action_instance.action_type,
                target_id=action_instance.target_id
                )
            context['actions'].append({
                'from_name': action_instance.user.get_full_name(),
                'from_id': action_instance.user.id,
                'type' : action_instance.action_type,
                'id': action_instance.target_id,
                'target_name': target_name_image['name'],
                'image_url': target_name_image['image_url']
            })
        return JsonResponse(context, safe=True)

    