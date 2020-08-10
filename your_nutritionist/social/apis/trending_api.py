from ..models import RecipeTrending, Upvote, DailyVisit
from rest_framework import generics, permissions
from datetime import timedelta, date
from django.db.models import Sum
from django.http import JsonResponse
from recipe.models import Recipe
class UpdateTrendingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAdminUser,
    ]

    def post(self, *args, **kwargs):
        updateTrending()
        return JsonResponse({'status': 'ok'})



def updateTrending():
    last_week_date = date.today() - timedelta(days=7)
    visit_instances = DailyVisit.objects.filter(visit_date__gte=last_week_date)
    visitor_count = visit_instances.values('recipe__id').annotate(Sum('num_visit'))
    visitor_count_sorted = sorted(visitor_count, key=lambda visitor: visitor['num_visit__sum'],reverse=True)
    for index in range(len(visitor_count_sorted[:100])):
        recipe_visitor = visitor_count_sorted[index]
        print(recipe_visitor)
        try:
            recipe_instance = Recipe.objects.get(id=recipe_visitor['recipe__id'])
            RecipeTrending.objects.update_or_create(
                id=index + 1
                ,defaults={'recipe': recipe_instance, 'num_visit':recipe_visitor['num_visit__sum']}
            )
        except Recipe.DoesNotExist:
            pass

    
    