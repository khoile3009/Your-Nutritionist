from .models import Follow
from accounts.helpers import get_user_from_id
from recipe.helpers import get_recipe_from_id

def get_action_target_name_url(action_type, target_id):
    context = {
            'name': '',
            'image_url': ''
    }
    if(action_type == 0):
        user_instance = get_user_from_id(user_id=target_id)
        if(not user_instance):
            return None
        context = {
            'name': user_instance.get_full_name(),
            'image_url': 'https://i.ibb.co/nQmRB25/cook.jpg'
        }
    elif(action_type == 1):
        recipe_instance = get_recipe_from_id(recipe_id=target_id)
        if(not recipe_instance):
            return None
        context={
            'name': recipe_instance.name,
            'image_url': 'https://i.ibb.co/5GWjP9B/gettyimages-157588995-612x612.jpg'
        }
    elif(action_type == 3):
        recipe_instance = get_recipe_from_id(recipe_id=target_id)
        if(not recipe_instance):
            return None
        context={
            'name': recipe_instance.name,
            'image_url': 'https://i.ibb.co/5GWjP9B/gettyimages-157588995-612x612.jpg'
        }
    return context


def put_rating_into_range(rating):
    return max(1,min(5,int(rating)))