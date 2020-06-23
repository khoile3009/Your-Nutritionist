from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .recipe import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

import json

def recipe_view(request,*args, **kwargs):
    if(request.method == 'GET'):
        recipe_id = kwargs['recipe_id']
        context = get_recipe_info(recipe_id=recipe_id)
    # ingredient_sections = []
    # for section in sections:

        return JsonResponse(context, safe=True)



def get_recipes_views(request,*args, **kwargs):
    if(request.method == 'GET'):
        if(request.GET.get('user_id') != None):
            user_id = int(request.GET['user_id'])
            context = get_recipes_from_user_id(user_id, int(request.GET.get('block')))
        else:
            query = request.GET.get('query')
            if(query == None):
                context = {}
            else:
                context = get_recipes_from_query(query, int(request.GET.get('block')))
        return JsonResponse(context, safe=True)

def get_unit_choices(request,*args, **kwargs):
    if(request.method == 'GET'):
        context = get_ingredient_unit_choices()
        return JsonResponse(context, safe=True)

def get_recipe_medias(request, *args, **kwargs):
    if(request.method == 'GET'):
        context = get_media_from_recipe(kwargs['recipe_id'])
        return JsonResponse(context, safe=True)
