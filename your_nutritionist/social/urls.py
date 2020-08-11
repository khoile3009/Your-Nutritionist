from django.urls import path
from . import views
from .apis.follow_api import FollowAPI, FollowingAPI,IsFollowingAPI
from .apis.action_api import ActionAPI, FollowingActionAPI
from .apis.rating_api import RatingAPI, get_all_rating, get_total_rating
from .apis.upvote_api import UpvoteAPI, IsUpvotedAPI
from .apis.comment_api import CommentAPI, CommentInfoAPI, ReplyAPI
from .apis.like_api import LikeAPI
from .apis.trending_api import UpdateTrendingAPI, TrendingAPI
from .apis.visit_api import VisitAPI
urlpatterns = [
    path('user/<int:target_id>/follow', FollowAPI.as_view()),
    path('user/<int:from_id>/following', FollowingAPI.as_view()),
    path('user/<int:user_id>/action', ActionAPI.as_view()),
    path('user/<int:target_id>/isfollowing', IsFollowingAPI.as_view()),
    path('user/following/action/', FollowingActionAPI.as_view()) ,


    path('recipe/<int:recipe_id>/rate', RatingAPI.as_view()),
    path('recipe/<int:recipe_id>/rate/total', get_total_rating),
    path('recipe/<int:recipe_id>/rate/all', get_all_rating),

    path('recipe/<int:recipe_id>/upvote', UpvoteAPI.as_view()),
    path('recipe/<int:recipe_id>/upvoted', IsUpvotedAPI.as_view()),

    path('post/<int:post_id>/comment', CommentAPI.as_view()),
    path('comment/<int:comment_id>', CommentInfoAPI.as_view()),
    path('comment/<int:comment_id>/reply', ReplyAPI.as_view()),

    path('post/<int:post_id>/like', LikeAPI.as_view()),

    path('recipe/trending/update', UpdateTrendingAPI.as_view()),
    path('recipe/trending', TrendingAPI.as_view()),

    path('recipe/<int:recipe_id>/visit', VisitAPI.as_view())
    # path('recipe/<int:recipe_id>/israted/<int:user_id>',get_rated)
]   