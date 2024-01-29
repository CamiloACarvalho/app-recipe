import { useState, useEffect } from 'react';
import { DrinkType, MealType } from '../types/types';
import styles from './InProgressElements.module.css';

type InProgressProps = {
  recipe: MealType | DrinkType;
  index: number;
  onIngredientChecked: (isChecked: boolean) => void;
};

function InProgressElements(
  {
    recipe,
    index,
    onIngredientChecked,
  }: InProgressProps,
) {
  const localStorageKey = `inProgressRecipes-${index}`;
  const storedProgress = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

  const [checkedIngredients, setCheckedIngredients] = useState<{
    [key: string]: boolean;
  }>(storedProgress);

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = (recipe as any)[`strIngredient${i}`];
    const measure = (recipe as any)[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredients.push(`${ingredient}: ${measure}`);
    }
  }

  const handleChecked = (ingredientIndex: number) => {
    setCheckedIngredients((prevCheckedIngredients) => {
      const newCheckedIngredients = { ...prevCheckedIngredients };
      newCheckedIngredients[ingredientIndex] = !newCheckedIngredients[ingredientIndex];

      localStorage.setItem(localStorageKey, JSON.stringify(newCheckedIngredients));

      onIngredientChecked(newCheckedIngredients[ingredientIndex]);

      return newCheckedIngredients;
    });
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem(localStorageKey);
    };
  }, [localStorageKey]);

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

      <ul>
        {ingredients.map((ingredient, i) => (
          <li
            key={ i }
            className={ checkedIngredients[i] ? styles.checkedIngredient : '' }
          >
            <input
              className="checkbox"
              type="checkbox"
              data-testid={ `${index}-${ingredient}-ingredient-step` }
              onClick={ () => handleChecked(i) }
            />
            {ingredient}
          </li>
        ))}
      </ul>

      <p data-testid="instructions">
        {(recipe as MealType).strInstructions || (recipe as DrinkType).strInstructions}
      </p>

      <a href={ (recipe as MealType).strYoutube || (recipe as DrinkType).strVideo }>
        Assita ao vídeo
      </a>
    </div>
  );
}

export default InProgressElements;
