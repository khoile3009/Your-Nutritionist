from recipe.models import Recipe
from django.contrib.auth.models import User
from .models import UserHeadline, UserIntroduction, UserProfilePic
from django.http import Http404
from django.http import HttpResponse, JsonResponse
from social.apis.follow_api import is_following
def get_user_info(user_id,from_user):
    try:
        user_instance = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None
    context = {}
    context['username'] = user_instance.username
    context['user_id'] = user_id
    context['name'] = user_instance.get_full_name()
    context['headline'] = get_headline(user_id)
    if(from_user.is_anonymous):
        context['following'] = False
    else:
        context['following'] = is_following(user_instance, from_user)
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
    
def create_user_headline(user_instance, user_headline):
    try:
        UserHeadline.objects.get(user = user_instance)
        return JsonResponse({'status': 'Already exist'}, status = 405)
    except UserHeadline.DoesNotExist:
        UserHeadline.objects.create(
            user = user_instance,
            headline = user_headline
        )
        return JsonResponse({'headline': user_headline}, safe=True)

def edit_user_headline(user_instance, user_headline):
    try:
        userHeadline_instance = UserHeadline.objects.get(user = user_instance)
        userHeadline_instance.headline = user_headline
        userHeadline_instance.save()
    except UserHeadline.DoesNotExist:
        UserHeadline.objects.create(
            user = user_instance,
            headline = user_headline
        ) 
    return JsonResponse({'headline': user_headline}, safe=True)

def create_user_introduction(user_instance, user_introduction):
    try:
        UserIntroduction.objects.get(user = user_instance)
        return JsonResponse({'status': 'Already exist'}, status = 405)
    except UserIntroduction.DoesNotExist:
        UserIntroduction.objects.create(
            user = user_instance,
            introduction = user_introduction
        )
        return JsonResponse({'introduction': user_introduction}, safe=True)

def edit_user_introduction(user_instance, user_introduction):
    try:
        userIntroduction_instance = UserIntroduction.objects.get(user = user_instance)
        userIntroduction_instance.introduction = user_introduction
        userIntroduction_instance.save()
    except UserIntroduction.DoesNotExist:
        UserIntroduction.objects.create(
            user = user_instance,
            introduction = user_introduction
        ) 
    return JsonResponse({'introduction': user_introduction}, safe=True)


