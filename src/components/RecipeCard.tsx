import { DrinkType, MealType } from '../types/types';

type RecipeCardProps = {
  recipe: MealType | DrinkType;
  index: number;
};

function RecipeCard({ recipe, index }: RecipeCardProps) {
  return (
    <div
      key={ index }
      data-testid={ `${index}-recipe-card` }
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
    </div>
  );
}

export default RecipeCard;
