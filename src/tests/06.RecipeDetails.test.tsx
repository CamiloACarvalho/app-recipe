import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import fetchMock from './Mocks/Mocks';

const mealsDetailRoute = '/meals/52977';

describe('Testa a tela de detalhes das receitas', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);
  });
  test('01 - Testa o botão de favoritar da tela de detalhes', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: mealsDetailRoute },
    );
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    await user.click(favoriteBtn);

    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });
  test('02 - Testa o botão de compartilhar a receita na tela de detalhes', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: mealsDetailRoute },
    );
    const shareBtn = await screen.findByTestId('share-btn');
    await user.click(shareBtn);
    const getLinkCopiedText = screen.getByText('Link copied!');
    expect(getLinkCopiedText).toBeInTheDocument();
  });
  test('03 - Testa o botão "Start Recipe" na tela de detalhes de uma comida', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: mealsDetailRoute },
    );
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    await user.click(startRecipeBtn);
    expect(window.location.pathname).toBe('/meals/52977/in-progress');
  });
  test('04 - Testa o botão "Start Recipe" na tela de detalhes de uma bebida', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks/17222' },
    );
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    await user.click(startRecipeBtn);
    expect(window.location.pathname).toBe('/drinks/17222/in-progress');
  });
  test('05 - Testa o botão de mudar os itens no carousel na tela de detalhes de uma bebida', async () => {
    const { user, container } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals/52977' },
    );

    await screen.findByText('Corba');
    screen.debug();
    const getCarouselBtn = container.getElementsByClassName('carousel-control-next-icon');
    await user.click(getCarouselBtn[0]);
    const getNextItem = screen.getByTestId('2-recommendation-title');
    expect(getNextItem).toBeInTheDocument();
  });
});
