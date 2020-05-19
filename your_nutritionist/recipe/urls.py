from django.urls import path
from . import views

urlpatterns = [
    path('<int:recipe_id>/info', views.recipe_view),
    path('create', views.recipe_create_view),
    path('', views.get_recipes)
]