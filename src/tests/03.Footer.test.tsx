import { screen } from '@testing-library/react';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Testa o componente Footer', () => {
  test('03 - Testa se a navegação é feita corretamente ao clicar nos ícones de comida e bebida', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/profile' },
    );

    const getDrinksIcon = screen.getByRole('img', { name: /drinkicon/i });
    const getMealsIcon = screen.getByRole('img', { name: /mealicon/i });

    await user.click(getDrinksIcon);

    const getDrinkTitle = screen.getByRole('heading', { name: /drinks/i });
    expect(getDrinkTitle).toBeInTheDocument();

    await user.click(getMealsIcon);

    const getMealsTitle = screen.getByRole('img', { name: /mealicon/i });
    expect(getMealsTitle).toBeInTheDocument();
  });
});
