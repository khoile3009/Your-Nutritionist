from django.contrib import admin

from .models import Ingredient,IngredientAmount,Recipe, Step,Section,Time

# Register your models here.
admin.site.register(Ingredient)
admin.site.register(IngredientAmount)
admin.site.register(Recipe)
admin.site.register(Step)
admin.site.register(Section)
admin.site.register(Time)
