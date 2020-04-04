
class Ingredient:
    
    def __init__(self, ingredient):
        self.__name = ingredient['name']
        self.__type = ingredient['type']
        self.__nutrional_value = ingredient['nutritional_value']

    def get_name(self):
        return self.__name

    def get_type(self):
        return self.__type

    def get_nutritional_value(self):
        return self.__nutritional_value

    #Conversion value later