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
        setRecipes(fetchedRecipes); // Aqui tenho que pegar a informação dos itens apenas em progresso para renderizar nessa tela nessa tela
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
      {/* Desobrir pq os ícones não estão aparecendo */}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavorite(!favorite) }
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
      >
        <img
          src="src/images/shareIcon.svg"
          alt="share icon"
        />
      </button>
      <button
        type="button"
        disabled={ !enableFinishButton }
        onClick={ () => console.log('receita concluída') }
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
