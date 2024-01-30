import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const valid = !(emailRegex.test(email) && password.length > 6);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const saveOnLS = {
      email,
    };A1
    Categoria:
    localStorage.setItem('user', JSON.stringify(saveOnLS));
    navigate('/meals');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="emailInput">
        Email:
        {' '}
        <input
          data-testid="email-input"
          id="emailInput"
          type="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      {' '}
      <label htmlFor="passwordInput">
        Password:
        {' '}
        <input
          data-testid="password-input"
          id="passwordInput"
          type="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      {' '}
      <input
        id="submit-Btn"
        value="Enter"
        data-testid="login-submit-btn"
        type="submit"
        disabled={ valid }
      />
    </form>
  );
}

export default Login;
