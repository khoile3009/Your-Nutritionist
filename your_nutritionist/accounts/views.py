from django.shortcuts import render
from .user import *
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

import json

# Create your views here.

def user_info_view(request, *args, **kwargs):
    if(request.method == 'GET'):
        user_id = kwargs['user_id']
        context = get_user_info(user_id)
        if(not context):
            return JsonResponse({'status': 'No user'}, status=404)
        return JsonResponse(context,safe=True)

def user_recipes_view(request, *args, **kwargs):
    if(request.method == 'GET'):
        user_id = kwargs['user_id']
        context = get_user_recipes(user_id)
        return JsonResponse(context,safe=True)


@csrf_exempt
@permission_classes([IsAuthenticated])
def set_user_headline(request, *args, **kwargs):
    if(request.method == 'POST'):
        user_id = kwargs['user_id']
        data = json.loads(request.body)
        create_user_headline(user_id, data['headline'])
        return JsonResponse({'status': 'ok'}, safe=True)

@csrf_exempt
@permission_classes([IsAuthenticated])
def set_user_introduction(request, *args, **kwargs):
    if(request.method == 'POST'):
        user_id = kwargs['user_id']
        data = json.loads(request.body)
        create_user_introduction(user_id, data['introduction'])
        return JsonResponse({'status': 'ok'}, safe=True)

def user_introduction_view(request, *args, **kwargs):
    if(request.method == 'GET'):
        user_id = kwargs['user_id']
        context = {'introduction':get_introduction(user_id)}
        return JsonResponse(context, safe=True)

