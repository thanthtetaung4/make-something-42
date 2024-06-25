import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const intra_link = "https://profile.intra.42.fr/searches/search?query=hthant"
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
      <button><a href={intra_link} target='blank'>See on Intra</a></button>
    </div>
  );
};

export default Home;
