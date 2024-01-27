import { useContext, useEffect, useState } from 'react';
import SearchContext from '../context/SearchContext/SearchContext';
import RecipeCard from './RecipeCard';

const mealPage = window.location.pathname === '/meals';
const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Recipes() {
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const { recipes, setRecipes } = useContext(SearchContext);

  useEffect(() => {
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType] || [];
        setRecipes(fetchedRecipes.slice(0, 12));
      })
      .catch((error) => {
        console.error('Erro ao buscar receitas na tela inicial:', error);
      });
  }, [setRecipes]);

  useEffect(() => {
    const endpoint = mealPage
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const categoryType = mealPage ? 'meals' : 'drinks';
        const fetchedCategories = data[categoryType] || [];
        setCategories(
          fetchedCategories
            .slice(0, 5).map((category: { strCategory: any }) => category.strCategory),
        );
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
      });
  }, []);

  const handleCategory = (category: string) => {
    if (currentCategory !== category) {
      const endpoint = mealPage
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          const recipeType = mealPage ? 'meals' : 'drinks';
          const fetchedRecipes = data[recipeType] || [];
          setCurrentCategory(category);
          setRecipes(fetchedRecipes.slice(0, 12));
        })
        .catch((error) => {
          console.error('Erro ao buscar receitas por categoria:', error);
        });
    } else {
      const endpoint = mealPage
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          const recipeType = mealPage ? 'meals' : 'drinks';
          const fetchedRecipes = data[recipeType] || [];
          setCurrentCategory('');
          setRecipes(fetchedRecipes.slice(0, 12));
        })
        .catch((error) => {
          console.error('Erro ao buscar receitas:', error);
        });
    }
  };

  const handleAll = () => {
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType] || [];
        setRecipes(fetchedRecipes.slice(0, 12));
      })
      .catch((error) => {
        console.error('Erro ao buscar receitas:', error);
      });
  };
  console.log(recipes);
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
