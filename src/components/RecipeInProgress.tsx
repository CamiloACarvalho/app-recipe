import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext/SearchContext';
import InProgressElements from './InProgressElements';

function Recipes() {
  const location = useLocation();
  const { recipes, setRecipes } = useContext(SearchContext);
  const [favorite, setFavorite] = useState(false);

  const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const mealPage = location.pathname === '/meals/:id/in-progress';
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType];
        setRecipes(fetchedRecipes.slice(0));
      });
  }, [setRecipes, location.pathname]);

  return (
    <main>
      <div>
        {
          recipes.map((recipe, index) => (
            <InProgressElements
              key={ index }
              recipe={ recipe }
              index={ index }
            />
          ))
        }
      </div>
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
    </main>
  );
}
export default Recipes;
