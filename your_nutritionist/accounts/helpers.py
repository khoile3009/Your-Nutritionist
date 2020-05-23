from django.contrib.auth.models import User
from django.http import Http404


def get_user_from_id(user_id):
    try: 
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise Http404('No User')