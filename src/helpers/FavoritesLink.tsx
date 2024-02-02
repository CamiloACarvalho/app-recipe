import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { DoneRecipe, Favorites } from '../types/types';

type Props = {
  recipe: DoneRecipe;
  index: number;
  handleFavorite: any;
  favoriteRecipes: any;
};

function FavoritesLink({
  recipe,
  index,
  handleFavorite,
  favoriteRecipes,
}: Props) {
  const isFavorite = favoriteRecipes?.some(
    (favorite: Favorites) => favorite.id === recipe.id,
  );
  return (
    <button
      type="button"
      onClick={ () => handleFavorite(recipe.id) }
    >
      {isFavorite ? (
        <img
          src={ blackHeartIcon }
          alt="favorite"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      ) : (
        <img
          src={ whiteHeartIcon }
          alt="favorite"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      )}
    </button>
  );
}

export default FavoritesLink;
