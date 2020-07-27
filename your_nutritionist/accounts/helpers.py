from django.contrib.auth.models import User
from .models import UserProfilePic
from django.http import Http404


def get_user_from_id(user_id):
    try: 
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None

def get_profile_pic(user_id):
    try:
        user_instance = User.objects.get(id = user_id)
        profile_pic_instance = UserProfilePic.objects.get(user = user_instance)
        return profile_pic_instance.url
    except User.DoesNotExist:
        return ''
    except UserProfilePic.DoesNotExist:
        return ''
        