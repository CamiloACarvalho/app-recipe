import { screen } from '@testing-library/react';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Testa o componente Header', () => {
  test('01 - Testa se na rota "meals" o Header aparece com seus componentes e é possível interagir com eles', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const getMealsTitle = screen.getByRole('heading', { name: /meals/i });
    expect(getMealsTitle).toBeInTheDocument();
    const getSearchBtn = screen.getByRole('img', { name: /search icon/i });
    expect(getSearchBtn).toBeInTheDocument();
    const getProfileIcon = screen.getByRole('button', { name: /profile icon/i });

    await user.click(getSearchBtn);

    const getSearchInput = screen.getByRole('textbox');
    expect(getSearchInput).toBeInTheDocument();

    await user.click(getProfileIcon);

    const getProfileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(getProfileTitle).toBeInTheDocument();
  });
});
