import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Translation from './components/Translation/Translate';
import NavBar from './components/NavBar';
import Profile from './components/Profile/Profile';
import Flashcards from './components/Translation/Flashcards';
import MemorizedCards from './components/Translation/MemorizedCards';
import UpdateProfile from './components/Profile/UpdateProfile';
import './styles/App.css';
import { supabase } from './supabase';

const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user
  useEffect(() => {
    // Check for existing session on app load
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user); // Set the logged-in user
      }
    };

    fetchUser();

    // Listen for authentication state changes
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null); // Update the user state
      }
    );

    // Cleanup the subscription
    return () => subscription?.unsubscribe();
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser); // Update user state
  };

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
    <div className="app-container">
      <Router>
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Translation />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/memorized-cards" element={<MemorizedCards />} />
          <Route path="/update-profile" element={<UpdateProfile />} /> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;
