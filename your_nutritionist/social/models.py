from django.db import models
from recipe.models import Recipe

from django.contrib.auth.models import  User


class Rating(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    rating = models.FloatField(default=0)
    rate_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()
    rater = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        ordering = ['-rate_at']


class Action(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    done_at = models.DateTimeField(auto_now_add=True)
    ACTION_TYPES = (
        (0, 'follow'),
        (1, 'rate'),
        (2, 'share'),
        (3, 'create'),
        (4, 'favorite'),
        (5, 'tried'),

    )
    action_type = models.IntegerField(choices=ACTION_TYPES)
    target_id = models.IntegerField()

    class Meta:
        ordering = ['-done_at']

class Follow(models.Model):
    target_user = models.ForeignKey(User, related_name='target_user', on_delete=models.CASCADE)
    from_user = models.ForeignKey(User, related_name='from_user', on_delete=models.CASCADE)