export type SearchContextType = {
  searchValue: string;
  searchType: string;
  setSearchValue: (value: string) => void;
  setSearchType: (value: string) => void;
  handleSearchClick: () => void;
};
