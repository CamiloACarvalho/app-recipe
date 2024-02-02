import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import SearchContext from '../context/SearchContext/SearchContext';
import InProgressElements from './InProgressElements';
import fullHeartIcon from '../images/blackHeartIcon.svg';
import emptyHeartIcon from '../images/whiteHeartIcon.svg';
import finishIcon from '../images/icons8-done.svg';
import shareRecipe from '../images/shareIcon.svg';
import styles from './InProgressElements.module.css';

// senhor, socorro!

function RecipesInProgress() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipes, setRecipes } = useContext(SearchContext);
  const [favorite, setFavorite] = useState(false);
  const [showCopiLink, setShowCopyLink] = useState(false);
  const [concludedRecipe, setConcludedRecipe] = useState<boolean []>([]);
  const { id } = useParams<{ id: string }>();
  const [enableFinishButton, setEnableFinishButton] = useState(false);

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

    const favoriteRecipesSave = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFavoriteRecipe = favoriteRecipesSave
      .some((recipeSave: any) => recipeSave.id === id);

    setFavorite(isFavoriteRecipe);
  }, [setRecipes, location.pathname, id]);

  useEffect(() => {
    const localStorageChecked = localStorage.getItem('inProgressRecipes-0');
    const checkSave = localStorageChecked && JSON.parse(localStorageChecked);
    if (checkSave) {
      allChecked(checkSave);
    }
  }, []);

  const allChecked = (allCheckedBox: { [key: string]: boolean }) => {
    const verifyAllChecked = Object.values(allCheckedBox).every((isChecked) => isChecked);

    if (verifyAllChecked) {
      setEnableFinishButton(true);
    } else {
      setEnableFinishButton(false);
    }
  };

  const handleChecked = (recipeIndex: number, isChecked: boolean) => {
    setConcludedRecipe((prevConcludedRecipe) => {
      const newConcludedRecipes = [...prevConcludedRecipe];
      newConcludedRecipes[recipeIndex] = isChecked;
      return newConcludedRecipes;
    });
  };

  const handleToggleFavorite = async () => {
    const addFavoriteRecipe = {
      id: recipes[0].idMeal || recipes[0].idDrink,
      type: recipes[0].idMeal ? 'meal' : 'drink',
      nationality: recipes[0].strArea || '',
      category: recipes[0].strCategory || '',
      alcoholicOrNot: recipes[0].strAlcoholic || '',
      name: recipes[0].strMeal || recipes[0].strDrink,
      image: recipes[0].strMealThumb || recipes[0].strDrinkThumb,
    };

    const favoriteRecipesSave = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    const isFavorite = favoriteRecipesSave
      .some((recipeLiked: any) => recipeLiked.id === addFavoriteRecipe.id);

    if (isFavorite) {
      const newFavoriteRecipes = favoriteRecipesSave
        .filter((recipeLiked: any) => recipeLiked.id !== addFavoriteRecipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavorite(false);
    } else {
      const newFavoriteRecipes = [...favoriteRecipesSave, addFavoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavorite(true);
    }
  };

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

  const handleFineshedRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const newDoneRecipe = {
      id: recipes[0].idMeal || recipes[0].idDrink,
      type: recipes[0].idMeal ? 'meal' : 'drink',
      nationality: recipes[0].strArea || '',
      category: recipes[0].strCategory || '',
      alcoholicOrNot: recipes[0].strAlcoholic || '',
      name: recipes[0].strMeal || recipes[0].strDrink,
      image: recipes[0].strMealThumb || recipes[0].strDrinkThumb,
      doneDate: new Date(),
      tags: recipes[0].strTags?.split(',') || [],
    };

    doneRecipes.push(newDoneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    navigate('/done-recipes');
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
              allChecked={ allChecked }
            />
          ))
        }
      </div>
      { showCopiLink && <h2 data-testid="mensage">Link copied!</h2>}
      <button
        type="button"
        className={ styles.Btn }
        onClick={ handleToggleFavorite }
      >
        <img
          src={ favorite ? fullHeartIcon : emptyHeartIcon }
          alt="favorite icon"
          data-testid="favorite-btn"
        />
      </button>
      <button
        type="button"
        className={ styles.Btn }
        onClick={ handleShareLinkRecipeInProgress }
      >
        <img
          className={ styles.img }
          src={ shareRecipe }
          alt="share icon"
          data-testid="share-btn"
        />
      </button>
      <button
        type="button"
        className={ `${enableFinishButton ? styles.Btn : styles.BtnOff}` }
        data-testid="finish-recipe-btn"
        disabled={ !enableFinishButton }
        onClick={ handleFineshedRecipe }
      >
        <img
          src={ finishIcon }
          alt="checked icon"
        />
      </button>
    </main>
  );
}
export default RecipesInProgress;
