import { categoryDrinksMock } from './CategoryDrinksMock';
import { categoryMealsMock } from './CategoryMealsMock';
import { filterDrinksCategoryMock } from './FilterDrinksCategoryMock';
import { filterMealsCategoryMock } from './FilterMealsCategoryMock';
import { initialDrinksMock } from './InitialDrinksMock';
import { initialMealsMock } from './InitialMealsMock';
import { radioFirstLetterDrinksMock } from './RadioFirstLetterDrinksMock';
import { radioFirstLetterMealsMock } from './RadioFirstLetterMealsMock';
import { radioIngredientDrinksMock } from './RadioIngredientDrinksMock';
import { radioIngredientMealsMock } from './RadioIngredientMealsMock';
import { radioNameDrinksMock } from './RadioNameDrinksMock';
import { radioNameMealsMock } from './RadioNameMealsMock';
import { nonexistentMealSearchMock } from './NonexistentMealSearchMock';
import { recipeDrinkDetailsMock } from './RecipeDrinkDetailsMock';
import { recipeMealDetailsMock } from './RecipeMealDetailsMock';
import { oneMealResultSearchMock } from './OneMealResultSearchMock';
import { oneDrinkResultSearchMock } from './OneDrinkResultSearchMock';

const POSSIBLE_RESPONSE: any = {
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': initialMealsMock,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': initialDrinksMock,
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': categoryMealsMock,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': categoryDrinksMock,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': filterMealsCategoryMock,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink': filterDrinksCategoryMock,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=rice': radioIngredientMealsMock,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=strawberries': radioIngredientDrinksMock,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate': radioNameMealsMock,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=bloody': radioNameDrinksMock,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=h': radioFirstLetterMealsMock,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=k': radioFirstLetterDrinksMock,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977': recipeMealDetailsMock,
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222': recipeDrinkDetailsMock,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau': nonexistentMealSearchMock,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=sushi': oneMealResultSearchMock,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a1': oneDrinkResultSearchMock,
};

const fetchMock = (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => (POSSIBLE_RESPONSE[url] ? POSSIBLE_RESPONSE[url] : initialMealsMock),
});

export default fetchMock;
