class Ingredient:

    def __init__(self, name, food_type, nutritional_value):
        self.__name = name
        self.__type = food_type
        self.__nutritional_value = nutritional_value

    def get_name(self):
        return self.__name

    def get_type(self):
        return self.__type

    def get_nutritional_value(self):
        return self.__nutritional_value

    # Conversion value later
