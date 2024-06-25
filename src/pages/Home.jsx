import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout, authToken } = useContext(AuthContext);
  const [auth, setAuth] = useState("No Auth");
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(authToken);
  },[authToken]);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This content is only accessible to logged-in users.</p>
      <button onClick={handleLogout}>Logout</button>
      <p>Auth Token:{auth}</p>

      
    </div>
  );
};

export default Home;
