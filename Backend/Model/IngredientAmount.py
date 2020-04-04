
class IngredientAmount:
    
    def __init__(self, ingredient_amount):
        self.__ingredient = ingredient_amount.ingredient
        self.__amount = ingredient_amount.amount  #in gram


    def get_ingredient(self):
        return self.__ingredient

    def get_amount(self):
        return self.__amount

        