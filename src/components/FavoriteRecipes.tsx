import FavoritesBtn from '../helpers/FavoritesBtn';
import FavoritesCard from '../helpers/FavoritesCard';
import { useFavoritesRecipies } from '../hooks/useFavoritesRecipes';

function FavoriteRecipes() {
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
        {favoriteRecipes.map((recipe: any, index: any) => (
          <FavoritesCard
            favoriteRecipes={ favoriteSort.length > 0 ? favoriteSort : favoriteRecipes }
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

export default FavoriteRecipes;
