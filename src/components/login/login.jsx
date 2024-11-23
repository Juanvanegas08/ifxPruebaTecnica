import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setAuthToken } from '../../services/api';

import "../login/login.css";
import loginIfx from '../../assets/img/loginIfx.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      const token = response.data.token;
      setAuthToken(token);
      onLogin(token);
      alert('Login exitoso');
      navigate('/home'); // Redirige al usuario al home
    } catch (error) {
      alert('Error en el login');
    }
  };

  return (
    <>
      <div className="container">
        <div className="cardLogin">
          <div className="imgContainer">
            <img src={loginIfx} alt="Login Image" />
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Correo Electrónico"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Iniciar</button>
            <div className="forgotPassword">
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
