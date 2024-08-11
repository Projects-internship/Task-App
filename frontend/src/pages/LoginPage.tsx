import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/LoginPage.css'; // Importă fișierul CSS

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // URL-ul backend-ului
});

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne comportamentul implicit al formularului
    console.log('Attempting to log in with:', username, password); // Debugging

    try {
      // Trimite cererea de autentificare către server
      const response = await axiosInstance.get('/login', {
        params: {
          username,
          password,
        },
      });

      console.log('Response from server:', response.data); // Debugging

      // Verifică răspunsul de la server
      if (response.data.message === 'Login successful') {
        navigate('/main'); // Redirecționează utilizatorul către pagina principală
      } else {
        alert(response.data.error); // Afișează mesajul de eroare de la server
      }
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      alert('A apărut o eroare la autentificare. Încearcă din nou mai târziu.'); // Afișează mesaj de eroare
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin} className='login-form'>
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
        <button type='submit'>Login</button> {/* Butonul de login */}
      </form>
    </div>
  );
};

export default LoginPage;
