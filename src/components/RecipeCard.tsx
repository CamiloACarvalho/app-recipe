import { Link, useLocation } from 'react-router-dom';
import { DrinkType, MealType } from '../types/types';

type RecipeCardProps = {
  recipe: MealType | DrinkType;
  index: number;
};

function RecipeCard({ recipe, index }: RecipeCardProps) {
  const location = useLocation();
  console.log(recipe);
  return (
    <div
      key={ index }
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        to={ `${location.pathname}/${(recipe as MealType).idMeal
          || (recipe as DrinkType).idDrink}` }
      >
        <img
          src={ (recipe as MealType).strMealThumb || (recipe as DrinkType).strDrinkThumb }
          alt="Recipe"
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {(recipe as MealType).strMeal || (recipe as DrinkType).strDrink}
        </p>
      </Link>
    </div>
  );
}

export default RecipeCard;
