from django.urls import path
from . import views
from .api.post_api import PostCreateAPI, PostAPI

urlpatterns = [
    path('create', PostCreateAPI.as_view()),
    path('<int:post_id>', PostAPI.as_view())
]