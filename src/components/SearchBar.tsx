function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        id="kind-of-search-radio"
      />
      <label
        htmlFor="kind-of-search-radio"
      >
        Ingrediente
      </label>
      <input
        type="radio"
        data-testid="name-search-radio"
        id="kind-of-search-radio"
      />
      <label
        htmlFor="kind-of-search-radio"
      >
        Nome
      </label>
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        id="kind-of-search-radio"
      />
      <label
        htmlFor="kind-of-search-radio"
      >
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
