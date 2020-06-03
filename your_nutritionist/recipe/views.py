from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .recipe import get_recipe_info, create_recipe, get_recipes_with_query, get_ingredient_unit_choices, get_media_from_recipe

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

import json

def recipe_view(request,*args, **kwargs):
    print(request.method)
    if(request.method == 'GET'):
        recipe_id = kwargs['recipe_id']
        print(recipe_id)
        context = get_recipe_info(recipe_id=recipe_id)
    # ingredient_sections = []
    # for section in sections:
    #     print(section)
        return JsonResponse(context, safe=True)



def get_recipes(request,*args, **kwargs):
    if(request.method == 'GET'):
        query = request.GET
        context = get_recipes_with_query(query)
        return JsonResponse(context, safe=True)

def get_unit_choices(request,*args, **kwargs):
    if(request.method == 'GET'):
        context = get_ingredient_unit_choices()
        return JsonResponse(context, safe=True)

def get_recipe_medias(request, *args, **kwargs):
    if(request.method == 'GET'):
        # print(kwargs['recipe_id'])
        context = get_media_from_recipe(kwargs['recipe_id'])
        return JsonResponse(context, safe=True)