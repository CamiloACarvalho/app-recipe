import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchContext from '../context/SearchContext/SearchContext';

function Header() {
  const [pageTitle, setPageTitle] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const location = useLocation();

  useEffect(() => {
    const routeConfig = {
      '/meals': {
        title: 'Meals',
        showSearch: true,
      },
      '/drinks': {
        title: 'Drinks',
        showSearch: true,
      },
      '/profile': {
        title: 'Profile',
        showSearch: true,
      },
      '/done-recipes': {
        title: 'Done Recipes',
        showSearch: true,
      },
      '/favorite-recipes': {
        title: 'Favorite Recipes',
        showSearch: true,
      },
    };
    const currentRoute = routeConfig[location.pathname as keyof typeof routeConfig];
    setPageTitle(currentRoute?.title);
    setShowSearchBar(currentRoute?.showSearch || false);
  }, [location.pathname]);

  const handleSearchBar = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <header>
      <Link to="/profile">
        <button
          type="button"
          className="profile-btn"
        >
          <img
            data-testid="profile-top-btn"
            src="src/images/profileIcon.svg"
            alt="profile icon"
            className="profile-icon"
          />
        </button>
      </Link>
      <h1 data-testid="page-title" className="title-header">
        { pageTitle }
      </h1>
      {showSearchBar && (
        <>
          {
          showSearchInput
          && <input
            type="text"
            data-testid="search-input"
            className="search-input"
            placeholder="Search"
            value={ searchValue }
            onChange={ (e) => setSearchValue(e.target.value) }
          />
          }
          <button
            type="button"
            className="search-btn"
            onClick={ handleSearchBar }
          >
            <img
              data-testid="search-top-btn"
              src="src/images/searchIcon.svg"
              alt="search icon"
            />
          </button>
          <SearchBar />
        </>
      )}
    </header>
  );
}
export default Header;
