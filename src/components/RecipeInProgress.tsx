import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import SearchContext from '../context/SearchContext/SearchContext';
import InProgressElements from './InProgressElements';
import fullHeartIcon from '../images/blackHeartIcon.svg';
import emptyHeartIcon from '../images/whiteHeartIcon.svg';
import finishIcon from '../images/icons8-done.svg';
import shareRecipe from '../images/shareIcon.svg';
import styles from './InProgressElements.module.css';

function Recipes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipes, setRecipes } = useContext(SearchContext);
  const [favorite, setFavorite] = useState(false);
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
  }, [setRecipes, location.pathname, id]);

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
    const mealPage = location.pathname.split('/')[1] === 'meals';
    const endpoint = mealPage ? mealEndpoint : drinkEndpoint;

    const favoriteRecipe = fetch(`${endpoint}${id}`)
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
        };
      });
    // Preciso continuar daqui para salvar as receitas favoritas dentro do localStorage
  };

  const handleShareLinkRecipeInProgress = () => {
    const mealPage = location.pathname.split('/')[1] === 'meals';
    const recipeType = mealPage ? 'meals' : 'drinks';
    const recipeId = location.pathname.split('/')[2];
    const link = `http://localhost:3000/${recipeType}/${recipeId}`;

    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copied!');
      })
      .catch(() => {
        alert('Erro ao copiar o link:');
      });
  };

  // const addDoneRecipeToLocalStorage = () => {
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  // };

  // const handleFineshedRecipe = () => {
  //   const mealPage = location.pathname.split('/')[1] === 'meals';
  //   const endpoint = mealPage ? mealEndpoint : drinkEndpoint;
  //   fetch(`${endpoint}${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const recipeType = mealPage ? 'meals' : 'drinks';
  //       const fetchedRecipes = data[recipeType];
  //       const recipe = fetchedRecipes[0];
  //       const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  //       const newDoneRecipe = {
  //         id: recipe[`id${recipeType.slice(0, 1).toUpperCase()}${recipeType.slice(1)}`],
  //         type: recipeType.slice(0, -1),
  //         area: recipe.strArea || '',
  //         category: recipe.strCategory || '',
  //         alcoholicOrNot: recipe.strAlcoholic || '',
  //         name: recipe[`str${recipeType.slice(0, 1)
  //           .toUpperCase()}${recipeType.slice(1)}`],
  //         image: recipe[`str${recipeType.slice(0, 1)
  //           .toUpperCase()}${recipeType.slice(1)}Thumb`],
  //         doneDate: new Date().toLocaleDateString('pt-BR'),
  //         tags: recipe.strTags ? recipe.strTags.split(',') : [],
  //       };
  //       doneRecipes.push(newDoneRecipe);
  //       localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  //       addDoneRecipeToLocalStorage();

  //       // Redirecionamento para /done-recipes
  //       navigate('/done-recipes');
  //     });
  // };

  const handleFineshedRecipe = () => {
    const mealPage = location.pathname.split('/')[1] === 'meals';
    const endpoint = mealPage ? mealEndpoint : drinkEndpoint;

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

        // Redirecionamento para /done-recipes
        navigate('/done-recipes');
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
              allChecked={ allChecked }
            />
          ))
        }
      </div>
      <button
        type="button"
        className={ styles.Btn }
        data-testid="favorite-btn"
        onClick={ handleToggleFavorite }
      >
        <img
          src={ favorite ? fullHeartIcon : emptyHeartIcon }
          alt="favorite icon"
        />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        className={ styles.Btn }
        onClick={ handleShareLinkRecipeInProgress }
      >
        <img
          className={ styles.img }
          src={ shareRecipe }
          alt="share icon"
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
export default Recipes;
