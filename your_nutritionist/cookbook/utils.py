from .models import Recipe, Section, IngredientAmount, Ingredient, Time

def get_recipe_info(recipe_id):
    context = {}
    recipe = Recipe.objects.get(id=recipe_id)
    context['recipe'] = recipe.name
    context['description'] = recipe.description
    context['number_person'] = recipe.number_person 

    time = Time.objects.get(recipe_id = recipe_id)
    context['time'] = {'prep_time':time.prep_time, 'cook_time': time.cook_time}

    context['ingredient_sections'] = {}
    sections = Section.objects.filter(recipe_id=recipe_id)
    ingredient_sections = sections.filter(part=0)
    for ingredient_section in ingredient_sections:
        section_id = ingredient_section.id
        context['ingredient_sections'][ingredient_section.order] = {
            'name': ingredient_section.name,
            'ingredients' : []
            }
        ingredient_amounts = IngredientAmount.objects.filter(section_id=section_id)
        for ingredient_amount in ingredient_amounts:
            print(ingredient_amount)
            ingredient = Ingredient.objects.get(id=ingredient_amount.ingredient_id)
            context['ingredient_sections'][ingredient_section.order]['ingredients'].append({
                'amount' : ingredient_amount.amount,
                'measurement': ingredient_amount.measurement,
                'name': ingredient.name,
                'category': ingredient.get_category_display()
            })
        

    step_sections = sections.filter(part=1)