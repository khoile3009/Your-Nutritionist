from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Follow, Action

import json


@permission_classes([IsAuthenticated])
@csrf_exempt
def follow_api(request, *args, **kwargs):

    if(request.method == 'POST'):
        data = json.loads(request.body)
        print(request.user)

    elif(request.method == 'DELETE'):
        pass

def follow(target_id, from_id):
    Follow.objects.create(
        target_user = target_id,
        from_user = from_id
    )
    Action.objects.create(
        user = from_id,
        action_type = 0,
        target_id = target_id
    )
    return JsonResponse({'status':'OK'}, safe=True)

def unfollow(target_id, from_id):
    Follow.objects.get(
        
    )