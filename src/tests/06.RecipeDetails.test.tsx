import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import OneDrinkMock from './RecipeInProgressMOCK/OneDrinkMock';

// const mealsDetailRoute = '/meals/52977';
const routeTest = '/drinks/178319';
const start = 'start-recipe-btn';

describe('Testa a tela de detalhes das receitas', () => {
  beforeEach(() => vi
    .spyOn(global, 'fetch')
    .mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => OneDrinkMock,
    } as Response));

  afterEach(() => vi.clearAllMocks());

  test('01 - Verifica os componentes na tela, se estão sendo renderizados', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: routeTest },
    );

    // refazendo o teste
    const photo = await screen.findByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();

    const title = await screen.findByTestId('recipe-title');
    expect(title).toHaveTextContent('Aquamarine');

    const caegory = await screen.findByTestId('recipe-category');
    expect(caegory).toBeInTheDocument();

    const ingredient01 = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient01).toHaveTextContent('Hpnotiq 2 oz');

    const ingredient02 = await screen.findByTestId('1-ingredient-name-and-measure');
    expect(ingredient02).toHaveTextContent('Pineapple Juice 1 oz');

    const ingredient03 = await screen.findByTestId('2-ingredient-name-and-measure');
    expect(ingredient03).toHaveTextContent('Banana Liqueur 1 oz');

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const startRecipeBtn = await screen.findByTestId(start);
    expect(startRecipeBtn).toBeInTheDocument();

    const itHasCarousel = await screen.findByTestId('carousel');
    expect(itHasCarousel).toBeInTheDocument();
  });

  test('02 - Testa o botão de compartilhar a receita na tela de detalhes', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: routeTest },
    );
    const shareBtn = await screen.findByTestId('share-btn');
    await user.click(shareBtn);
    const getLinkCopiedText = screen.getByText('Link copied!');
    expect(getLinkCopiedText).toBeInTheDocument();
  });

  test('03 - Testa o botão "Start Recipe" na tela de detalhes de uma bebida', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: routeTest },
    );
    const startRecipeBtn = await screen.findByTestId(start);
    await user.click(startRecipeBtn);
    // expect(window.location.pathname).toBe('drinks/178319/in-progress');

    const profileBtn = await screen.findByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });

  test('04 - Testa o botão o botão de favoritar receita', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: routeTest },
    );

    window.localStorage.clear();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    expect(window.localStorage.getItem('favoriteRecipes')).toBe('{"cocktail":{"178319":{"idDrink":"178319","strDrink":"Aquamarine","strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"}}}');

    userEvent.click(favoriteButton);

    expect(window.localStorage.getItem('favoriteRecipes')).toBe('{}');

  });

  test('05 - Testa o caroussel', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: routeTest },
    );

    const carousel = await screen.findByTestId('carousel');
    expect(carousel).toBeInTheDocument();

    const nextButton = await screen.findByTestId('next');
    expect(nextButton).toBeInTheDocument();

    const prevButton = await screen.findByTestId('prev');
    expect(prevButton).toBeInTheDocument();

    userEvent.click(nextButton);
  });
});
