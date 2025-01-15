import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import '../../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) alert(error.message);
    else alert('Registration successful!');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
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
