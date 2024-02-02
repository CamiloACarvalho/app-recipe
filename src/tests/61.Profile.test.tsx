import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../components/Profile';

describe('Testes do Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify([{ email: '' }]));
  });
  test('Testanto o botão de receitas prontas(Done Recipes)', async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const doneBtn = screen.getByTestId('profile-done-btn');

    await userEvent.click(doneBtn);
  });
  test('Testando o botão de receitas favoritas(Favorites Recipes)', async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const favoritBtn = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(favoritBtn);
  });
  test('Testando o botão de logout.', async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await userEvent.click(logoutBtn);
  });
});
