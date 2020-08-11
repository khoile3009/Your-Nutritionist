from ..models import RecipeTrending, Upvote, DailyVisit
from rest_framework import generics, permissions
from datetime import timedelta, date
from django.db.models import Sum
from django.http import JsonResponse
from recipe.models import Recipe
from .upvote_api import get_number_upvote
from .rating_api import get_number_rating
class UpdateTrendingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAdminUser,
    ]

    def post(self, *args, **kwargs):
        updateTrending()
        return JsonResponse({'status': 'ok'})

class TrendingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get(self, *args, **kwargs):
        num = self.request.GET.get('num')
        if(num):
            num = int(num)
        else:
            num = 100
        trending_instances = RecipeTrending.objects.filter(id__lte=num)
        context = {'recipes': []}
        for trending_instance in trending_instances:
            total_ratings, number_ratings = get_number_rating(trending_instance.recipe.id)
            number_upvotes = get_number_upvote(trending_instance.recipe.id)
            context['recipes'].append(
                {
                    'recipe_id': trending_instance.recipe.id,
                    'creator_id': trending_instance.recipe.creator.id,
                    'creator_name': trending_instance.recipe.creator.get_full_name(),
                    'recipe_name' : trending_instance.recipe.name,
                    'number_upvotes' : number_upvotes,
                    'number_ratings' : number_ratings,
                    'total_ratings' : total_ratings,
                    'created_date' : trending_instance.recipe.created_at.date(),
                    'number_visits' : trending_instance.num_visit
                }
            )
        return JsonResponse(context, safe=True)

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
            RecipeTrending.objects.filter(id=index + 1).delete()
    
    