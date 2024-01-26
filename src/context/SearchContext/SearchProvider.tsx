import { useState } from 'react';
import SearchContext from './SearchContext';
import { ProviderProps } from '../../types/types';

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
      <div>
        { children }
      </div>
    </SearchContext.Provider>
  );
}

export default SearchProvider;
