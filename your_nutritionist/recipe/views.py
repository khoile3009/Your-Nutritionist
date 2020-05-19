from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .recipe import get_recipe_info, create_recipe, get_recipes_with_query
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

@csrf_exempt
@permission_classes([IsAuthenticated])
def recipe_create_view(request,*args, **kwargs):
    if(request.method =='POST' or request.method == 'OPTIONS'):
        print(request.FILES)
        recipe = json.loads(request.POST['recipe'])
        recipe_id = create_recipe(recipe)

    return JsonResponse({'recipe_id': recipe_id})

def get_recipes(request,*args, **kwargs):
    if(request.method == 'GET'):
        query = request.GET
        context = get_recipes_with_query(query)
        return JsonResponse(context, safe=True)