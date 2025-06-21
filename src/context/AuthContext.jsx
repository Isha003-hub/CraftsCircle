import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('craftscircle_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser.cart) localStorage.setItem('cart', JSON.stringify(parsedUser.cart));
        if (parsedUser.wishlist) localStorage.setItem('wishlist', JSON.stringify(parsedUser.wishlist));
      } else {
        try {
          const res = await axios.get(`${API_BASE}/api/auth/me`, { withCredentials: true });
          setUser(res.data);
          localStorage.setItem('craftscircle_user', JSON.stringify(res.data));
          if (res.data.cart) localStorage.setItem('cart', JSON.stringify(res.data.cart));
          if (res.data.wishlist) localStorage.setItem('wishlist', JSON.stringify(res.data.wishlist));
        } catch (err) {
          console.warn('User auth check failed:', err.message);
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      localStorage.setItem('craftscircle_user', JSON.stringify(res.data.user));
      if (res.data.user.cart) localStorage.setItem('cart', JSON.stringify(res.data.user.cart));
      if (res.data.user.wishlist) localStorage.setItem('wishlist', JSON.stringify(res.data.user.wishlist));
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name, role = 'buyer') => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/register`,
        { name, email, password, role },
        { withCredentials: true }
      );
      setUser(res.data.user);
      localStorage.setItem('craftscircle_user', JSON.stringify(res.data.user));
      if (res.data.user.cart) localStorage.setItem('cart', JSON.stringify(res.data.user.cart));
      if (res.data.user.wishlist) localStorage.setItem('wishlist', JSON.stringify(res.data.user.wishlist));
      return true;
    } catch (err) {
      console.error('Registration error:', err.response?.data?.message || err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout failed:', err.message);
    } finally {
      setUser(null);
      localStorage.removeItem('craftscircle_user');
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
