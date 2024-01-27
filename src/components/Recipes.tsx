import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext/SearchContext';
import RecipeCard from './RecipeCard';

function Recipes() {
  const location = useLocation();
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const { recipes, setRecipes } = useContext(SearchContext);

  const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    const mealPage = location.pathname === '/meals';
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType];
        setRecipes(fetchedRecipes.slice(0, 12));
      });
  }, [setRecipes, location.pathname]);

  useEffect(() => {
    const mealPage = location.pathname === '/meals';
    const endpoint = mealPage
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const categoryType = mealPage ? 'meals' : 'drinks';
        const fetchedCategories = data[categoryType];
        setCategories(
          fetchedCategories
            .slice(0, 5).map((category: { strCategory: any }) => category.strCategory),
        );
      });
  }, [location.pathname]);

  const handleCategory = (category: string) => {
    const mealPage = location.pathname === '/meals';
    if (currentCategory !== category) {
      const endpoint = mealPage
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          const recipeType = mealPage ? 'meals' : 'drinks';
          const fetchedRecipes = data[recipeType];
          setCurrentCategory(category);
          console.log(fetchedRecipes);
          setRecipes(fetchedRecipes.slice(0, 12));
        });
    } else {
      const endpoint = mealPage
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          const recipeType = mealPage ? 'meals' : 'drinks';
          const fetchedRecipes = data[recipeType];
          setCurrentCategory('');
          setRecipes(fetchedRecipes.slice(0, 12));
        });
    }
  };

  const handleAll = () => {
    const mealPage = location.pathname === '/meals';
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType];
        setRecipes(fetchedRecipes.slice(0, 12));
      });
  };

  return (
    <div>
      <h1>Receitas</h1>
      <div>
        {categories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category}-category-filter` }
            onClick={ () => handleCategory(category) }
          >
            { category }
          </button>
        ))}
      </div>
      <button
        data-testid="All-category-filter"
        onClick={ handleAll }
      >
        All
      </button>
      {
        recipes.map((recipe, index) => (
          <RecipeCard
            key={ index }
            recipe={ recipe }
            index={ index }
          />
        ))
      }
    </div>
  );
}
export default Recipes;
