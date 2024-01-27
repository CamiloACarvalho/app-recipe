import { screen, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import mockApiMeals from './mockApiMeals';
import mockCategories from './mockCategories';

const email = 'email-input';
const password = 'password-input';
const submitBtn = 'login-submit-btn';

describe('Testa o componente Header', async () => {
  // beforeEach(() => vi
  //   .spyOn(global, 'fetch')
  //   .mockResolvedValue({
  //     ok: true,
  //     status: 200,
  //     json: async () => [
  //       mockApiMeals,
  //       mockCategories,
  //     ],
  //   } as Response));

  // afterEach(() => vi.clearAllMocks());

  test('01 - Verificando se os elementos estão na tela', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockCategories,
    } as Response;
    const mock = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    // const getEmail = screen.getByTestId(email);
    // const getPassword = screen.getByTestId(password);
    // const getSubmitBtn = screen.getByTestId(submitBtn);
    // const emailTest = 'email@test.com';

    // await user.type(getEmail, emailTest);
    // await user.type(getPassword, '1234567');
    // await user.click(getSubmitBtn);

    // Verificando se há um testo de receitas na tela
    const getRecipesTitle = screen.getByRole('heading', { name: /receitas/i });
    expect(getRecipesTitle).toBeInTheDocument();

    // Verificando se estão todos os botões de busca por categoria
    const getBeefBtn = await screen.findByRole('button', { name: /beef/i });
    expect(getBeefBtn).toBeInTheDocument();

    //   const getBreakfastBtn = screen.findByRole('Breakfast-category-filter');
    //   expect(getBreakfastBtn).toBeInTheDocument();

    //   const getChickenBtn = screen.findByRole('Chicken-category-filter');
    //   expect(getChickenBtn).toBeInTheDocument();

    //   const getDessertBtn = screen.findByRole('Dessert-category-filter');
    //   expect(getDessertBtn).toBeInTheDocument();

    //   const getGoatBtn = screen.findByRole('Goat-category-filter');
    //   expect(getGoatBtn).toBeInTheDocument();
  });

  // test('02 - Verificando se os botões de categoria funcionam', async () => {
  //   const { user } = renderWithRouter(
  //     <SearchProvider>
  //       <App />
  //     </SearchProvider>,
  //     { route: '/meals' },
  //   );

  //   const dataTestIds = '0-card-name';

  //   // Testando o botão de categoria Beef
  //   const getBeefBtn = screen.getByTestId('Beef-category-filter');
  //   user.click(getBeefBtn);

  //   // Chamando a receita que está na tela
  //   const getRecipeBeef = screen.getByTestId(dataTestIds);
  //   expect(getRecipeBeef).toHaveTextContent('Beef and Mustard Pie');

  //   // Testando o botão de categoria Breakfast
  //   const getBreakfastBtn = screen.getByTestId('Breakfast-category-filter');
  //   user.click(getBreakfastBtn);

  //   // Chamando a receita que está na tela
  //   const getRecipeBrakfast = screen.getByTestId(dataTestIds);
  //   expect(getRecipeBrakfast).toHaveTextContent('Bread omelette');

  //   // Testando o botão de categoria Chicken
  //   const getChickenBtn = screen.getByTestId('Chicken-category-filter');
  //   user.click(getChickenBtn);

  //   // Chamando a receita que está na tela
  //   const getRecipeChicken = screen.getByTestId(dataTestIds);
  //   expect(getRecipeChicken).toHaveTextContent('Chicken Couscous Salad');

  //   // Testando o botão de categoria Dessert
  //   const getDessertBtn = screen.getByTestId('Dessert-category-filter');
  //   user.click(getDessertBtn);

  //   // Chamando a receita que está na tela
  //   const getRecipeDessert = screen.getByTestId(dataTestIds);
  //   expect(getRecipeDessert).toHaveTextContent('Apple Frangipan Tart');

  //   // Testando o botão de categoria Goat
  //   const getGoatBtn = screen.getByTestId('Goat-category-filter');
  //   user.click(getGoatBtn);

  //   // Chamando a receita que está na tela
  //   const getRecipeGoat = screen.getByTestId(dataTestIds);
  //   expect(getRecipeGoat).toHaveTextContent('Goat Cheese Tartlets');
  // });
});
