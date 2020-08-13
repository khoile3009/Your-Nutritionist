from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from .profile_pic import get_user_profile_picture, ProfilePicAPI
from . import views
from .apis.user_info_api import UserHeadlineAPI, UserIntroductionAPI, UserInfoAPI

urlpatterns = [
  path('auth/', include('knox.urls')),
  path('auth/register', RegisterAPI.as_view()),
  path('auth/signin', LoginAPI.as_view()),
  path('auth/user', UserAPI.as_view()),
  path('auth/signout', knox_views.LogoutView.as_view(), name='knox_logout'),

  path('<int:user_id>/info', UserInfoAPI.as_view()),
  path('headline', UserHeadlineAPI.as_view()),
  # path('<int:user_id>/headline/set', view.set_user_headline)
  path('introduction', UserIntroductionAPI.as_view()),
  path('<int:user_id>/introduction', views.user_introduction_view),

  path('<int:user_id>/profilepic', get_user_profile_picture),
  path('profilepic', ProfilePicAPI.as_view())
]