
#Nutritional value per 100# gram of an ingredient
class NutritionalValue:
    def __init__(self,calories, fat, saturates, carbs, sugar, fibre, protein, salt):
        self.__calories = calories
        self.__fat = fat
        self.__saturates = saturates
        self.__carbs = carbs
        self.__sugar = sugar
        self.__fibre = fibre
        self.__protein = protein
        self.__salt = salt

    #Can have a static method to add the list of nutrient


    #Add another nutritional value
    def add(self, nutritionalValue: NutritionalValue):
        self.__calories += nutritionalValue.get_calories()
        self.__fat += nutritionalValue.get_fat()
        self.__saturates += nutritionalValue.get_saturates
        self.__carbs += nutritionalValue.get_carb
        self.__sugar += nutritionalValue.get_sugar
        self.__fibre += nutritionalValue.get_fiber
        self.__protein += nutritionalValue.get_protein
        self.__salt += nutritionalValue.get_salt

    def get_calories(self):
        return self.__calories

    def get_fat(self):
        return self.__fat

    def get_saturates(self):
        return self.__saturates

    def get_carb(self):
        return self.__carbs

    def get_sugar(self):
        return self.__sugar 

    def get_fiber(self):
        return self.__fiber

    def get_protein(self):
        return self.__protein

    def get_salt(self):
        return self.__salt


if __name__ == '__main__':
    a = NutritionalValue({})