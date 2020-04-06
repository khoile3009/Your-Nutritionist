
class Plan:
    def __init__(self, plan_type, meal_list):
        self.__type = plan_type
        self.__meal_list = meal_list
    
    @staticmethod
    def generatePlan(restriction, cooktime, nPeople, budget, plan, past_plan, body_change):
        pass