import { screen } from '@testing-library/react';
import App from '../App';
import SearchProvider from '../context/SearchContext/SearchProvider';
import { renderWithRouter } from '../utils/renderWithRouter';

const email = 'email-input';
const password = 'password-input';
const submitBtn = 'login-submit-btn';

describe('Testa a tela de login', () => {
  test('01 - Verifica se existem os campos de email, senha e o botão de entrar', () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );

    const getEmail = screen.getByTestId(email);
    const getPassword = screen.getByTestId(password);
    const getSubmitBtn = screen.getByTestId(submitBtn);

    expect(getEmail).toBeInTheDocument();
    expect(getPassword).toBeInTheDocument();
    expect(getSubmitBtn).toBeInTheDocument();
  });
  test('02 - O botão "Enter" é habilitado após inserir email e senha válidos', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );

    const getEmail = screen.getByTestId(email);
    const getPassword = screen.getByTestId(password);
    const getSubmitBtn = screen.getByTestId(submitBtn);

    await user.type(getEmail, 'email@test.com');
    await user.type(getPassword, '1234567');

    expect(getSubmitBtn).toBeEnabled();
  });
  test('03 - Após clicar no botão de submit o email é salvo no localstorage e o usuário é redirecionado para a tela de comidas', async () => {
    const { user } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );

    const getEmail = screen.getByTestId(email);
    const getPassword = screen.getByTestId(password);
    const getSubmitBtn = screen.getByTestId(submitBtn);
    const emailTest = 'email@test.com';

    await user.type(getEmail, emailTest);
    await user.type(getPassword, '1234567');
    await user.click(getSubmitBtn);

    const userLS = {
      email: emailTest,
    };

    expect(window.localStorage.getItem('user')).toEqual(JSON.stringify(userLS));
  });
});
