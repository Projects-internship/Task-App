import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axiosConfig';

import 'styles/LoginPage.css'; // Calea corectă pentru a importa fișierul CSS


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/login', {
        username,
        password,
      });

      if (response.data.success) {
        navigate('/main'); // Redirecționează utilizatorul către pagina principală
      } else {
        alert('Autentificare eșuată. Verifică datele introduse.');
      }
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      alert('A apărut o eroare la autentificare. Încearcă din nou mai târziu.');
    }
  };

  return (
    <div className='login-container'>
      <form
        onSubmit={handleLogin}
        className='login-form'
      >
        <h1>Login</h1>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
