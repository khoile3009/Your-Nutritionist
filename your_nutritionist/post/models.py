from django.db import models

from django.contrib.auth.models import  User
from django.db.models.signals import pre_delete
from utils.files import GCLOUD
# Create your models here.
class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    number_of_like = models.IntegerField(default=0)
    content = models.TextField()
    class Meta:
        ordering = ['-created_at']


class PostMedia(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    url = models.CharField(max_length=1000)
    gcloud_bucket_url = models.CharField(max_length=500, default='')
    media_type = models.IntegerField()
    order = models.IntegerField()
    class Meta:
        ordering = ['post_id', 'order']

    def __str__(self):
        return f'{self.url}'

def on_delete(sender, instance, **kwargs):
    if(instance.gcloud_bucket_url != ''):
        print('on delete ' + instance.gcloud_bucket_url)
        GCLOUD.delete_bucket_url(bucket_url=instance.gcloud_bucket_url)


pre_delete.connect(on_delete, sender=PostMedia)
