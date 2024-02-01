import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { email } = user;

  const handleNav = ({ target }: any) => {
    const { name } = target;
    if (name === 'done-recipes') {
      navigate('/done-recipes');
    }
    if (name === 'favorite-recipes') {
      navigate('/favorite-recipes');
    }
    if (name === 'logout') {
      localStorage.clear();
      navigate('/');
    }
  };
  return (
    <div>
      <h3 data-testid="profile-email">{email}</h3>

      <div>
        <button
          name="done-recipes"
          data-testid="profile-done-btn"
          onClick={ handleNav }
        >
          Done Recipes
        </button>
        <button
          name="favorite-recipes"
          data-testid="profile-favorite-btn"
          onClick={ handleNav }
        >
          Favorite Recipes
        </button>
        <button
          name="logout"
          data-testid="profile-logout-btn"
          onClick={ handleNav }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
