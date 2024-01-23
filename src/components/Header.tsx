// Header.jsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [pageTitle, setPageTitle] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [showProfileIcon, setShowProfileIcon] = useState(true); // Por padrão, o ícone de perfil está sempre presente
  const location = useLocation();

  useEffect(() => {
    const routeConfig = {
      '/meals': {
        title: 'Meals',
        showSearchBar: true,
        showSearchIcon: true,
        showProfileIcon: true,
      },
      '/drinks': {
        title: 'Drinks',
        showSearchBar: false,
        showSearchIcon: true,
        showProfileIcon: true,
      },
      '/profile': {
        title: 'Profile',
        showSearchBar: false,
        showSearchIcon: false,
        showProfileIcon: true,
      },
      '/done-recipes': {
        title: 'Done Recipes',
        showSearchBar: false,
        showSearchIcon: false,
        setShowProfileIcon: true,
      },
      '/favorite-recipes': {
        title: 'Favorite Recipes',
        showSearchBar: false,
        showSearchIcon: false,
        showProfileIcon: true,
      },
    };

    const currentRoute = routeConfig[location.pathname as keyof typeof routeConfig];

    setPageTitle(currentRoute?.title || '');
    setShowSearchBar(currentRoute?.showSearchBar || false);
    setShowSearchIcon(currentRoute?.showSearchIcon || false);
    setShowProfileIcon(currentRoute?.showProfileIcon || false);
  }, [location.pathname]);

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        className="profile-btn"
        disabled={ !showProfileIcon }
      >
        <Link to="/profile" data-testid="profile-top-btn">
          <img
            src="./images/profileIcon.svg"
            alt="profile icon"
            className="profile-icon"
          />
        </Link>
      </button>
      <h1 data-testid="page-title" className="title-header">
        {pageTitle}
      </h1>
      {showSearchBar && (
        <>
          <input
            type="text"
            data-testid="search-input"
            className="search-input"
            placeholder="Search"
          />
          <button
            type="button"
            data-testid="search-top-btn"
            className="search-btn"
            onClick={ handleSearchBar }
          >
            <img src="./images/searchIcon.svg" alt="search icon" />
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
