from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from . import views

urlpatterns = [
  path('auth/', include('knox.urls')),
  path('auth/register', RegisterAPI.as_view()),
  path('auth/signin', LoginAPI.as_view()),
  path('auth/user', UserAPI.as_view()),
  path('auth/signout', knox_views.LogoutView.as_view(), name='knox_logout'),

  path('<int:user_id>/info', views.user_info_view),
  path('<int:user_id>/headline', views.set_user_headline),
  path('<int:user_id>/introduction/set', views.set_user_introduction),
  path('<int:user_id>/introduction', views.user_introduction_view)
]