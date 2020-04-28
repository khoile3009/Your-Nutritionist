class Plan:
    def __init__(self, plan_type, meal_list):
        self.__type = plan_type
        self.__meal_list = meal_list

    def get_type(self):
        return self.__type

    def get_meal_list(self):
        return self.__meal_list

    def set_meal_list(self, meal_list):
        self.__meal_list = meal_list

    def set_type(self, plan_type):
        self.__type = plan_type
