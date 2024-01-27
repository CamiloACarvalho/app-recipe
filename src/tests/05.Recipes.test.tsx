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
      { route: '/meals' },
    );

    // Verificando se estão todos os botões de busca por categoria
    const getBeefBtn = await screen.findByRole('button', { name: /beef/i });
    expect(getBeefBtn).toBeInTheDocument();

    const getBreakfastBtn = await screen.findByRole('button', { name: /breakfast/i });
    expect(getBreakfastBtn).toBeInTheDocument();

    const getChickenBtn = await screen.findByRole('button', { name: /chicken/i });
    expect(getChickenBtn).toBeInTheDocument();

    const getDessertBtn = await screen.findByRole('button', { name: /dessert/i });
    expect(getDessertBtn).toBeInTheDocument();

    const getGoatBtn = await screen.findByRole('button', { name: /goat/i });
    expect(getGoatBtn).toBeInTheDocument();
  });

  test('02 - Verificando se os botões de categoria da tela de comidas funcionam', async () => {
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

    // Testando o botão de categoria Breakfast
    const getBreakfastBtn = await screen.findByTestId('Breakfast-category-filter');
    await user.click(getBreakfastBtn);

    // Chamando a receita que está na tela
    const getRecipeBrakfast = await screen.findByText(/bread omelette/i);
    expect(getRecipeBrakfast).toBeInTheDocument();

    // Testando o botão de categoria Chicken
    const getChickenBtn = await screen.findByTestId('Chicken-category-filter');
    await user.click(getChickenBtn);

    // Chamando a receita que está na tela
    const getRecipeChicken = await screen.findByText(/ayam percik/i);
    expect(getRecipeChicken).toBeInTheDocument();

    // Testando o botão de categoria Dessert
    const getDessertBtn = await screen.findByTestId('Dessert-category-filter');
    await user.click(getDessertBtn);

    // Chamando a receita que está na tela
    const getRecipeDessert = await screen.findByText(/apam balik/i);
    expect(getRecipeDessert).toBeInTheDocument();

    // Testando o botão de categoria Goat
    const getGoatBtn = await screen.findByTestId('Goat-category-filter');
    await user.click(getGoatBtn);

    // Chamando a receita que está na tela
    const getRecipeGoat = await screen.findByText(/mbuzi choma/i);
    expect(getRecipeGoat).toBeInTheDocument();
  });
  test('03 - Verificando se ao clicar no mesmo botão de categoria de comidas a API é chamada novamente com as receitas iniciais', async () => {
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
  test('04 - Verificando se ao clicar no botão de resetar as categorias (botão "All") na tela de comidas a API é chamada novamente com as receitas iniciais', async () => {
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
  test('05 - Verificando se os elementos da tela de bebidas estão presentes', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    // Verificando se estão todos os botões de busca por categoria
    const getOrdinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(getOrdinaryBtn).toBeInTheDocument();

    const getCocktailBtn = await screen.findByRole('button', { name: /cocktail/i });
    expect(getCocktailBtn).toBeInTheDocument();

    const getShakeBtn = await screen.findByRole('button', { name: /shake/i });
    expect(getShakeBtn).toBeInTheDocument();

    const getOthertBtn = await screen.findByRole('button', { name: /other \/ unknown/i });
    expect(getOthertBtn).toBeInTheDocument();

    const getCocoaBtn = await screen.findByRole('button', { name: /cocoa/i });
    expect(getCocoaBtn).toBeInTheDocument();
  });
  test('06 - Verificando se os botões de categoria da tela de bebidas funcionam', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const getInitialDrink = await screen.findByText(/a1/i);
    expect(getInitialDrink).toBeInTheDocument();

    // Verificando se estão todos os botões de busca por categoria
    const getOrdinaryBtn = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(getOrdinaryBtn).toBeInTheDocument();

    await user.click(getOrdinaryBtn);

    const getOrdinaryDrink = await screen.findByText(/3-mile long island iced tea/i);
    expect(getOrdinaryDrink).toBeInTheDocument();

    const getCocktailBtn = await screen.findByRole('button', { name: /cocktail/i });
    expect(getCocktailBtn).toBeInTheDocument();

    await user.click(getCocktailBtn);

    const getCocktailDrink = await screen.findByText(/155 belmont/i);
    expect(getCocktailDrink).toBeInTheDocument();

    const getShakeBtn = await screen.findByRole('button', { name: /shake/i });
    expect(getShakeBtn).toBeInTheDocument();

    await user.click(getShakeBtn);

    const getShakeDrink = await screen.findByText(/151 florida bushwacker/i);
    expect(getShakeDrink).toBeInTheDocument();

    const getOthertBtn = await screen.findByRole('button', { name: /other \/ unknown/i });
    expect(getOthertBtn).toBeInTheDocument();

    await user.click(getOthertBtn);

    const getOtherDrink = await screen.findByText(/a piece of ass/i);
    expect(getOtherDrink).toBeInTheDocument();

    const getCocoaBtn = await screen.findByRole('button', { name: /cocoa/i });
    expect(getCocoaBtn).toBeInTheDocument();

    await user.click(getCocoaBtn);

    const getCocoaDrink = await screen.findByText(/castillian hot chocolate/i);
    expect(getCocoaDrink).toBeInTheDocument();
  });
  test('07 - Verificando se ao clicar no mesmo botão de categoria de bebidas a API é chamada novamente com as receitas iniciais', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const getInitialDrink = await screen.findByText(/a1/i);
    expect(getInitialDrink).toBeInTheDocument();

    // Verificando se estão todos os botões de busca por categoria
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
  test('08 - Verificando se ao clicar no botão de resetar as categorias (botão "All") na tela de bebidas a API é chamada novamente com as receitas iniciais', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const getInitialDrink = await screen.findByText(/a1/i);
    expect(getInitialDrink).toBeInTheDocument();

    // Verificando se estão todos os botões de busca por categoria
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
