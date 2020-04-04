
class Step:

    def __init__(self, step):
        self.__direction = step.direction
        self.__time = step.time   #in second
    
    def get_direction(self):
        return self.__direction

    def get_time(self):
        return self.__time