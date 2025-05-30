import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCafe } from '../hooks/useCafe';
import { useReview } from '../hooks/useReview';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 🔐 AUTH STATE
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // 📦 DATA HOOKS
  const { cafes, createCafe, updateCafe, deleteCafe } = useCafe(!loadingUser);
  const { reviews, addReview } = useReview();

  // 🌐 Set default Authorization header saat token berubah
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // 🔑 LOGIN
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', {
        identity: email, // 💡 sesuaikan dengan backend yang pakai 'identity'
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.status === 'success') {
        const { user, token } = res.data;
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        return true;
      } else {
        return res.data.message || 'Login gagal';
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      return err.response?.data?.message || 'Login gagal';
    } finally {
      setLoading(false);
    }
  };

  // 📝 REGISTER
  const register = async ({ email, username, password }) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/register', {
        email,
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.status === 'success') {
        return true; // biarkan user login sendiri setelah register
      } else {
        return res.data.message || 'Register gagal';
      }
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      return err.response?.data?.message || 'Register gagal';
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // 🔁 LOAD USER DARI LOCAL STORAGE
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (e) {
      console.warn('Gagal parsing user/token dari localStorage', e);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // ☕ CRUD CAFE
  const addCafe = (cafe) => createCafe(cafe);
  const editCafe = (id, updatedCafe) => updateCafe(id, updatedCafe);
  const deleteCafeFunc = (id) => deleteCafe(id);

  return (
    <AppContext.Provider
      value={{
        cafes,
        addCafe,
        editCafe,
        deleteCafe: deleteCafeFunc,
        reviews,
        addReview,
        user,
        setUser,
        token,
        login,
        register,
        logout,
        loading,
        loadingUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
