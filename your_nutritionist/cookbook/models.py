from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    CATEGORY_CHOICE = (
        (1, 'Fruit'),
        (2, 'Vegetable'),
        (3, 'Protein'),
        (4, 'Dairy'),
        (5, 'Grains'),
        (6, 'Oils'),
        (7, 'Seasoning'),
        (8, 'Spice'),
        (9, 'Other'),
        
    )
    category = models.IntegerField(choices=CATEGORY_CHOICE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name}'


class IngredientsNutrition(models.Model):
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    calories = models.FloatField()
    fat = models.FloatField()
    saturates = models.FloatField()
    carbs = models.FloatField()
    sugar = models.FloatField()
    fibre = models.FloatField()
    protein = models.FloatField()
    salt = models.FloatField()

    class Meta:
        ordering = ['ingredient_id']

    def __str__(self):
        return f'{self.ingredient_id}'


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    # creator_id = models.ForeignKey('User')  #Authentication later
    number_person = models.IntegerField()
    description = models.TextField(default='')
    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name}'

class Time(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()

    class Meta:
        ordering = ['recipe_id', 'cook_time']

    def __str__(self):
        return f'{self.recipe_id}'

class Section(models.Model):
    name = models.CharField(max_length=100)
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
    amount = models.FloatField()
    MEASUREMENT = (
        (0, 'weight'),
        (1, 'volume'),
        (2, 'piece')
    )
    measurement = models.IntegerField(choices=MEASUREMENT)
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        ordering = ['amount']
        

    def __str__(self):
        return f'{self.section_id} {self.ingredient_id}'


class Step(models.Model):
    order = models.IntegerField()
    time = models.IntegerField()  # in minute
    direction = models.TextField()
    parallel = models.BooleanField(default=False)
    section_id = models.ForeignKey(Section, on_delete=models.CASCADE)
    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.section_id} {self.order}'




