import { useState, useEffect } from 'react';

export const useFavoritesRecipies = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any>([]);
  const [favoriteSort, setFavoriteSort] = useState<any>([]);

  const handleFilterMeal = () => {
    const filter = favoriteRecipes.filter(
      (recipe: any) => recipe.type === 'meal',
    );
    setFavoriteRecipes(filter);
  };

  const handleFilterDrink = () => {
    const filter = favoriteRecipes.filter(
      (recipe: any) => recipe.type === 'drink',
    );
    setFavoriteRecipes(filter);
  };

  const handleFilterAll = () => {
    const savedFavorite = JSON.parse(
      localStorage.getItem('favoriteRecipes') ?? '[]',
    );
    setFavoriteRecipes(savedFavorite);
    setFavoriteSort([]);
  };

  const handleFavorite = (recipeId: any) => {
    const updatFavorites = favoriteRecipes.filter(
      (recipe: any) => recipe.id !== recipeId,
    );
    setFavoriteRecipes(updatFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatFavorites));
  };

  useEffect(() => {
    const saveFavorite = JSON.parse(
      localStorage.getItem('favoriteRecipes') ?? '[]',
    );
    setFavoriteRecipes(saveFavorite);
  }, []);

  return {
    favoriteRecipes,
    setFavoriteRecipes,
    handleFilterMeal,
    handleFilterDrink,
    handleFilterAll,
    favoriteSort,
    setFavoriteSort,
    handleFavorite,
  };
};
// ----------------------------------------------------------------//
