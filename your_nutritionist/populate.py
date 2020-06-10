from recipe.models import Recipe, Ingredient
from social.models import Action
import random
from recipe.recipe import create_recipe
from django.contrib.auth.models import  User

def main():
    print('a')


def populate_user():
    pass

def get_random_sentence(min_length, max_length):
    length = random.randint(min_length, max_length)
    lorem_ipsum = 'Lorem ipsum dolor #sit amet, conse#tetur adipis#cing el#it. Nam la#cinia neque ut a#nte interdum dignissim. Donec nec mi vel magna mollis consequat. In scelerisque turpis eu tincidunt ultricies. Donec at pretium enim. Maecenas tempor finibus diam vitae eleifend. Fusce eu convallis mi, non lobortis lorem. Proin porta ligula et ante elementum blandit. Quisque ullamcorper magna erat, a pharetra orci tempus quis. Duis vel accumsan mi, ut finibus nulla. Mauris eleifend turpis vel nunc placerat, quis semper eros posuere. Nulla sed sapien volutpat, malesuada lectus a, tempor arcu. In aliquam #ultricies eros, vitae luct#us mi congue sed. Cras vulputate, turpis nec faucibus ultricies, ligula sem feugiat est, at fermentum magna dolor id tortor. Et#iam urna felis, viverra nec ef#ficitur sed, pla#cerat vel erat.'
    start_index = random.randint(0, len(lorem_ipsum) - length)
    return lorem_ipsum[start_index: start_index + length]





def populate_recipe(number_of_recipe):
    for recipe_index in range(number_of_recipe):
        context = {}
        context['name'] = get_random_sentence(8, 30)
        context['description'] = get_random_sentence(100,200)
        context['number_person'] = random.randint(1,10)
        context['cook_time'] = random.randint(0,100)
        context['prep_time'] = random.randint(0,100)
        context['ingredient_sections'] = []
        for ingredient_section_index in range(random.randint(1,3)):
            context['ingredient_sections'].append(
                {
                    'name': get_random_sentence(0,20),
                    'ingredients': []
                }
            )
            for ingredient_index in range(random.randint(1,5)):
                context['ingredient_sections'][ingredient_section_index]['ingredients'].append(
                    {
                        'amount': random.randint(1, 100),
                        'unit': random.randint(0,10),
                        'name': get_random_sentence(10,20)
                    }
                )
        context['step_sections'] = []
        context['medias'] = []
        recipe_id = create_recipe(context, 1, [])
        user_instance = User.objects.get(id=1)
        Action.objects.create(
            user = user_instance,
            action_type = 3,
            target_id = recipe_id
        )

if __name__ == '__main__':
    main()
