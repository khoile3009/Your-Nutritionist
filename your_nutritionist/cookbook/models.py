from django.db import models
from django.contrib.auth.models import  User


# Create your models here.
# class Ingredient(models.Model):
#     name = models.CharField(max_length=100)

#     class Meta:
#         ordering = ['name']

#     def __str__(self):
#         return f'{self.name}'


# class IngredientsNutrition(models.Model):
#     ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
#     calories = models.FloatField()
#     fat = models.FloatField()
#     saturates = models.FloatField()
#     carbs = models.FloatField()
#     sugar = models.FloatField()
#     fibre = models.FloatField()
#     protein = models.FloatField()
#     salt = models.FloatField()

#     class Meta:
#         ordering = ['ingredient_id']

#     def __str__(self):
#         return f'{self.ingredient_id}'


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    creator_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  #Authentication later
    created_at = models.DateTimeField(auto_now_add=True)
    number_person = models.IntegerField()
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()

    description = models.TextField(default='')
    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name}'


class Section(models.Model):
    name = models.CharField(max_length=100, blank=True)
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    order = models.IntegerField()
    PART = (
        (0, 'Ingredients'),
        (1, 'Steps'),
    )
    part = models.IntegerField(choices=PART,)

    class Meta:
        ordering = ['recipe_id', 'part', 'order']

    def __str__(self):
        return f'{self.recipe_id} {self.name} {self.part}'
    
class IngredientAmount(models.Model):
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE)
    description = models.TextField()
    order = models.IntegerField()
    class Meta:
        ordering = ['order']     

    def __str__(self):
        return f'{self.section_id} {self.description}'


class Step(models.Model):
    order = models.IntegerField()
    # time = models.IntegerField()  # in minute
    direction = models.TextField()
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE)
    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.section_id} {self.order}'

class Image(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    path = models.CharField(max_length=300)
    class Meta:
        ordering = ['recipe_id']

    def __str__(self):
        return f'{self.path}'

