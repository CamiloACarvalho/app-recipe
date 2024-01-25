import React from 'react';
import SearchContextProps from './SearchContext';

import { ProviderProps } from '../../types/types';

function SearchProvider({ children }: ProviderProps) {
  const [recipes, setRecipes] = React.useState([]);

  const dados = {
    recipes,
    setRecipes,
  };

  return (
    <SearchContextProps.Provider value={ dados }>
      <div>
        { children }
      </div>
    </SearchContextProps.Provider>
  );
}

export default SearchProvider;
