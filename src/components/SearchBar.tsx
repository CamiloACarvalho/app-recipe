import { useContext } from 'react';
import SearchContext from '../context/SearchContext/SearchContext';

function SearchBar() {
  const {
    searchType,
    handleSearchClick,
  } = useContext(SearchContext);

  return (
    <div className="search-bar">
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        id="ingredient-search-radio"
        value="ingredient"
        checked={ searchType === 'ingredient' }
      />
      <label htmlFor="ingredient-search-radio">Ingrediente</label>

      <input
        type="radio"
        data-testid="name-search-radio"
        id="name-search-radio"
        value="name"
        checked={ searchType === 'name' }
      />
      <label htmlFor="name-search-radio">Nome</label>

      <input
        type="radio"
        data-testid="first-letter-search-radio"
        id="first-letter-search-radio"
        value="firstLetter"
        checked={ searchType === 'firstLetter' }
      />
      <label htmlFor="first-letter-search-radio">Primeira letra</label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
