from recipe.models import Recipe
from django.contrib.auth.models import User
from .models import UserHeadline, UserIntroduction, UserProfilePic
from django.http import Http404

def get_user_info(user_id):
    try:
        user_instance = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None
    context = {}
    context['username'] = user_instance.username
    context['user_id'] = user_id
    context['name'] = user_instance.get_full_name()
    context['headline'] = get_headline(user_id)
    try:
        context['profilepic'] = UserProfilePic.objects.get(user = user_instance).url
    except:
        context['profilepic'] = ''
    # context
    return context
    


def get_user_recipes(user_id, queries):
    user_recipes = Recipe.objects.filters(user_id)
    context = {}

    return context

def get_headline(user_id):
    try:
        user_headline_instance = UserHeadline.objects.get(user = user_id)
        return user_headline_instance.headline
    except:
        return ''

def get_introduction(user_id):
    try:
        user_introduction_instance = UserIntroduction.objects.get(user = user_id)
        return user_introduction_instance.introduction
    except:
        return ''
    
def create_user_headline(user_id, user_headline):
    user_instance = User.objects.get(id = user_id)
    UserHeadline.objects.create(
        user = user_instance,
        headline = user_headline
    )

def create_user_introduction(user_id, user_introduction):
    user_instance = User.objects.get(id = user_id)
    UserIntroduction.objects.create(
        user = user_instance,
        introduction = user_introduction
    )
