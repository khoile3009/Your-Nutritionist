from django.shortcuts import render
from django.http import HttpResponse

from .utils import get_recipe_info


def recipe_view(request,*args, **kwargs):
    recipe_id = kwargs['recipe_id']
    context = get_recipe_info(recipe_id=recipe_id)
    # ingredient_sections = []
    # for section in sections:
    #     print(section)
    return HttpResponse('<h1>Hello</h1>')



