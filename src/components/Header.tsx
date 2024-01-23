// Header.jsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [pageTitle, setPageTitle] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const routeConfig = {
      '/meals': {
        title: 'Meals',
        showSearch: false,
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
  }, [location.pathname]);

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header>
      <Link to="/profile" data-testid="profile-top-btn">
        <img src="./images/profileIcon.svg" alt="profile icon" className="profile-icon" />
      </Link>
      <h1 data-testid="page-title" className="title-header">
        {pageTitle}
      </h1>
      <input
        type="text"
        data-testid="search-input"
        className="search-input"
        disabled={ !showSearchBar }
        placeholder="Search"
      />
      <button
        type="button"
        data-testid="search-top-btn"
        className="search-btn"
        onClick={ handleSearchBar }
        disabled={ !showSearchIcon }
      >
        <img src="./images/searchIcon.svg" alt="search icon" />
      </button>
    </header>
  );
}

export default Header;
