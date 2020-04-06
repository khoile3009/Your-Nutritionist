# Nutritional value per 100# gram of an ingredient
class NutritionalValue:
    def __init__(self, calories=0, fat=0, saturates=0, carbs=0, sugar=0, fibre=0, protein=0, salt=0):
        self.__calories = calories
        self.__fat = fat
        self.__saturates = saturates
        self.__carbs = carbs
        self.__sugar = sugar
        self.__fibre = fibre
        self.__protein = protein
        self.__salt = salt

    # Can have a static method to add the list of nutrient

    # Add another nutritional value
    def add(self, nutritional_value):
        self.__calories += nutritional_value.get_calories()
        self.__fat += nutritional_value.get_fat()
        self.__saturates += nutritional_value.get_saturates()
        self.__carbs += nutritional_value.get_carbs()
        self.__sugar += nutritional_value.get_sugar()
        self.__fibre += nutritional_value.get_fibre()
        self.__protein += nutritional_value.get_protein()
        self.__salt += nutritional_value.get_salt()

    def multiply(self, factor):
        return NutritionalValue(
            calories=self.get_calories() * factor,
            fat=self.get_fat() * factor,
            saturates=self.get_saturates() * factor,
            carbs=self.get_carbs() * factor,
            sugar=self.get_sugar() * factor,
            fibre=self.get_fibre() * factor,
            protein=self.get_protein() * factor,
            salt=self.get_salt() * factor,
        )

    def to_string(self):
        return 'calories: {calories}, fat: {fat}, saturate: {saturate}, carbs: {carbs}, sugar: {sugar}, ' \
               'fibre: {fibre}, protein: {protein}, salt: {salt}' \
            .format(calories=self.get_calories(),
                    fat=self.get_fat(),
                    saturate=self.get_saturates(),
                    carbs=self.get_carbs(),
                    sugar=self.get_sugar(),
                    fibre=self.get_fibre(),
                    protein=self.get_protein(),
                    salt=self.get_salt()
                    )

    def get_calories(self):
        return self.__calories

    def get_fat(self):
        return self.__fat

    def get_saturates(self):
        return self.__saturates

    def get_carbs(self):
        return self.__carbs

    def get_sugar(self):
        return self.__sugar

    def get_fibre(self):
        return self.__fibre

    def get_protein(self):
        return self.__protein

    def get_salt(self):
        return self.__salt


if __name__ == '__main__':
    a = NutritionalValue(1, 1, 1, 1, 1, 1, 1, 1)
    a.add(NutritionalValue(1, 1, 1, 1, 1, 1, 1, 1))
    print(a.get_calories())
