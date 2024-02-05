import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { FavoriteKey } from '../types/types';
import { handleFavoriteKey, handleLocalFavorite, mapData } from '../utils/Api';
import CarouselCard from './CarouselCard';
import './RecipeDetails.css';
import RecipeDetailsCard from './RecipeDetailsCard';

export default function RecipeDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [copiedPath, setCopiedPath] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [showCopyLink, setShowCopyLink] = useState(false);

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
    ? recipes?.map((recipe) => mapData(recipe, 'Meal'))
    : recipes?.map((recipe) => mapData(recipe, 'Drink'));

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

  // const handleShare = async () => {
  //   const pathLocation = location.pathname;
  //   await navigator.clipboard.writeText(pathLocation);
  //   setCopiedPath(true);
  // };

  const handleShareLinkRecipeInProgress = () => {
    const mealPage = location.pathname.split('/')[1] === 'meals';
    const recipeType = mealPage ? 'meals' : 'drinks';
    const recipeId = location.pathname.split('/')[2];
    const link = `http://localhost:3000/${recipeType}/${recipeId}`;

    navigator.clipboard.writeText(link)
      .then(() => {
        setShowCopyLink(true);
        setTimeout(() => {
          setShowCopyLink(false);
        }, 3000);
      })
      .catch(() => {
        alert('Erro ao copiar o link:');
      });
  };

  const handleFavorite = () => {
    const favoriteKey = handleFavoriteKey(location.pathname, recipes);
    handleLocalFavorite(favoriteKey, setFavorite);
  };

  return (
    <>
      <RecipeDetailsCard
        recipeData={ recipeData }
      />
      <button
        data-testid="share-btn"
        onClick={ handleShareLinkRecipeInProgress }
      >
        <img
          src={ shareIcon }
          alt="share"
        />
      </button>
      {' '}
      {
        showCopyLink && <span>Link copied!</span>
      }
      {' '}
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
