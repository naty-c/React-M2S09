import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: () => {},
s});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState(null);

  const signIn = async ({ username, password }) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
      const data = response.data;

      console.log('API response:', data);

      // Extracting and storing user data
      const { id, firstName, lastName, email, gender, image, token, refreshToken } = data;
      const userData = { id, firstName, lastName, email, gender, image, token, refreshToken }  

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setError(null); // Reset error state on successful login
    } catch (error) {
      // Check for network errors
      if (!axios.isAxiosError(error)) {
        setError('Network Error');
        return;
      }
      
      console.error('Authentication failed', error);
      setError('Invalid username or password'); // Set error message
    }
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/logout'
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
