import { Link } from 'react-router-dom';
import FavoritesLink from './FavoritesLink';
import shareIcon from '../images/shareIcon.svg';
import { useShared } from '../hooks/useShared';
import { Favorites } from '../types/types';

type Props = {
  recipe: any;
  index: number;
  handleFavorite: any;
  favoriteRecipes: Favorites;
};

function FavoritesCard({
  favoriteRecipes,
  recipe,
  index,
  handleFavorite,
}: Props) {
  const { handleShareClick, copyStatus } = useShared();
  return (
    <div key={ recipe.id }>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {recipe.type === 'meal'
          ? `${recipe.nationality} - ${recipe.category}`
          : recipe.alcoholicOrNot}
      </p>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>
      <button
        type="button"
        onClick={ () => handleShareClick(recipe.id, recipe.type === 'drink') }
      >
        {copyStatus !== '' ? (
          <p>{copyStatus}</p>
        ) : (
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share"
          />
        )}
      </button>
      <FavoritesLink
        favoriteRecipes={ favoriteRecipes }
        recipe={ recipe }
        index={ index }
        handleFavorite={ handleFavorite }
      />
    </div>
  );
}

export default FavoritesCard;
