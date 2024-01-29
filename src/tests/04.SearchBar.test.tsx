import { screen } from '@testing-library/react';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';

describe('Testa o componente Header', () => {
  test('01 - Verificando se os filtros estão na tela', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioIngredient).toBeInTheDocument();

    const radioName = screen.getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();

    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(radioFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();
  });

  test('02 - Verificando se o filtro de ingrediente está funcionando', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );

    const btnShowSearch = screen.getByTestId('search-top-btn');
    await user.click(btnShowSearch);

    const inputSearchBarAfterClick = screen.getByTestId('search-input');
    expect(inputSearchBarAfterClick).toBeInTheDocument();

    await user.type(inputSearchBarAfterClick, 'corba');

    const inputName = screen.getByTestId('name-search-radio');
    expect(inputName).toBeInTheDocument();

    await user.click(inputName);

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();

    await user.click(btnSearch);

    const findText = await screen.findByText('Corba');
    expect(findText).toBeInTheDocument();
  });
});
