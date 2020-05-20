from django.contrib import admin

from .models import UserHeadline, UserIntroduction
# Register your models here.


admin.site.register(UserHeadline)
admin.site.register(UserIntroduction)