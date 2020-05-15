from django.contrib import admin

from .models import IngredientAmount,Recipe, Step,Section

# Register your models here.
# admin.site.register(Ingredient)
admin.site.register(IngredientAmount)
admin.site.register(Recipe)
admin.site.register(Step)
admin.site.register(Section)
