
#Nutritional value per 100# gram of an ingredient
class NutritionalValue:
    def __init__(self,nutritionalValue):
        self.__calories = nutritionalValue['calories']
        self.__fat = nutritionalValue['fat']
        self.__saturates = nutritionalValue['saturates']
        self.__carbs = nutritionalValue['carbs']
        self.__sugar = nutritionalValue['sugar']
        self.__fibre = nutritionalValue['fibre']
        self.__protein = nutritionalValue['protein']
        self.__salt = nutritionalValue['salt']

    #Can have a static method to add the list of nutrient

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
