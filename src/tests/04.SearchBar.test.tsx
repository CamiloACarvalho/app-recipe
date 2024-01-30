import { screen } from '@testing-library/react';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';

const showSearch = 'search-top-btn';
const searchInput = 'search-input';
const searchBtn = 'exec-search-btn';
const ingredientSearchRadio = 'ingredient-search-radio';
const nameSearchRadio = 'name-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';

describe('Testa o componente Header', () => {
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

    await user.type(inputSearchBar, 'Red Pepper Flakes');
    await user.click(nameRadio);
    await user.click(ingredientRadio);
    await user.click(btnSearch);

    const findText = await screen.findByText('Chicken Alfredo Primavera');
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
    await user.type(inputSearchBar, 'Lasagne');
    await user.click(btnSearch);

    const findText = await screen.findByText('Lasagne');
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

    await user.type(inputSearchBar, 's');
    await user.click(firstLetterRadio);
    await user.click(btnSearch);

    const findText = await screen.findByText('Spaghetti Bolognese');
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

    await user.type(inputSearchBar, 'Grand Marnier');
    await user.click(nameRadio);
    await user.click(ingredientRadio);
    await user.click(btnSearch);

    const findText = await screen.findByText('Alice in Wonderland');
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
    await user.type(inputSearchBar, 'Lasagne');
    await user.click(btnSearch);

    const findText = await screen.findByText('B-53');
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
});
