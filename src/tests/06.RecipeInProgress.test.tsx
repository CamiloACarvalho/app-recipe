import { screen } from '@testing-library/react';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Testa o componente Header', async () => {
  test('01 - Verificando se os elementos da tela de comidas estão presentes', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks/178319/in-progress' },
    );
    // const MOCK_RESPONSE = {
    //   ok: true,
    //   status: 200,
    //   json: async () => MOCK_JOKE,
    // } as Response;

    // const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const getMealsTitle = await screen.findByRole('heading', { name: /categoria/i });
    expect(getMealsTitle).toBeInTheDocument();

    const titleName = await screen.findByTestId('recipe-title');
    expect(titleName).toHaveTextContent('Aquamarine');
  });
});
