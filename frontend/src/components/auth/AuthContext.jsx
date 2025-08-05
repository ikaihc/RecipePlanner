import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // sets true if token exists
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
