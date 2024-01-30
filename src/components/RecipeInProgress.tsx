import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SearchContext from '../context/SearchContext/SearchContext';
import InProgressElements from './InProgressElements';

function Recipes() {
  const location = useLocation();
  const { recipes, setRecipes } = useContext(SearchContext);
  const [favorite, setFavorite] = useState(false);
  const [concludedRecipe, setConcludedRecipe] = useState<boolean []>([]);
  const { id } = useParams<{ id: string }>();

  const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  useEffect(() => {
    const mealPage = location.pathname.split('/')[1] === 'meals';
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    fetch(`${endpoint}${id}`)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType];
        setRecipes(fetchedRecipes);
        setConcludedRecipe(new Array(fetchedRecipes.length).fill(false));
      });
  }, [setRecipes, location.pathname, id]);

  const handleChecked = (recipeIndex: number, isChecked: boolean) => {
    setConcludedRecipe((prevConcludedRecipe) => {
      const newConcludedRecipes = [...prevConcludedRecipe];
      newConcludedRecipes[recipeIndex] = isChecked;
      return newConcludedRecipes;
    });
  };

  const enableFinishButton = concludedRecipe.every((value) => value);

  const handleToggleFavorite = () => {
    setFavorite(!favorite);
    // Preciso criar outro componente de FavoriteRecipes para complementar essa função
  };

  const handleShareLinkRecipeInProgress = () => {
    const mealPage = location.pathname.split('/')[1] === 'meals';
    const recipeType = mealPage ? 'meals' : 'drinks';
    const recipeId = location.pathname.split('/')[2];
    const link = `http://localhost:3000/${recipeType}/${recipeId}`;

    navigator.clipboard.writeText(link)
      .then(() => {
        console.log('Link copiado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao copiar o link:', error);
      });
  };

  const handleFineshedRecipe = () => {
    const mealPage = location.pathname.split('/')[1] === 'meals';
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    fetch(`${endpoint}${id}`)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType];
        const recipe = fetchedRecipes[0];
        const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
        const newDoneRecipe = {
          id: recipe[`id${recipeType.slice(0, 1).toUpperCase()}${recipeType.slice(1)}`],
          type: recipeType.slice(0, -1),
          area: recipe.strArea || '',
          category: recipe.strCategory || '',
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe[`str${recipeType.slice(0, 1)
            .toUpperCase()}${recipeType.slice(1)}`],
          image: recipe[`str${recipeType.slice(0, 1)
            .toUpperCase()}${recipeType.slice(1)}Thumb`],
          doneDate: new Date().toLocaleDateString('pt-BR'),
          tags: recipe.strTags ? recipe.strTags.split(',') : [],
        };
        doneRecipes.push(newDoneRecipe);
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      });
  };

  return (
    <main>
      <div>
        {
          recipes.map((recipe, index) => (
            <InProgressElements
              key={ index }
              recipe={ recipe }
              index={ index }
              onIngredientChecked={
                (isChecked: boolean) => handleChecked(index, isChecked)
              }
            />
          ))
        }
      </div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleToggleFavorite }
      >
        <img
          { ...favorite
            ? { src: 'src/images/blackHeartIcon.svg' }
            : { src: 'src/images/whiteHeartIcon.svg' }
          }
          alt="favorite icon"
        />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareLinkRecipeInProgress }
      >
        <img
          src="src/images/shareIcon.svg"
          alt="share icon"
        />
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !enableFinishButton }
        onClick={ handleFineshedRecipe }
      >
        <img
          src="src/images/icons8-done.svg"
          alt="checked icon"
        />
      </button>
    </main>
  );
}
export default Recipes;
