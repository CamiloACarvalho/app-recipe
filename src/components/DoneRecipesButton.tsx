import { DoneRecipesBtnProps } from '../types/types';

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
        <p>All</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleMealFilter }
      >
        <p>Meals</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleDrinkFilter }
      >
        <p>Drinks</p>
      </button>
    </div>
  );
}

export default DoneRecipiesButton;
