from django.urls import path
from . import views
from .recipe_api import *
urlpatterns = [
    path('<int:recipe_id>/info', views.recipe_view),
    path('create', RecipeCreateAPI.as_view()),
    path('', views.get_recipes_views),
    path('<int:recipe_id>', RecipeAPI.as_view()),
    path('<int:recipe_id>/media', views.get_recipe_medias)
]