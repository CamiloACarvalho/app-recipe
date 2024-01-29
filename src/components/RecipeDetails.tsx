import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { DrinkType, FavoriteKey, MealType } from '../types/types';
import { mapData } from '../utils/Api';
import CarouselCard from './CarouselCard';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [copiedPath, setCopiedPath] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const mealEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const mealPage = location.pathname.includes('/meals/');
    const endpoint = mealPage
      ? mealEndpoint
      : drinkEndpoint;
    const recomendationEndpoint = mealPage
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'meals' : 'drinks';
        const fetchedRecipes = data[recipeType];
        setRecipes(fetchedRecipes);
      });
    fetch(recomendationEndpoint)
      .then((response) => response.json())
      .then((data) => {
        const recipeType = mealPage ? 'drinks' : 'meals';
        const fetchedRecipes = data[recipeType];
        setRecomendation(fetchedRecipes.slice(0, 6));
      });
    const getFavorite = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    ) || [];
    if (getFavorite.length > 0) {
      const checkFavorite = getFavorite
        .some((favoriteItem: FavoriteKey) => favoriteItem.id === params.id);
      setFavorite(checkFavorite);
    }
  }, [params.id, location.pathname, setFavorite]);

  const recipeData = location.pathname.includes('/meals/')
    ? recipes.map((recipe) => mapData(recipe, 'Meal'))
    : recipes.map((recipe) => mapData(recipe, 'Drink'));

  const handleSelect = (selectedIndex: number) => {
    setCarouselIndex(selectedIndex);
  };

  const handleStart = () => {
    if (location.pathname.includes('/meals/')) {
      navigate(`/meals/${params.id}/in-progress`);
    } else {
      navigate(`/drinks/${params.id}/in-progress`);
    }
  };

  const handleShare = async () => {
    const pathLocation = window.location.href;
    await navigator.clipboard.writeText(pathLocation);
    setCopiedPath(true);
  };

  const handleFavorite = () => {
    const mealPage = location.pathname.includes('/meals/');
    const recipeType = mealPage ? 'meal' : 'drink';
    const favoriteKey = {
      id: (recipes[0] as MealType).idMeal || (recipes[0] as DrinkType).idDrink,
      type: recipeType,
      nationality: (recipes[0] as MealType).strArea || '',
      category: (recipes[0] as MealType).strCategory,
      alcoholicOrNot: (recipes[0] as DrinkType).strAlcoholic || '',
      name: (recipes[0] as MealType).strMeal || (recipes[0] as DrinkType).strDrink,
      image: (recipes[0] as MealType).strMealThumb
        || (recipes[0] as DrinkType).strDrinkThumb,
    };
    const getFavorite = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    ) || [];
    if (getFavorite.length > 0) {
      let newArray = [];
      const findDuplicate = getFavorite
        .find((favoriteItem: FavoriteKey) => favoriteItem.id === favoriteKey.id);
      if (findDuplicate) {
        newArray = getFavorite
          .filter((favoriteItem: FavoriteKey) => favoriteItem.id !== favoriteKey.id);
        setFavorite(false);
      } else {
        newArray = [...getFavorite, favoriteKey];
        setFavorite(true);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([favoriteKey]),
      );
      setFavorite(true);
    }
  };

  return (
    <>
      {
        recipeData.map((recipe) => (
          <div
            key={ recipe.id }
          >
            <img
              data-testid="recipe-photo"
              src={ recipe.thumbnail }
              alt="recipe-thumb"
            />
            <h2
              data-testid="recipe-title"
            >
              { recipe.name }
            </h2>
            <h4
              data-testid="recipe-category"
            >
              { recipe.category }
              { recipe.alcoholic ? recipe.alcoholic : null }
            </h4>
            <ul>
              {
                recipe.ingredients.map((ingredient, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    {
                      `${ingredient.name} ${ingredient.measure}`
                    }
                  </li>
                ))
              }
            </ul>
            <p
              data-testid="instructions"
            >
              { recipe.instructions }
            </p>
            { recipe.video ? (<iframe
              data-testid="video"
              title="recipe-video"
              width="420"
              height="315"
              src={ `https://www.youtube.com/embed/${recipe.video}` }
            />
            ) : null }
          </div>
        ))
      }
      <button
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          alt="share"
        />
      </button>
      {' '}
      {
        copiedPath && <span>Link copied!</span>
      }
      <button
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeart : whiteHeart }
          alt="favorite"
        />
      </button>
      <CarouselCard
        recomendation={ recomendation }
        handleSelect={ handleSelect }
        carouselIndex={ carouselIndex }
      />
      <button
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ handleStart }
      >
        Start Recipe
      </button>
    </>
  );
}
