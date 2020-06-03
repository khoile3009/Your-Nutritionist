from .models import Recipe, Section, IngredientAmount, Step, Ingredient, Media, HashTag
from django.contrib.auth.models import  User
from django.http import Http404
from social.helpers import get_recipe_from_id
from .hashtag import get_hashtag_from_description

# /<int:recipe_id>
def get_recipe_info(recipe_id):
    context = {}
    recipe=None
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        raise Http404("No User")

    context['name'] = recipe.name
    if(recipe.creator):
        context['creator_username'] = recipe.creator.username
        context['creator_id'] = recipe.creator.id
    else:
        context['creator_username'] = None
        context['creator_id'] = None
    context['create_date'] = recipe.created_at.date()
    context['description'] = recipe.description
    context['number_person'] = recipe.number_person 
    context['prep_time'] = recipe.prep_time
    context['cook_time'] = recipe.cook_time
   
    sections = Section.objects.filter(recipe=recipe_id)

    context['ingredient_sections'] = []
    ingredient_sections = sections.filter(part=0)
    for ingredient_section in ingredient_sections:
        section_id = ingredient_section.id
        context['ingredient_sections'].append({
            'name': ingredient_section.name,
            'ingredients' : []
            })
        ingredient_amounts = IngredientAmount.objects.filter(section=section_id)
        for ingredient_amount in ingredient_amounts:
            context['ingredient_sections'][ingredient_section.order]['ingredients'].append(
                {
                    'amount': ingredient_amount.amount,
                    'unit': ingredient_amount.get_unit_display(),
                    'name': ingredient_amount.ingredient.name
                }
            )
    
    context['step_sections'] = []
    step_sections = sections.filter(part=1)
    for step_section in step_sections:
        section_id = step_section.id
        context['step_sections'].append( {
            'name': step_section.name,
            'steps': []
        })
        steps = Step.objects.filter(section=section_id)
        for step in steps:
            context['step_sections'][step_section.order]['steps'].append(
                {
                    'direction': step.direction,
                    'mediaId': step.mediaId,
                    'timestamp': step.timestamp,
                }
            )

    context['media_section'] = []
    media_instances = Media.objects.filter(recipe=recipe_id)
    for media_instance in media_instances:
        context['media_section'].append(
            {
                'url': media_instance.url,
                'mediaId': media_instance.id,
                'type': media_instance.media_type
            }
        )

    return context

def get_media_from_recipe(recipe_id):
    media_instances = Media.objects.filter(recipe=recipe_id)
    context = {'medias': []}
    for media_instance in media_instances:
        context['medias'].append(
            {
                'url': media_instance.url,
                'mediaId': media_instance.id,
                'type': media_instance.media_type
            }
        )
    return context



# /create
def create_recipe(recipe,creator_id, urls):
    #Initialize Recipe
    creator = get_user_from_id(creator_id)
    recipe_instance = Recipe.objects.create(
        name = recipe['name'],
        creator = creator,
        description = recipe['description'],
        number_person = recipe['number_person'],
        prep_time = recipe['prep_time'],
        cook_time = recipe['cook_time']
    )             

    hashtags = get_hashtag_from_description(recipe['description'])

    create_hashtags(recipe_instance, hashtags)


    recipe_id = recipe_instance.id

    #Initialize ingredient_section
    media_id_map = create_media_section(recipe_instance, recipe['medias'], urls)
    create_ingredient_section(recipe_instance, recipe['ingredient_sections'])
    create_step_section(recipe_instance,recipe['step_sections'], media_id_map)
    
    return recipe_id

def create_hashtags(recipe_instance, hashtags):
    for hashtag in hashtags:
        print(hashtag)
        HashTag.objects.create(
            recipe = recipe_instance,
            hashtag = hashtag
        )

def get_user_from_id(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        user = None 
        return user

def create_media_section(recipe_instance, media_section, urls):
    media_id_map = []
    for index in range(len(media_section)):
        media = media_section[index]
        if(media['fileId'] != -1):
            media['url'] = urls[media['fileId']
        ]
        media_instance = Media.objects.create(
            recipe = recipe_instance,
            url = media['url'],
            name = media['name'],
            media_type = media['type'],
            order = index
        )
        media_id_map.append(media_instance.id)
    return media_id_map


def create_ingredient_section(recipe_instance, ingredient_sections):
    for section_order in range(len(ingredient_sections)):
        ingredient_section = ingredient_sections[section_order]
        section_instance = Section.objects.create(
            name = ingredient_section['name'],
            recipe = recipe_instance,
            order = section_order,
            part = 0,
        )
        create_ingredient(section_instance, ingredient_section['ingredients'])
        
def create_step_section(recipe_instance, step_sections, media_id_map):
    for section_order in range(len(step_sections)):
        step_section = step_sections[section_order]
        section_instance = Section.objects.create(
            name= step_section['name'],
            recipe = recipe_instance,
            order = section_order,
            part = 1
        )
        create_steps(section_instance, step_section['steps'],media_id_map)

def create_ingredient(section_instance, ingredients):
    for ingredient_order in range(len(ingredients)):
        ingredient = ingredients[ingredient_order]
        ingredient_instance,_ = Ingredient.objects.get_or_create(name=ingredient['name'])

        IngredientAmount.objects.create(
            section = section_instance,
            amount = ingredient['amount'],
            unit = ingredient['unit'],
            order = ingredient_order,
            ingredient = ingredient_instance
        )

def create_steps(section_instance, steps,media_id_map):
    for step_order  in range(len(steps)):
        step = steps[step_order]
        step_media_id = step['mediaId']
        if(step_media_id != -1):
            step_media_id = media_id_map[step_media_id]
        Step.objects.create(
            order = step_order,
            direction = step['direction'],
            timestamp = step['timestamp'],
            mediaId = step_media_id,
            section = section_instance
        )  

# -------------------------------------------------------------------------------------------------------------------------
# Unit Amount
# -------------------------------------------------------------------------------------------------------------------------

def get_ingredient_unit_choices():
    choices = IngredientAmount._meta.get_field('unit').choices
    units = []
    for choice in choices:
        units.append({
            'index': choice[0],
            'unit': choice[1]
        })
    return {'units': units}


# -------------------------------------------------------------------------------------------------------------------------
# Recipes queries 
# -------------------------------------------------------------------------------------------------------------------------
def get_recipes_with_query(query):
    recipes = Recipe.objects.filter(
        creator=int(query['user_id'])
    )
    context = {'recipe': []}
    for recipe in recipes:
        recipe_info = {}
        recipe_info['name'] = recipe.name
        recipe_info['number_person'] = recipe.number_person
        recipe_info['cook_time'] = recipe.cook_time
        recipe_info['prep_time'] = recipe.prep_time
        recipe_info['recipe_id'] = recipe.id
        recipe_info['likes'] = 10 # add this later
        recipe_info['thumbnail'] = 'https://i.ibb.co/5GWjP9B/gettyimages-157588995-612x612.jpg'
        context['recipe'].append(recipe_info)
    return context
    