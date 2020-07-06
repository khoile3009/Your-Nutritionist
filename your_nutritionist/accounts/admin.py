from django.contrib import admin

from .models import UserHeadline, UserIntroduction, UserProfilePic
# Register your models here.


admin.site.register(UserHeadline)
admin.site.register(UserIntroduction)
admin.site.register(UserProfilePic)