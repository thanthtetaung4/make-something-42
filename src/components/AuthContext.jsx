import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';


const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') || false);
  const [authToken, setAuthToken] = useState(Cookies.get('authToken') || "");
  

  // Simulate initial login check (replace with actual logic)
  useEffect(() => {
    const storedUser = Cookies.get('isLoggedIn');
    const storedToken = Cookies.get('authToken');
    setIsLoggedIn(storedUser);
    setAuthToken(storedToken);
  }, []);

  const login = (authToken) => {
    setIsLoggedIn(true);
    setAuthToken(authToken);
    Cookies.set('isLoggedIn', true); // Set cookie with appropriate options
    Cookies.set('authToken', authToken);
    console.log('====================================');
    console.log(authToken,isLoggedIn);
    console.log('====================================');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthToken("");
    Cookies.remove('isLoggedIn');
    Cookies.remove('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,  authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
