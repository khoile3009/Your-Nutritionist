from django.contrib import admin

from .models import Recipe, Step,Section, Ingredient

# Register your models here.
# admin.site.register(Ingredient)
admin.site.register(Ingredient)
admin.site.register(Recipe)
admin.site.register(Step)
admin.site.register(Section)
