from django.db import models
from django.contrib.auth.models import  User
from django.db.models.signals import pre_delete
from .files import GCLOUD
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
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  #Authentication later
    created_at = models.DateTimeField(auto_now_add=True)
    number_person = models.IntegerField()
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()

    description = models.TextField(default='')
    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.name}'


class Section(models.Model):
    name = models.CharField(max_length=100, blank=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
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

        
class Ingredient(models.Model):
    order = models.IntegerField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.name}'


class Step(models.Model):
    order = models.IntegerField()
    # time = models.IntegerField()  # in minute
    direction = models.TextField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    timestamp = models.IntegerField(null=True)
    mediaId = models.IntegerField(null=True)
    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.section_id} {self.order}'

class Media(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    url = models.CharField(max_length=300)
    name = models.CharField(max_length=200)
    media_type = models.IntegerField()
    order = models.IntegerField()
    class Meta:
        ordering = ['recipe_id', 'order']

    def __str__(self):
        return f'{self.url}'

class HashTag(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    hashtag = models.CharField(max_length=30)

    class Meta:
        ordering = ['hashtag']
    
    def __str__(self):
        return f'{self.recipe} #{self.hashtag}'



pre_delete.connect(GCLOUD.delete_media, sender=Media)

