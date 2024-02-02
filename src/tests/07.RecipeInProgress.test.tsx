import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import OneDrinkMock from './RecipeInProgressMOCK/OneDrinkMock';

describe('Teste para o componente Recipe In Progress', async () => {
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

    const itHasAlchool = await screen.findByRole('heading', { name: /alcoholic/i });
    expect(itHasAlchool).toHaveTextContent('Alcoholic');

    const ingredient01 = await screen.findByTestId('0-ingredient-step');
    expect(ingredient01).toHaveTextContent('Hpnotiq: 2 oz');

    const ingredient02 = await screen.findByTestId('1-ingredient-step');
    expect(ingredient02).toHaveTextContent('Pineapple Juice: 1 oz');

    const ingredient03 = await screen.findByTestId('2-ingredient-step');
    expect(ingredient03).toHaveTextContent('Banana Liqueur: 1 oz');

    const preparation = await screen.findByTestId('instructions');
    expect(preparation).toBeInTheDocument();

    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const finshButton = await screen.findByTestId('finish-recipe-btn');
    expect(finshButton).toBeInTheDocument();
  });

  test('02 - Verificando as funcionalidades da tela "Recipes in Progress"', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks/178319/in-progress' },
    );

    const shareButton = screen.getByTestId('share-btn');

    userEvent.click(shareButton);

    const message = await screen.findByTestId('mensage');
    expect(message).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    const doneButton = screen.getByTestId('finish-recipe-btn');
    expect(doneButton).toBeDisabled();

    const inputCheck0 = await screen.findByTestId('0-checkbox');
    expect(inputCheck0).toBeInTheDocument();
    expect(inputCheck0).not.toBeChecked();

    await userEvent.click(inputCheck0);

    expect(inputCheck0).toBeChecked();

    expect(doneButton).toBeDisabled();

    const inputCheck1 = await screen.findByTestId('1-checkbox');
    expect(inputCheck1).toBeInTheDocument();
    expect(inputCheck1).not.toBeChecked();

    await userEvent.click(inputCheck1);

    expect(inputCheck1).toBeChecked();

    expect(doneButton).toBeDisabled();

    const inputCheck2 = await screen.findByTestId('2-checkbox');
    expect(inputCheck2).toBeInTheDocument();
    expect(inputCheck2).not.toBeChecked();

    await userEvent.click(inputCheck2);

    expect(inputCheck2).toBeChecked();

    expect(doneButton).toBeEnabled();

    await userEvent.click(doneButton);

    const btnOtherPage = await screen.findByTestId('filter-by-meal-btn');
    expect(btnOtherPage).toBeInTheDocument();
  });
});
