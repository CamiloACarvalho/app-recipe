import { useState } from 'react';
import SearchContext from './SearchContext';
import { ProviderProps, MealType, DrinkType } from '../../types/types';

function SearchProvider({ children }: ProviderProps) {
  const [recipes, setRecipes] = useState<MealType[] | DrinkType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const dados = {
    recipes,
    setRecipes,
    searchValue,
    setSearchValue,
  };

  return (
    <SearchContext.Provider value={ dados }>
      { children }
    </SearchContext.Provider>
  );
}

export default SearchProvider;
