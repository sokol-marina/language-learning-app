import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Import Supabase client

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen for auth state changes
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    // Cleanup subscription
    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/register'); // Redirect to login page
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.brand}>Language Learning App</h1>
      <ul style={styles.navLinks}>
        {user ? (
          <>
            <li>
              <Link to="/">Translate</Link>
            </li>
            <li>
              <Link to="/memorized-cards">Memorized Cards</Link>
            </li>
            <li>
              <Link to="/flashcards">Flashcards</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </li>
            <li>
              <Link to="/profile">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-2769788-2298675.png?f=webp&w=512" // Placeholder profile icon
                  alt="Profile"
                  style={styles.profileIcon}
                />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <button style={styles.button}>Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

// Inline styles (optional, can be replaced with CSS)
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    color: '#fff',
  },
  brand: {
    fontSize: '1.5rem',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  button: {
    backgroundColor: '#fff',
    color: '#007bff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  profileIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
};

export default NavBar;
