import { useState } from 'react';
import SearchContext from './SearchContext';

import { SearchContextType } from '../../types/types';

function SearchProvider({ children }: any) {
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchClick = async () => {
    if (searchType === 'firstLetter' && searchValue.length > 1) {
      alert('Por favor, insira apenas uma letra para a busca por Primeira Letra.');
      // return;
    }

    // const data = await getData(searchType, searchValue);
    // console.log(`Resultados da busca por ${searchType}:`, data);
  };

  const shareValues: SearchContextType = {
    searchType,
    setSearchType,
    searchValue,
    setSearchValue,
    handleSearchClick,
  };

  return (
    <SearchContext.Provider value={ shareValues }>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
