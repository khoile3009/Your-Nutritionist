from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .recipe import get_recipe_info, create_recipe

import json

def recipe_view(request,*args, **kwargs):
    if(request.method == 'GET'):
        recipe_id = kwargs['recipe_id']
        context = get_recipe_info(recipe_id=recipe_id)
    # ingredient_sections = []
    # for section in sections:
    #     print(section)
        return JsonResponse(context, safe=True)

@csrf_exempt 
def recipe_create_view(request,*args, **kwargs):
    if(request.method == 'POST'):
        print(request.FILES)
        recipe = json.loads(request.POST['recipe'])
        recipe_id = create_recipe(recipe)

    return JsonResponse({'recipe_id': recipe_id})



