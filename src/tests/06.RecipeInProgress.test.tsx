import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import OneDrinkMock from './mocks/OneDrinkMock';

describe('Testa o componente Header', async () => {
  beforeEach(() => vi
    .spyOn(global, 'fetch')
    .mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => OneDrinkMock,
    } as Response));

  afterEach(() => vi.clearAllMocks());
  test('01 - Verificando se os elementos da tela "Recipes in Progress" estão renderizando', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks/178319/in-progress' },
    );

    const getMealsTitle = await screen.findByRole('heading', { name: /categoria/i });
    expect(getMealsTitle).toBeInTheDocument();

    const titleName = await screen.findByTestId('recipe-title');
    expect(titleName).toHaveTextContent('Aquamarine');

    const category = await screen.findByTestId('recipe-category');
    expect(category).toHaveTextContent('Cocktail');

    const image = await screen.findByTestId('recipe-photo');
    expect(image).toBeInTheDocument();
  });
});
