import { useState } from 'react';
import { ProviderProps } from '../../types/types';
import SearchContext from './SearchContext';

function SearchProvider({ children }: ProviderProps) {
  const [recipes, setRecipes] = useState([]);
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
