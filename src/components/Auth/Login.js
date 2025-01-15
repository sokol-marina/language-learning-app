import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import '../../styles/Login.css';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    setLoading(true);
    setErrorMessage('');

    const { error, data } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      onLogin(data.user); // Call onLogin with user data
      navigate('/profile');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <span onClick={() => navigate('/register')} className="register-link">
          Sign Up!
        </span>
      </p>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
