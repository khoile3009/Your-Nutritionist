from .models import Recipe, Section, IngredientAmount, Step

# /<int:recipe_id>
def get_recipe_info(recipe_id):
    context = {}
    recipe = Recipe.objects.get(id=recipe_id)
    context['name'] = recipe.name
    context['description'] = recipe.description
    context['number_person'] = recipe.number_person 
    context['prep_time'] = recipe.prep_time
    context['cook_time'] = recipe.cook_time
   
    sections = Section.objects.filter(recipe_id=recipe_id)

    context['ingredient_sections'] = []
    ingredient_sections = sections.filter(part=0)
    print(len(ingredient_sections))
    for ingredient_section in ingredient_sections:
        section_id = ingredient_section.id
        print(section_id)
        context['ingredient_sections'].append({
            'name': ingredient_section.name,
            'ingredients' : []
            })
        ingredient_amounts = IngredientAmount.objects.filter(section_id=section_id)
        for ingredient_amount in ingredient_amounts:
            context['ingredient_sections'][ingredient_section.order]['ingredients'].append(
                ingredient_amount.description
            )
    
    context['step_sections'] = []
    step_sections = sections.filter(part=1)
    for step_section in step_sections:
        section_id = step_section.id
        print(section_id)
        context['step_sections'].append( {
            'name': step_section.name,
            'steps': []
        })
        steps = Step.objects.filter(section_id=section_id)
        for step in steps:
            context['step_sections'][step_section.order]['steps'].append(
                step.direction,
            )
    return context

# /create
def create_recipe(recipe):
    #Initialize Recipe
    recipe_instance = Recipe.objects.create(
        name = recipe['name'],
        description = recipe['description'],
        number_person = recipe['number_person'],
        prep_time = recipe['prep_time'],
        cook_time = recipe['cook_time']
    )                                                   
    recipe_id = recipe_instance.id

    #Initialize ingredient_section
    create_ingredient_section(recipe_instance, recipe['ingredient_sections'])
    create_step_section(recipe_instance,recipe['step_sections'])
    return recipe_id


def create_ingredient_section(recipe_instance, ingredient_sections):
    for section_order in range(len(ingredient_sections)):
        ingredient_section = ingredient_sections[section_order]
        section_instance = Section.objects.create(
            name = ingredient_section['name'],
            recipe_id = recipe_instance,
            order = section_order,
            part = 0,
        )
        create_ingredient(section_instance, ingredient_section['ingredients'])
        
def create_step_section(recipe_instance, step_sections):
    for section_order in range(len(step_sections)):
        step_section = step_sections[section_order]
        section_instance = Section.objects.create(
            name= step_section['name'],
            recipe_id = recipe_instance,
            order = section_order,
            part = 1
        )
        create_steps(section_instance, step_section['steps'])

def create_ingredient(section_instance, ingredients):
    for ingredient_order in range(len(ingredients)):
        ingredient = ingredients[ingredient_order]
        IngredientAmount.objects.create(
            section_id = section_instance,
            description = ingredient,
            order = ingredient_order
        )

def create_steps(section_instance, steps):
    for step_order  in range(len(steps)):
        step = steps[step_order]
        Step.objects.create(
            order = step_order,
            direction = step,
            section_id = section_instance
        )  




    