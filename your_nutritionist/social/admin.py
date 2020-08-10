from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Follow)
admin.site.register(Action)
admin.site.register(Rating)
admin.site.register(Upvote)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(DailyVisit)
admin.site.register(RecipeTrending)