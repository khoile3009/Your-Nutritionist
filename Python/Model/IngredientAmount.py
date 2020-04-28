
class IngredientAmount:

    def __init__(self, ingredient, amount):
        self.__ingredient = ingredient
        self.__amount = amount  # in gram

    def nutritional_value(self):
        return self.get_ingredient().get_nutritional_value().multiply(self.get_amount() / 100)

    def get_ingredient(self):
        return self.__ingredient

    def get_amount(self):
        return self.__amount

