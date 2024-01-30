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
  const [ingredients, setIngredients] = useState([]);
  const [mensure, setMensure] = useState([]);
  const storedProgress = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  const [checkedIngredients, setCheckedIngredients] = useState<{
    [key: string]: boolean;
  }>(storedProgress);

  // Preciso rever o handleChecked para que ele habilite o botão de finalizar receita após todos os ingredientes serem marcados
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
    const ingredientesOfRecipe = Object.entries(recipe);
    const ingredientsOfRecipe = ingredientesOfRecipe.filter((entry) => {
      const [key] = entry;
      return key.includes('strIngredient');
    });

    const onlyIngredientsValid = ingredientsOfRecipe
      .filter((entry) => entry[1] !== null && entry[1] !== '');

    const mensureOfRecipe = ingredientesOfRecipe.filter((entry) => {
      const [key] = entry;
      return key.includes('strMeasure');
    });

    const onlyMensureValid = mensureOfRecipe
      .filter((entry) => entry[1] !== null && entry[1] !== '');

    // Preciso acertar as tipagens para que o typescript não reclame
    setIngredients(onlyIngredientsValid);
    setMensure(onlyMensureValid);
  }, []);

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

      <h3>
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
                className="checkbox"
                type="checkbox"
                checked={ checkedIngredients[i] || false }
                onChange={ () => handleChecked(i) }
              />
              { `${ingredient[1]}: ${mensure[i][1]}` }
            </label>
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
