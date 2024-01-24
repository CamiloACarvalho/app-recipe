import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <div
      className="footer"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src="src/images/drinkIcon.svg"
          alt="drinkIcon"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src="src/images/mealIcon.svg"
          alt="mealIcon"
        />
      </Link>
    </div>
  );
}
