from django.urls import path
from . import views

urlpatterns = [
    path('recipe/<int:recipe_id>/', views.recipe_view),
    path('recipe/create', views.recipe_create_view)
]