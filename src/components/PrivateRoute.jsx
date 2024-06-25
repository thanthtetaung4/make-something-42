import React, { Children, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import the AuthContext

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext); // Access the isLoggedIn state

  console.log('====================================');
  console.log('isLoggedIn:', isLoggedIn); // Log the actual login state for debugging
  console.log('====================================');

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
