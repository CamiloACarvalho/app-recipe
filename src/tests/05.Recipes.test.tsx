import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import fetchMock from './Mocks/Mocks';

describe('Testa o componente Header', async () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);
  });
  test('01 - Verifican se os botões de categoria da tela de comidas funcionam', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    // Testando o botão de categoria Beef
    const getBeefBtn = await screen.findByTestId('Beef-category-filter');
    await user.click(getBeefBtn);

    // Chamando a receita que está na tela
    const getRecipeBeef = await screen.findByText(/beef and mustard pie/i);
    expect(getRecipeBeef).toBeInTheDocument();
  });
  test('02 - Verificando se ao clicar no mesmo botão de categoria de comidas a API é chamada novamente com as receitas iniciais', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    // Testando o botão de categoria Beef
    const getBeefBtn = await screen.findByRole('button', { name: /beef/i });
    await user.click(getBeefBtn);

    // Chamando a receita que está na tela
    const getRecipeBeef = await screen.findByText(/beef and mustard pie/i);
    expect(getRecipeBeef).toBeInTheDocument();

    // Testando o botão de categoria ao clicar nele novamente
    const getBeefBtnAgain = await screen.findByRole('button', { name: /beef/i });
    await user.click(getBeefBtnAgain);

    // Chamando a receita que está na tela
    const getRecipeCorba = await screen.findByText(/corba/i);
    expect(getRecipeCorba).toBeInTheDocument();
  });
  test('03 - Verificando se ao clicar no botão de resetar as categorias (botão "All") na tela de comidas a API é chamada novamente com as receitas iniciais', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    // Testando o botão de categoria Beef
    const getBeefBtn = await screen.findByRole('button', { name: /beef/i });
    await user.click(getBeefBtn);

    // Chamando a receita que está na tela
    const getRecipeBeef = await screen.findByText(/beef and mustard pie/i);
    expect(getRecipeBeef).toBeInTheDocument();

    // Testando o botão de resetar as categorias
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    await user.click(allBtn);

    const getRecipeCorba = await screen.findByText(/corba/i);
    expect(getRecipeCorba).toBeInTheDocument();
  });
  test('04 - Verificando se os botões de categoria da tela de bebidas funcionam', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const getInitialDrink = await screen.findByText(/a1/i);
    expect(getInitialDrink).toBeInTheDocument();

    const getOrdinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(getOrdinaryBtn).toBeInTheDocument();

    await user.click(getOrdinaryBtn);

    const getOrdinaryDrink = await screen.findByText(/3-mile long island iced tea/i);
    expect(getOrdinaryDrink).toBeInTheDocument();
  });
  test('05 - Verificando se ao clicar no mesmo botão de categoria de bebidas a API é chamada novamente com as receitas iniciais', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const getInitialDrink = await screen.findByText(/a1/i);
    expect(getInitialDrink).toBeInTheDocument();

    const getOrdinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(getOrdinaryBtn).toBeInTheDocument();

    await user.click(getOrdinaryBtn);

    const getOrdinaryDrink = await screen.findByText(/3-mile long island iced tea/i);
    expect(getOrdinaryDrink).toBeInTheDocument();

    const getOrdinaryBtnAgain = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(getOrdinaryBtnAgain).toBeInTheDocument();

    await user.click(getOrdinaryBtnAgain);

    const getInitialDrinkAgain = await screen.findByText(/a1/i);
    expect(getInitialDrinkAgain).toBeInTheDocument();
  });
  test('06 - Verificando se ao clicar no botão de resetar as categorias (botão "All") na tela de bebidas a API é chamada novamente com as receitas iniciais', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const getInitialDrink = await screen.findByText(/a1/i);
    expect(getInitialDrink).toBeInTheDocument();

    const getOrdinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(getOrdinaryBtn).toBeInTheDocument();

    await user.click(getOrdinaryBtn);

    const getOrdinaryDrink = await screen.findByText(/3-mile long island iced tea/i);
    expect(getOrdinaryDrink).toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    await user.click(allBtn);

    const getInitialDrinkAgain = await screen.findByText(/a1/i);
    expect(getInitialDrinkAgain).toBeInTheDocument();
  });
});
