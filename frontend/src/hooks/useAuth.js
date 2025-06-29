import { useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (name, email) => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await authApi.login(name, email);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, error, login, logout };
};