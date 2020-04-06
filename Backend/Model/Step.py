class Step:

    def __init__(self, direction, time):
        self.__direction = direction
        self.__time = time  # in second

    def get_direction(self):
        return self.__direction

    def get_time(self):
        return self.__time
