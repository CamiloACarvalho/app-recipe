import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { favoriteRecipes } from './Mocks/FavoritesDoneMock';
import FavoriteRecipes from '../components/FavoriteRecipes';

enum TestIds {
  ALL_BTN = 'filter-by-all-btn',
  MEAL_BTN = 'filter-by-meal-btn',
  DRINK_BTN = 'filter-by-drink-btn',
  FAVORITE_BTN = '0-horizontal-favorite-btn',
  SHARE_BTN = '0-horizontal-share-btn',
}

describe('Testando FavoriteRecipes.', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipes]));
  });
  afterEach(() => localStorage.clear());
  test('Testando botões de filtro.', async () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
    const allBtn = screen.getByTestId(TestIds.ALL_BTN);
    const mealsBtn = screen.getByTestId(TestIds.MEAL_BTN);
    const drinksBtn = screen.getByTestId(TestIds.DRINK_BTN);

    await userEvent.click(allBtn);
    await userEvent.click(mealsBtn);
    await userEvent.click(drinksBtn);
  });
  test('Testando botão de desfavoritar.', async () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
    const favoritBtn = screen.getByTestId(TestIds.FAVORITE_BTN);
    await userEvent.click(favoritBtn);
  });
  test('Testando botão de compartilhar', async () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
    const sharedBtn = screen.getByTestId(TestIds.SHARE_BTN);
    await userEvent.click(sharedBtn);
  });
});
