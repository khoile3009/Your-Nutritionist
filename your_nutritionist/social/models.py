from django.db import models
from recipe.models import Recipe

from django.contrib.auth.models import  User
from post.models import Post

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
        (4, 'upvote'),
        (5, 'try'),
        (6, 'comment'),
        (7, 'reply'),
        (8, 'like post'),
    )
    action_type = models.IntegerField(choices=ACTION_TYPES)
    target_id = models.IntegerField()

    class Meta:
        ordering = ['-done_at']

class Follow(models.Model):
    target_user = models.ForeignKey(User, related_name='target_user_follow', on_delete=models.CASCADE)
    from_user = models.ForeignKey(User, related_name='from_user_follow', on_delete=models.CASCADE)

class Upvote(models.Model):
    target_recipe = models.ForeignKey(Recipe, related_name='target_recipe_upvote', on_delete=models.CASCADE)
    from_user = models.ForeignKey(User, related_name='from_user_upvote', on_delete=models.CASCADE)

class Comment(models.Model):
    commented_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    target_id = models.IntegerField()
    TARGET_TYPES = (
        (0, 'post'),
        (1, 'comment')
    )
    target_type = models.IntegerField(choices=TARGET_TYPES)
    class Meta:
        ordering = ['-commented_at']




class Like(models.Model):
    target_post = models.ForeignKey(Post, related_name='target_post_like', on_delete=models.CASCADE)
    from_user = models.ForeignKey(User, related_name='from_user_like', on_delete=models.CASCADE)