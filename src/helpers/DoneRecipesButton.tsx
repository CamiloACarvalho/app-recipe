import { DoneRecipesBtnProps } from '../types/types';
import rockGlass from '../images/rockGlass.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function DoneRecipiesButton({
  handleAllFilter,
  handleMealFilter,
  handleDrinkFilter,
}: DoneRecipesBtnProps) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleAllFilter }
      >
        <img src={ rockGlass } alt="" />
        <p>All</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleMealFilter }
      >
        <img src={ mealIcon } alt="" />
        <p>Meals</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleDrinkFilter }
      >
        <img src={ drinkIcon } alt="" />
        <p>Drinks</p>
      </button>
    </div>
  );
}

export default DoneRecipiesButton;
