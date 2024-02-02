import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import fetchMock from './Mocks/Mocks';

describe('Testa o componente Header', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);
  });
  test('01 - Testa se na rota "meals" o Header aparece com seus componentes e é possível interagir com eles', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const getSearchBtn = screen.getByRole('img', { name: /search icon/i });
    const getProfileIcon = screen.getByRole('button', { name: /profile icon/i });

    await user.click(getSearchBtn);

    const getSearchInput = screen.getByRole('textbox');
    expect(getSearchInput).toBeInTheDocument();

    await user.click(getProfileIcon);

    const getProfileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(getProfileTitle).toBeInTheDocument();
  });
});
