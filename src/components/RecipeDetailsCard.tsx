import { RecipeCardData } from '../types/types';

type RecipeCardDataProps = {
  recipeData: RecipeCardData[];
};

export default function RecipeDetailsCard({ recipeData }: RecipeCardDataProps) {
  return (
    <div>
      {
        recipeData?.map((recipe) => (
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
    </div>
  );
}
