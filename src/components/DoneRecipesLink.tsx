import { DoneRecipe } from '../types/types';

function DoneRecipiesLink({
  recipe,
  index,
}: {
  recipe: DoneRecipe;
  index: number;
}) {
  return (
    recipe.tags.map((tag) => (
      <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
        {tag}
      </span>)));
}

export default DoneRecipiesLink;
