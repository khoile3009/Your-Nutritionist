from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import get_recipe_info

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
        print('post')
    
    return HttpResponse('<h1>Post request</h1>')



