// Bucar pelo nome
// -> www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// -> www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// Padrão
// -> www.the{meal or cocktail}db.com/api/json/v1/1/search.php?s={search}

import { Dispatch, SetStateAction } from 'react';
import { DrinkType, FavoriteKey, MealType, Recipes } from '../types/types';

// -----------------------------------------------------------------------

// buscar pela primeira letra
// -> www.themealdb.com/api/json/v1/1/search.php?f=a
// -> www.thecocktaildb.com/api/json/v1/1/search.php?f=a
// Padrão
// -> www.the{meal or cocktail}db.com/api/json/v1/1/search.php?f={search}

// -----------------------------------------------------------------------

// buscar pelo nome do ingrediente
// -> www.themealdb.com/api/json/v1/1/search.php?i=list
// -> www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// Padrão
// -> www.the{meal or cocktail}db.com/api/json/v1/1/search.php?i={search}

// A ideia aqui é criar uma função que gere a URL de acordo com o tipo de busca e o valor de busca.
export const baseURL = (resourceType: string) => (
  `www.the${resourceType}db.com/api/json/v1/1`
);

export const endPoint = (
  resource: string,
  search: string,
  value: string,
) => {
  switch (search) {
    case 'name':
      return `${baseURL(resource)}/search.php?s=${value}`;
    case 'firstLetter':
      return `${baseURL(resource)}/filter.php?f=${value}`;
    case 'ingredient':
      return `${baseURL(resource)}/search.php?i=${value}`;
    default:
      return `${baseURL(resource)}/defaultEndpoint.php`;
  }
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const mapData = (item: any, type: string) => {
  const ingredients = [];

  // Itera sobre os itens de ingredientes até encontrar um valor nulo ou vazio
  for (let i = 1; i <= 20; i++) {
    const ingredientName = item[`strIngredient${i}`];
    const ingredientMeasure = item[`strMeasure${i}`];

    if (!ingredientName || !ingredientMeasure) {
      // Se encontrou um valor nulo ou vazio, interrompe o loop
      break;
    }

    ingredients.push({ name: ingredientName, measure: ingredientMeasure });
  }

  let videoId = null; // Default value for videoId

  if (item.strYoutube) {
    const url = item.strYoutube;
    const splitURL = url.split('=')[1];
    videoId = splitURL;
  }

  return {
    id: item[`id${type}`],
    name: item[`str${type}`],
    category: item.strCategory,
    instructions: item.strInstructions,
    ingredients,
    thumbnail: item[`str${type}Thumb`],
    alcoholic: item.strAlcoholic,
    video: videoId,
  };
};

export const mapDrinkData = (drink: any) => mapData(drink, 'Drink');
export const mapMealData = (meal: any) => mapData(meal, 'Meal');

export const handleFavoriteKey = (location: string, recipes: Recipes) => {
  const mealPage = location.includes('/meals/');
  const recipeType = mealPage ? 'meal' : 'drink';
  const favoriteKey = {
    id: (recipes[0] as MealType).idMeal || (recipes[0] as DrinkType).idDrink,
    type: recipeType,
    nationality: (recipes[0] as MealType).strArea || '',
    category: (recipes[0] as MealType).strCategory,
    alcoholicOrNot: (recipes[0] as DrinkType).strAlcoholic || '',
    name: (recipes[0] as MealType).strMeal || (recipes[0] as DrinkType).strDrink,
    image: (recipes[0] as MealType).strMealThumb
      || (recipes[0] as DrinkType).strDrinkThumb,
  };
  return favoriteKey;
};

export const handleLocalFavorite = (
  favoriteKey: FavoriteKey,
  setFavorite: Dispatch<SetStateAction<boolean>>,
) => {
  const getFavorite = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  ) || [];
  if (getFavorite.length > 0) {
    let newArray = [];
    const findDuplicate = getFavorite
      .find((favoriteItem: FavoriteKey) => favoriteItem.id === favoriteKey.id);
    if (findDuplicate) {
      newArray = getFavorite
        .filter((favoriteItem: FavoriteKey) => favoriteItem.id !== favoriteKey.id);
      setFavorite(false);
    } else {
      newArray = [...getFavorite, favoriteKey];
      setFavorite(true);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([favoriteKey]),
    );
    setFavorite(true);
  }
};
