class Recipe:

    # Add rating, comment, changes later
    def __init__(self, recipe_id, creator_id, cook_time, meal_type, num_people, ingredient_list, step_list, price):
        self.__id = recipe_id
        self.__creator_id = creator_id
        self.__cook_time = cook_time
        self.__type = meal_type  # desert, breakfast, etc
        self.__num_people = num_people
        self.__ingredient_list = ingredient_list
        self.__step_list = step_list
        self.__price = price

    # Later change this to pull price from wallmart
    def price(self):
        return self.__price

    def get_id(self):
        return self.__id

    def get_type(self):
        return self.__type

    def get_creator_id(self):
        return self.__creator_id

    def get_num_people(self):
        return self.__num_people

    def get_ingredient_list(self):
        return self.__ingredient_list

    def get_step_list(self):
        return self.__step_list

    def get_cook_time(self):
        return self.__cook_time

    def set_id(self, recipe_id):
        self.__id = recipe_id

    def set_type(self, meal_type):
        self.__type = meal_type

    def set_num_people(self, num_people):
        self.__num_people = num_people

    def set_creator_id(self, creator_id):
        self.__creator_id = creator_id

    def set_ingredient_list(self, ingredient_list):
        self.__ingredient_list = ingredient_list

    def set_step_list(self, step_list):
        self.__step_list = step_list

    def set_cook_time(self, cook_time):
        self.__cook_time = cook_time


def main():
    sample = Recipe(123, 123, 123, 123, 123, 123, 123, 123)
    print(sample)


if __name__ == '__main__':
    main()
