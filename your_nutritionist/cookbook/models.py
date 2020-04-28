from django.db import models


# Create your models here.
class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    CATEGORY_CHOICE = (
        (1, 'Fruit'),
        (2, 'Vegetable'),
        (3, 'Protein'),
        (4, 'Dairy'),
        (5, 'Grains'),
        (6, 'Oils')
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
    cook_time = models.IntegerField()
    # creator_id = models.ForeignKey('User')  #Authentication later
    number_person = models.IntegerField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.name}'


class IngredientAmount(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    amount = models.FloatField()
    MEASUREMENT = (
        (0, 'weight'),
        (1, 'volume')
    )
    measurement = models.BinaryField(choices=MEASUREMENT)
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    class Meta:
        ordering = ['amount']

    def __str__(self):
        return f'{self.recipe_id} {self.ingredient_id}'


class Step(models.Model):
    order = models.IntegerField()
    time = models.IntegerField()  # in minute
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.recipe_id} {self.order}'
