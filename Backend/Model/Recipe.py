
class Recipe:

    def __init__(self, recipe):
        self.__ID = recipe['ID']
        self.__creator_ID = recipe['creator_ID']
        self.__type=  recipe['type']    #desert, breaskfast, etc
        self.__ingredient_list = recipe['ingredient_list']
        self.__step_list = recipe['step_list']

    def get_ID(self):
        return self.__ID

    def get_type(self):
        return self.__type

    def get_creator_ID(self):
        return self.__creator_ID

    def get_ingredient_list(self):
        return self.__ingredient_list

    def get_step_list(self):
        return self.__step_list

def main():
    sample = Recipe({'ID': 123, 'creator_ID': 123, 'ingredient_list': [1,2,3], 'step_list': [1,2,3]})
    print(sample)

if __name__ == '__main__':
    main()


