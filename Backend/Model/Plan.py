
class Plan:
    def __init__(self, plan):
        self.__type = plan["type"]
        self.__meal_list = plan["meal_list"]
    
    @staticmethod
    def generatePlan(restriction, cooktime, nPeople, budget, plan, past_plan, body_change):
        