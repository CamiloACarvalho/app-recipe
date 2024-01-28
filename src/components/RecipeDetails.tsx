import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../types/types';
import { mapData } from '../utils/Api';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const params = useParams();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  useEffect(() => {
    const mealEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const mealPage = location.pathname.includes('/meals/');
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    const recomendationEndpoint = mealPage
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType];
        setRecipes(fetchedRecipes);
      });
    fetch(recomendationEndpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'drinks' : 'meals';
        const fetchedRecipes = data[recipeType];
        setRecomendation(fetchedRecipes.slice(0, 6));
      });
  }, [params.id, location.pathname]);

  const recipeData = location.pathname.includes('/meals/')
    ? recipes.map((recipe) => mapData(recipe, 'Meal'))
    : recipes.map((recipe) => mapData(recipe, 'Drink'));

  return (
    <>
      {
        recipeData.map((recipe) => (
          <div
            key={ recipe.id }
          >
            <img
              data-testid="recipe-photo"
              src={ recipe.thumbnail }
              alt="recipe-thumb"
            />
            <h2
              data-testid="recipe-title"
            >
              { recipe.name }
            </h2>
            <h4
              data-testid="recipe-category"
            >
              { recipe.category }
              { recipe.alcoholic ? recipe.alcoholic : null }
            </h4>
            <ul>
              {
                recipe.ingredients.map((ingredient, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    {
                      `${ingredient.name} ${ingredient.measure}`
                    }
                  </li>
                ))
              }
            </ul>
            <p
              data-testid="instructions"
            >
              { recipe.instructions }
            </p>
            { recipe.video ? (<iframe
              data-testid="video"
              title="recipe-video"
              width="420"
              height="315"
              src={ `https://www.youtube.com/embed/${recipe.video}` }
            />
            ) : null }
          </div>
        ))
      }
      <ul>
        {
      recomendation.map((item, index) => (
        <li
          key={ index }
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            src={ (item as MealType).strMealThumb
            || (item as DrinkType).strDrinkThumb }
            alt={ (item as MealType).strMeal || (item as DrinkType).strDrink }
          />
          <h3 data-testid={ `${index}-recommendation-title` }>
            {(item as MealType).strMeal || (item as DrinkType).strDrink}
          </h3>
        </li>
      ))
        }
      </ul>
    </>
  );
}
