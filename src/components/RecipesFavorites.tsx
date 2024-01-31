import FavoritesBtn from '../helpers/FavoritesBtn';
import FavoritesCard from '../helpers/FavoritesCard';
import { useFavoritesRecipies } from '../hooks/useFavoritesRecipes';

function RecipesFavorites() {
  const {
    handleFilterMeal,
    handleFilterDrink,
    handleFilterAll,
    favoriteRecipes,
    favoriteSort,
    handleFavorite,
  } = useFavoritesRecipies();
  return (
    <div>
      <div>
        <FavoritesBtn
          handleFilterMeal={ handleFilterMeal }
          handleFilterDrink={ handleFilterDrink }
          handleFilterAll={ handleFilterAll }
        />
        {favoriteSort.length > 0
          && favoriteRecipes.map((recipe: any, index: any) => (
            <FavoritesCard
              favoriteRecipes={ favoriteSort }
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
              handleFavorite={ handleFavorite }
            />
          ))}
        {favoriteSort.length === 0
          && favoriteRecipes.map((recipe: any, index: any) => (
            <FavoritesCard
              favoriteRecipes={ favoriteRecipes }
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
              handleFavorite={ handleFavorite }
            />
          ))}
      </div>
    </div>
  );
}

export default RecipesFavorites;
