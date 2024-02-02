type Props = {
  handleFilterAll: () => void;
  handleFilterMeal: () => void;
  handleFilterDrink: () => void;
};

function FavoritesBtn({
  handleFilterAll,
  handleFilterMeal,
  handleFilterDrink,
} : Props) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterAll }
      >
        <p>All</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilterMeal }
      >
        <p>Meals</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterDrink }
      >
        <p>Drinks</p>
      </button>
    </div>
  );
}

export default FavoritesBtn;
