import { createContext } from 'react';

type SearchContextProps = {
  recipes:any;
  setRecipes:any;
};

const SearchContext = createContext({} as SearchContextProps);

export default SearchContext;
