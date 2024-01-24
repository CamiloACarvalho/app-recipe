// import React, { useState } from 'react';
// import {
//   fetchData,
//   endPoint,
//   mapDrinkData,
//   mapMealData,
// } from '../utils/Api';

function SearchBar() {
  // const [searchType, setSearchType] = useState('name');

  // const handleSearchClick = async () => {
  //   if (searchType === 'firstLetter' && searchValue.length > 1) {
  //     alert('Por favor, insira apenas uma letra para a busca por Primeira Letra.');
  //     return;
  //   }

  //   const data = await getData(searchType, searchValue);
  //   console.log(`Resultados da busca por ${searchType}:`, data);
  // };

  return (
    <div className="search-bar">
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        id="ingredient-search-radio"
        value="ingredient"
        // checked={ searchType === 'ingredient' }
      />
      <label htmlFor="ingredient-search-radio">Ingrediente</label>

      <input
        type="radio"
        data-testid="name-search-radio"
        id="name-search-radio"
        value="name"
        // checked={ searchType === 'name' }
      />
      <label htmlFor="name-search-radio">Nome</label>

      <input
        type="radio"
        data-testid="first-letter-search-radio"
        id="first-letter-search-radio"
        value="firstLetter"
        // checked={ searchType === 'firstLetter' }
      />
      <label htmlFor="first-letter-search-radio">Primeira letra</label>

      <button
        type="button"
        data-testid="exec-search-btn"
        // onClick={ handleSearchClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
