import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Cookies.remove('isLoggedIn'); // Clear the cookie
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This content is only accessible to logged-in users.</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
