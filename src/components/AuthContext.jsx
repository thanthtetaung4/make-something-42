import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') || false);

  // Simulate initial login check (replace with actual logic)
  useEffect(() => {
    const storedUser = Cookies.get('isLoggedIn');
    setIsLoggedIn(!!storedUser);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', true); // Set cookie with appropriate options
  };

  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
