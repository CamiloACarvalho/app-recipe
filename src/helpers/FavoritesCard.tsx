import { Link, useLocation } from 'react-router-dom';
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
  const { handleShared, copyLink } = useShared();
  return (
    <div key={ recipe.id }>
      <Link to={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
        <img
          style={ { width: '100px' } }
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
      <Link to={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>
      <button
        type="button"
        onClick={ () => {
          handleShared(recipe.id, recipe.type === 'drink');
          // Adicionando verificação para exibir a mensagem após a cópia
          if (copyLink !== '') {
            navigator.clipboard.writeText(copyLink)
              .then(() => alert('Link copied!'))
              .catch((error) => console.error('Error copying link:', error));
          }
        } }
      >
        {copyLink !== '' ? (
          <p>{copyLink}</p>
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
