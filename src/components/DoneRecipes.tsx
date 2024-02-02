import { Link } from 'react-router-dom';
import { useShared } from '../hooks/useShared';
import { useDoneRecipes } from '../hooks/useDoneRecipes';
import shareIcon from '../images/shareIcon.svg';
import DoneRecipesLink from '../helpers/DoneRecipesLink';
import { DoneRecipe } from '../types/types';
import DoneRecipiesButton from '../helpers/DoneRecipesButton';

function DoneRecipes() {
  const { handleShared, copyLink } = useShared();
  const {
    doneRecipes,
    handleMealFilter,
    handleDrinkFilter,
    handleAllFilter } = useDoneRecipes();
  return (
    <div>
      <div>
        <DoneRecipiesButton
          handleAllFilter={ handleAllFilter }
          handleMealFilter={ handleMealFilter }
          handleDrinkFilter={ handleDrinkFilter }
        />
        {doneRecipes.map((recipe: DoneRecipe, index: any) => (
          <div className="recipe-card" key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </h3>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              {`Done Date: ${recipe.doneDate}`}
            </h4>
            <div className="tags-container">
              <DoneRecipesLink recipe={ recipe } index={ index } />
            </div>
            <button
              type="button"
              onClick={ () => handleShared(recipe.id, recipe.type === 'drink') }
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
