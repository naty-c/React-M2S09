import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
});

const navigate = useNavigate();

async function signIn({ username, password }) {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
    const data = response.data;

    console.log('API response:', data);

    // Extracting and storaging user data
    const { id, firstName, lastName, email, gender, image, token, refreshToken } = data;
    const userData = { id, firstName, lastName, email, gender, image, token, refreshToken }

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  } catch (error) {
    console.error('Authentication failed', error);
  }
};

function signOut() {
  localStorage.removeItem('user');
  setUser(null);
  navigate('/logout');
};

return (
  <AuthContext.Provider value={{ user, signIn, signOut }}>
    {children}
  </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}