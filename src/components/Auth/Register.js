import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import '../../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    // Clear previous messages
    setMessage('');
    setError('');
    
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      setError(error.message); 
    } else {
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} className="register-link">
          Login!
        </span>
      </p>
    </div>
  );
};

export default Register;
