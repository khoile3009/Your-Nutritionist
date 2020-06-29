from .models import Recipe
from django.http import Http404


def get_recipe_from_id(recipe_id):
    try:
        return Recipe.objects.get(id = recipe_id)
    except Recipe.DoesNotExist:
        return None