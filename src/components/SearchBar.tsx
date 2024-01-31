import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchContext from '../context/SearchContext/SearchContext';
import { searchRecipes } from '../functionsHelpers/searchFunction';
import { DrinkType, MealType } from '../types/types';

function SearchBar() {
  const [searchType, setSearchType] = useState('Ingredient');
  const location = useLocation();
  const navigate = useNavigate();
  const { recipes, setRecipes, searchValue } = useContext(SearchContext);

  useEffect(() => {
    if (recipes.length === 1 && Object.keys(recipes[0]).length > 3) {
      navigate(`${location.pathname}/${(recipes[0] as MealType).idMeal
          || (recipes[0] as DrinkType).idDrink}`);
    }
  }, [location.pathname, navigate, recipes]);

  const handleClick = async () => {
    const data = await searchRecipes(searchType, location, searchValue);
    if (data !== undefined) {
      if (data.meals === null || data.drinks === null) {
        window.alert("Sorry, we haven't found any recipes for these filters");
        return;
      }
      setRecipes(data.meals || data.drinks);
    }
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="searchType"
          value="Ingredient"
          checked={ searchType === 'Ingredient' }
          onChange={ ({ target }) => setSearchType(target.value) }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          name="searchType"
          value="Name"
          checked={ searchType === 'Name' }
          onChange={ ({ target }) => setSearchType(target.value) }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          name="searchType"
          value="First letter"
          checked={ searchType === 'First letter' }
          onChange={ ({ target }) => setSearchType(target.value) }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button type="button" onClick={ handleClick } data-testid="exec-search-btn">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
