from django.urls import path
from . import views
from .follow_api import follow_api

urlpatterns = [
    path('user/<int:target_id>/follow', follow_api)
]