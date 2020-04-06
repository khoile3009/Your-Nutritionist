class IngredientAmount:

    def __init__(self, ingredient, amount):
        self.__ingredient = ingredient
        self.__amount = amount  # in gram

    def get_ingredient(self):
        return self.__ingredient

    def get_amount(self):
        return self.__amount
