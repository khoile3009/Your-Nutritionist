from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, permissions
from ..models import DailyVisit
from recipe.models import Recipe
from datetime import date

class VisitAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]

    def put(self, *args, **kwargs):
        recipe_id  = kwargs['recipe_id']
        try:
            recipe_instance = Recipe.objects.get(id=recipe_id)
            visit_instance,_ = DailyVisit.objects.get_or_create(
                recipe=recipe_instance,
                visit_date = date.today()
            )
            visit_instance.num_visit += 1
            visit_instance.save()
            return JsonResponse({'num_visit':visit_instance.num_visit})
        except Recipe.DoesNotExist:
            return JsonResponse({'status':'No recipe'}, status=404)