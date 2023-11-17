import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    // todo
    e.preventDefault();
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <h2>Zaloguj się</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-4">Zaloguj</button>
      </form>
      <div>
        <NavLink to="/register">Rejestracja</NavLink>
      </div>
      <div>
        <NavLink to="/forgot-password">Reset hasła</NavLink>
      </div>
    </div>
  );
};

export default Login;