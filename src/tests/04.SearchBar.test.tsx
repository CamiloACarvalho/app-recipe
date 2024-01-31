import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';
import fetchMock from './Mocks/Mocks';

const showSearch = 'search-top-btn';
const searchInput = 'search-input';
const searchBtn = 'exec-search-btn';
const ingredientSearchRadio = 'ingredient-search-radio';
const nameSearchRadio = 'name-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';

describe('Testa o componente Header', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);
  });
  test('01 - Verifica se o filtro de ingredientes está funcionando na tela de comidas', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const inputSearchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const ingredientRadio = screen.getByTestId(ingredientSearchRadio);
    const btnSearch = screen.getByTestId(searchBtn);

    await user.type(inputSearchBar, 'rice');
    await user.click(nameRadio);
    await user.click(ingredientRadio);
    await user.click(btnSearch);

    const findText = await screen.findByText('Chicken Congee');
    expect(findText).toBeInTheDocument();
  });
  test('02 - Verifica se o filtro de nomes está funcionando na tela de comidas', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const inputSearchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const btnSearch = screen.getByTestId(searchBtn);

    await user.click(nameRadio);
    await user.type(inputSearchBar, 'chocolate');
    await user.click(btnSearch);

    const findText = await screen.findByText('Chocolate Souffle');
    expect(findText).toBeInTheDocument();
  });
  test('03 - Verifica se o filtro de primeira letra está funcionando na tela de comidas', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const btnSearch = screen.getByTestId(searchBtn);
    const inputSearchBar = screen.getByTestId(searchInput);
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);

    await user.type(inputSearchBar, 'h');
    await user.click(firstLetterRadio);
    await user.click(btnSearch);

    const findText = await screen.findByText('Home-made Mandazi');
    expect(findText).toBeInTheDocument();
  });
  test('04 - Verifica se o filtro de ingredientes está funcionando na tela de bebidas', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const inputSearchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const ingredientRadio = screen.getByTestId(ingredientSearchRadio);
    const btnSearch = screen.getByTestId(searchBtn);

    await user.type(inputSearchBar, 'strawberries');
    await user.click(nameRadio);
    await user.click(ingredientRadio);
    await user.click(btnSearch);

    const findText = await screen.findByText('Strawberry Lemonade');
    expect(findText).toBeInTheDocument();
  });
  test('05 - Verifica se o filtro de nomes está funcionando na tela de bebidas', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const inputSearchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const btnSearch = screen.getByTestId(searchBtn);

    await user.click(nameRadio);
    await user.type(inputSearchBar, 'bloody');
    await user.click(btnSearch);

    const findText = await screen.findByText('Bloody Punch');
    expect(findText).toBeInTheDocument();
  });
  test('06 - Verifica se o filtro de primeira letra está funcionando na tela de bebidas', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const btnSearch = screen.getByTestId(searchBtn);
    const inputSearchBar = screen.getByTestId(searchInput);
    const firstLetterRadio = screen.getByTestId(firstLetterSearchRadio);

    await user.type(inputSearchBar, 'k');
    await user.click(firstLetterRadio);
    await user.click(btnSearch);

    const findText = await screen.findByText('Kamikaze');
    expect(findText).toBeInTheDocument();
  });
  test('07 - Verifica se ao encontrar somente um resultado na tela de alimentos o usuário é redirecionado para a tela de detalhes', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const btnSearch = screen.getByTestId(searchBtn);
    const inputSearchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);

    await user.type(inputSearchBar, 'sushi');
    await user.click(nameRadio);
    await user.click(btnSearch);

    const findSeaFood = await screen.findByRole('heading', { name: /seafood/i });
    expect(findSeaFood).toBeInTheDocument();
  });
  test('08 - Verifica se ao encontrar somente um resultado na tela de bebidas o usuário é redirecionado para a tela de detalhes', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );

    const btnShowSearch = screen.getByTestId(showSearch);
    await user.click(btnShowSearch);
    const btnSearch = screen.getByTestId(searchBtn);
    const inputSearchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);

    await user.type(inputSearchBar, 'a1');
    await user.click(nameRadio);
    await user.click(btnSearch);

    const findA1 = await screen.findByRole('heading', { name: /a1/i });
    expect(findA1).toBeInTheDocument();
  });
});
