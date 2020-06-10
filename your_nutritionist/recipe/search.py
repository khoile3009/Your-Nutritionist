from .models import Recipe, HashTag, Ingredient, IngredientAmount, Section


class Search:

    
    @staticmethod
    def search(queries_string):
        queries = Search.remove_duplicated_queries(queries_string.split(' '))
        recipe_ranking =  Search.process_ranking_from_query(
                cleaned_query=queries_string, 
                query_type='title',
                recipe_ranking={},
                weight=len(queries))
        print(queries)
        for query in queries:
            cleaned_query, query_type = Search.classify_query(query)
            recipe_ranking = Search.process_ranking_from_query(
                cleaned_query=cleaned_query, 
                query_type=query_type,
                recipe_ranking=recipe_ranking,
                weight=1)
            print(recipe_ranking)
        recipe_ids  = Search.sort_table(recipe_ranking)
        print(recipe_ids)
        return recipe_ids

    @staticmethod 
    def process_ranking_from_query(cleaned_query, query_type, recipe_ranking, weight):
        
        print(cleaned_query)
        print(query_type)
        recipe_ids = Search.find_recipe_ids_from_query(cleaned_query, query_type)
        print(recipe_ids)
        return Search.add_to_table(recipe_ranking, recipe_ids,weight)

    @staticmethod
    def remove_duplicated_queries(queries):
        return list(set(queries))

    @staticmethod
    def classify_query(query):
        if(query[0] == '#'):
            return query[1:], 'hashtag'
        else:
            return query, 'title'

    @staticmethod
    def find_recipe_ids_from_query(query, query_type):
        if(query_type == 'hashtag'):
            return Search.find_recipe_from_hashtag(query)
        elif(query_type == 'title'):
            return Search.find_recipe_from_title_name(query)
        else: 
            return []


    @staticmethod
    def find_recipe_from_creator_username(query):
        recipe_instances = Recipe.objects.filter(creator__username = query)
        recipe_ids = recipe_instances.values_list('id', flat=True)
        return recipe_ids

    @staticmethod
    def find_recipe_from_hashtag(query):
        hashtag_instances = HashTag.objects.filter(hashtag=query)
        recipe_ids = hashtag_instances.values_list('recipe', flat=True)
        return recipe_ids

    @staticmethod
    def find_recipe_from_ingredient(query):
        ingredient_instances = Ingredient.objects.filter(name__iexact=query)
        ingredient_amount_instances = IngredientAmount.objects.filter(ingredient__in=ingredient_instances)
        section_ids = ingredient_amount_instances.values_list('section', flat=True)
        section_instances = Section.objects.filter(id__in=section_ids)
        recipe_ids = section_instances.values_list('recipe', flat=True)
        return recipe_ids

    @staticmethod
    def find_recipe_from_title_name(query):
        recipe_instances = Recipe.objects.filter(name__icontains=query)
        recipe_ids = recipe_instances.values_list('id',flat=True)
        return recipe_ids

    



    @staticmethod
    def add_to_table(hashtable, recipe_ids, weight):
        for recipe_id in recipe_ids:
            if hashtable.get(recipe_id) != None:
                hashtable[recipe_id] += weight
            else:
                hashtable[recipe_id] = weight
        return hashtable

    @staticmethod
    def sort_table(hashtable):
        return [x for x,_ in sorted(hashtable.items(), key=lambda x: x[1], reverse=True)]

    