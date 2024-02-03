import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinkType, MealType } from '../types/types';
import styles from './InProgressElements.module.css';

type InProgressProps = {
  recipe: MealType | DrinkType;
  index: number;
  onIngredientChecked: (isChecked: boolean) => void;
  allChecked: (allCheckedBox: { [key: string]: boolean }) => void;
};

function InProgressElements({
  recipe,
  index,
  onIngredientChecked,
  allChecked,
}: InProgressProps) {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const localStorageKey = 'checkedActive';
  const [ingredients, setIngredients] = useState<[string, string][]>([]);
  const [mensure, setMensure] = useState<[string, string][]>([]);
  const storedProgress = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  const [checkedIngredients, setCheckedIngredients] = useState<{
    [key: string]: boolean;
  }>(storedProgress);

  const saveCheckedBox = (allIngredients: { [key: string]: boolean }) => {
    const saveLengthIngredients = ingredients.length;

    const conditionCheckedIngredients = Object.keys(allIngredients)
      .length === saveLengthIngredients;

    if (conditionCheckedIngredients) {
      allChecked(allIngredients);
    }
  };

  const saveIngredientsLocalStorage = (ingredient: string) => {
    const recipeType = location.pathname.split('/')[1] === 'meals';
    const ingredientStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');
    if (recipeType && id) {
      const meals = { ...ingredientStorage.meals, [id]: [ingredient] };
      if (ingredientStorage.meals[id]) {
        const mealsExist = ingredientStorage.meals[id];
        if (mealsExist.includes(ingredient)) {
          const newMeals = mealsExist.filter((meal: string) => meal !== ingredient);
          localStorage.setItem('inProgressRecipes', JSON
            .stringify({ ...ingredientStorage, meals: { [id]: newMeals } }));
          return;
        }
        localStorage.setItem('inProgressRecipes', JSON
          .stringify({ ...ingredientStorage,
            meals: { [id]: [...ingredientStorage.meals[id], ingredient] },
          }));
        return;
      }
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ ...ingredientStorage, meals }));
      return;
    }
    if (!recipeType && id) {
      const drinks = { ...ingredientStorage.drinks, [id]: [ingredient] };
      if (ingredientStorage.drinks[id]) {
        const drinksExist = ingredientStorage.drinks[id];
        if (drinksExist.includes(ingredient)) {
          const newDrinks = drinksExist.filter((drink: string) => drink !== ingredient);
          localStorage.setItem('inProgressRecipes', JSON
            .stringify({ ...ingredientStorage, drinks: { [id]: newDrinks } }));
          return;
        }
        localStorage.setItem('inProgressRecipes', JSON
          .stringify({ ...ingredientStorage,
            drinks: { [id]: [...ingredientStorage.drinks[id], ingredient] },
          }));
        return;
      }
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ ...ingredientStorage, drinks }));
    }
  };

  const handleChecked = (ingredientIndex: number, ingredientName: string) => {
    setCheckedIngredients((prevCheckedIngredients) => {
      const newCheckedIngredients = { ...prevCheckedIngredients };
      newCheckedIngredients[ingredientIndex] = !newCheckedIngredients[ingredientIndex];
      localStorage.setItem(localStorageKey, JSON.stringify(newCheckedIngredients));
      onIngredientChecked(newCheckedIngredients[ingredientIndex]);
      saveIngredientsLocalStorage(ingredientName);
      saveCheckedBox(newCheckedIngredients);
      return newCheckedIngredients;
    });
  };

  useEffect(() => {
    const ingredientesOfRecipe = Object.entries(recipe);

    const ingredientsOfRecipe = ingredientesOfRecipe.filter((entry) => {
      const [key] = entry;
      return key.includes('strIngredient');
    }) as [string, string][];

    const onlyIngredientsValid = ingredientsOfRecipe
      .filter((entry) => entry[1] !== null && entry[1] !== '');

    const mensureOfRecipe = ingredientesOfRecipe.filter((entry) => {
      const [key] = entry;
      return key.includes('strMeasure');
    }) as [string, string][];

    const onlyMensureValid = mensureOfRecipe
      .filter((entry) => entry[1] !== null && entry[1] !== '');

    const ingredientStorage = localStorage.getItem('inProgressRecipes');

    if (!ingredientStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        drinks: {},
      }));
    }

    setIngredients(onlyIngredientsValid);
    setMensure(onlyMensureValid);
  }, [recipe]);

  return (
    <div
      key={ index }
    >
      <h2 data-testid="recipe-title">
        {(recipe as MealType).strMeal || (recipe as DrinkType).strDrink}
      </h2>

      <h3>Categoria:</h3>
      <p
        data-testid="recipe-category"
      >
        {(recipe as MealType).strCategory || (recipe as DrinkType).strCategory }
      </p>

      <img
        src={ (recipe as MealType).strMealThumb || (recipe as DrinkType).strDrinkThumb }
        alt={ (recipe as MealType).strMeal || (recipe as DrinkType).strDrink }
        data-testid="recipe-photo"
      />

      <h3 data-testid="it-has-alchool">
        {(recipe as DrinkType).strAlcoholic === 'Alcoholic'
          ? 'Alcoholic'
          : 'Non Alcoholic'}
      </h3>

      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={ i }>
            <label
              className={ checkedIngredients[i] ? styles.checkedIngredient : '' }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                data-testid={ `${i}-checkbox` }
                className="checkbox"
                type="checkbox"
                checked={ checkedIngredients[i] || false }
                onChange={ () => handleChecked(i, ingredient[1]) }
              />
              { `${ingredient[1]}: ${mensure[i][1]}` }
            </label>
          </li>
        ))}
      </ul>

      <p data-testid="instructions">
        {(recipe as MealType).strInstructions || (recipe as DrinkType).strInstructions}
      </p>

      <a
        data-testid="video"
        href={ (recipe as MealType).strYoutube || (recipe as DrinkType).strVideo }
      >
        Assita ao vídeo
      </a>
    </div>
  );
}

export default InProgressElements;
