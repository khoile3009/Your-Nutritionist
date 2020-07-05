from django.contrib import admin
from .models import Follow, Action, Rating, Upvote
# Register your models here.


admin.site.register(Follow)
admin.site.register(Action)
admin.site.register(Rating)
admin.site.register(Upvote)