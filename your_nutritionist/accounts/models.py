from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_delete
from recipe.files import GCLOUD
# Create your models here.

class UserHeadline(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    headline = models.CharField(max_length=200)
    
class UserIntroduction(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    introduction = models.TextField()


class UserProfilePic(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    url = models.CharField(max_length=1000)
    gcloud_bucket_url = models.CharField(max_length=500)
    

def on_delete(sender, instance, **kwargs):
    if(instance.gcloud_bucket_url != ''):
        print('on delete ' + instance.gcloud_bucket_url)
        GCLOUD.delete_bucket_url(bucket_url=instance.gcloud_bucket_url)


pre_delete.connect(on_delete, sender=UserProfilePic)