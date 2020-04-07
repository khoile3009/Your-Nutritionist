from Backend.Model.Ingredient import Ingredient
from Backend.Model.NutritionalValue import NutritionalValue
from Backend.Model.IngredientAmount import IngredientAmount


def test_nutrition_value():
    n_val = NutritionalValue(1, 2, 3, 4, 5, 6, 7, 8)
    a = Ingredient('Chicken', 'meat', n_val)
    a_amount = IngredientAmount(a, 300)
    print(a_amount.nutritional_value().to_string())


if __name__ == '__main__':
    test_nutrition_value()
