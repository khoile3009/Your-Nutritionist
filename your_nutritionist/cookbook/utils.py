from .models import Recipe, Section, IngredientAmount, Ingredient, Time, Step

def get_recipe_info(recipe_id):
    context = {}
    recipe = Recipe.objects.get(id=recipe_id)
    context['name'] = recipe.name
    context['description'] = recipe.description
    context['number_person'] = recipe.number_person 

    time = Time.objects.get(recipe_id = recipe_id)
    context['time'] = {'prep_time':time.prep_time, 'cook_time': time.cook_time}

   
    sections = Section.objects.filter(recipe_id=recipe_id)

    context['ingredient_sections'] = []
    ingredient_sections = sections.filter(part=0)
    for ingredient_section in ingredient_sections:
        section_id = ingredient_section.id
        context['ingredient_sections'].append({
            'name': ingredient_section.name,
            'ingredients' : []
            })
        ingredient_amounts = IngredientAmount.objects.filter(section_id=section_id)
        for ingredient_amount in ingredient_amounts:
            ingredient = Ingredient.objects.get(id=ingredient_amount.ingredient_id.id)
            context['ingredient_sections'][ingredient_section.order]['ingredients'].append({
                'amount' : ingredient_amount.amount,
                'measurement': ingredient_amount.get_measurement_display(),
                'name': ingredient.name,
                'category': ingredient.get_category_display()
            })
    
    context['step_sections'] = []
    step_sections = sections.filter(part=1)
    for step_section in step_sections:
        section_id = step_section.id
        context['step_sections'].append( {
            'name': step_section.name,
            'steps': []
        })
        steps = Step.objects.filter(section_id=section_id)
        for step in steps:
            context['step_sections'][step_section.order]['steps'].append({
                'order': step.order,
                'direction': step.direction,
                'parallel': step.parallel,
                'time': step.time,
            })
    return context