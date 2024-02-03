import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DoneRecipes from '../components/DoneRecipes';
import { drinkMock, mealsMock } from './Mocks/DoneRecipesMock';

enum TestIds {
  ALL_BTN = 'filter-by-all-btn',
  MEAL_BTN = 'filter-by-meal-btn',
  DRINK_BTN = 'filter-by-drink-btn',
  SHARE_BTN = '0-horizontal-share-btn',
}

describe('DoneRecipes/Meals', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify([mealsMock]));
  });

  afterEach(() => localStorage.clear());
  test('Testando se botões de filtro funcionam', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const allBtn = screen.getByTestId(TestIds.ALL_BTN);
    const mealsBtn = screen.getByTestId(TestIds.MEAL_BTN);
    const drinksBtn = screen.getByTestId(TestIds.DRINK_BTN);

    await userEvent.click(allBtn);
    await userEvent.click(mealsBtn);
    await userEvent.click(drinksBtn);
  });
});

describe('DoneRecipes/Drinks', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify([drinkMock]));
  });
  afterEach(() => localStorage.clear());
  test('Testando se botão e compartilhar funciona', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const allBtn = screen.getByTestId(TestIds.ALL_BTN);
    const mealsBtn = screen.getByTestId(TestIds.MEAL_BTN);
    const drinksBtn = screen.getByTestId(TestIds.DRINK_BTN);

    await userEvent.click(allBtn);
    await userEvent.click(mealsBtn);
    await userEvent.click(drinksBtn);
  });
  test('Testando botões de filtro', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const sharedBtn = screen.getByTestId(TestIds.SHARE_BTN);
    await userEvent.click(sharedBtn);
  });
});

describe('DoneRecipes/Localstorage', () => {
  test('Testando os botões de filtro', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const allBtn = screen.getByTestId(TestIds.ALL_BTN);
    const mealsBtn = screen.getByTestId(TestIds.MEAL_BTN);
    const drinksBtn = screen.getByTestId(TestIds.DRINK_BTN);

    await userEvent.click(allBtn);
    await userEvent.click(mealsBtn);
    await userEvent.click(drinksBtn);
  });
});
