import { useState, useEffect } from 'react';

export const useDoneRecipes = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const savedDoneRecipes = JSON.parse(
      localStorage.getItem('doneRecipes') ?? '[]',
    );
    setDoneRecipes(savedDoneRecipes);
  }, []);

  const handleMealFilter = () => {
    const savedDoneRecipes = JSON.parse(
      localStorage.getItem('doneRecipes') ?? '[]',
    );
    const filtered = savedDoneRecipes.filter(
      (recipe: any) => recipe.type === 'meal',
    );
    setDoneRecipes(filtered);
  };

  const handleDrinkFilter = () => {
    const savedDoneRecipes = JSON.parse(
      localStorage.getItem('doneRecipes') ?? '[]',
    );
    const filtered = savedDoneRecipes.filter(
      (recipe: any) => recipe.type === 'drink',
    );
    setDoneRecipes(filtered);
  };

  const handleAllFilter = () => {
    const savedDoneRecipes = JSON.parse(
      localStorage.getItem('doneRecipes') ?? '[]',
    );
    setDoneRecipes(savedDoneRecipes);
  };

  return {
    doneRecipes,
    handleMealFilter,
    handleDrinkFilter,
    handleAllFilter,
  };
};
