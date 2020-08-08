from ..models import Trending, Upvote, DailyVisit
from rest_framework import generics, permissions


class UpdateTrendingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAdminUser,
    ]

    def post(self, *args, **kwargs):
        updateTrending()



def updateTrending():
    upvote_instances = Upvote.objects.all()
    print(upvote_instances[0].upvoted_at)