import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [pageTitle, setPageTitle] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const routeConfig = {
      '/meals': {
        title: 'Meals',
        showSearch: true,
        showSearchIcon: true,
      },
      '/drinks': {
        title: 'Drinks',
        showSearch: false,
        showSearchIcon: true,
      },
      '/profile': {
        title: 'Profile',
        showSearch: false,
        showSearchIcon: false,
      },
      '/done-recipes': {
        title: 'Done Recipes',
        showSearch: false,
        showSearchIcon: false,
      },
      '/favorite-recipes': {
        title: 'Favorite Recipes',
        showSearch: false,
        showSearchIcon: false,
      },
    };
    const currentRoute = routeConfig[location.pathname as keyof typeof routeConfig];

    setPageTitle(currentRoute?.title || '');
    setShowSearchBar(currentRoute?.showSearch || false);
    setShowSearchIcon(currentRoute?.showSearchIcon || false);
    setShowProfileIcon(location.pathname === '/profile');
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
        </>
      )}
    </header>
  );
}
export default Header;
