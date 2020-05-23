from django.urls import path
from . import views
from .apis.follow_api import FollowAPI, FollowingAPI,IsFollowingAPI
from .apis.action_api import ActionAPI
from .apis.rating_api import RatingAPI, get_all_rating, get_total_rating
urlpatterns = [
    path('user/<int:target_id>/follow', FollowAPI.as_view()),
    path('user/<int:from_id>/following', FollowingAPI.as_view()),
    path('user/<int:user_id>/action', ActionAPI.as_view()),
    path('user/<int:target_id>/isfollowing', IsFollowingAPI.as_view()),


    path('recipe/<int:recipe_id>/rate', RatingAPI.as_view()),
    path('recipe/<int:recipe_id>/rate/total', get_total_rating),
    path('recipe/<int:recipe_id>/rate/all', get_all_rating)
]