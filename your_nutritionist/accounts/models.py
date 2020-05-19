from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserHeadline(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    headline = models.CharField(max_length=200)
    
class UserIntroduction(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    introduction = models.TextField()


class UserProfilePic(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    profile_pic = models.CharField(max_length=100)

