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

  // 📦 DATA HOOKS
  const { cafes, createCafe, updateCafe, deleteCafe } = useCafe();
  const { reviews, addReview } = useReview();

  // Set axios header Authorization tiap kali token berubah
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // 🧠 AUTENTIKASI HANDLERS
  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', credentials);
      if (res.data.status === 'success') {
        const { user, token } = res.data;
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        return true;  // sukses
      } else {
        // kembalikan pesan error agar bisa ditampilkan di UI
        return res.data.message || 'Login gagal';
      }
    } catch (err) {
      console.error('Login error:', err);
      return 'Login error: ' + (err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (newUser) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/register', newUser);
      if (res.data.status === 'success') {
        // langsung login setelah register berhasil
        return await login({ email: newUser.email, password: newUser.password });
      } else {
        return res.data.message || 'Register gagal';
      }
    } catch (err) {
      console.error('Register error:', err);
      return 'Register error: ' + (err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // 🧠 LOAD USER DARI LOCAL STORAGE SAAT PERTAMA KALI
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
    }
  }, []);

  // ☕ CRUD CAFE
  const addCafe = (cafe) => createCafe(cafe);
  const editCafe = (id, updatedCafe) => updateCafe(id, updatedCafe);
  const deleteCafeFunc = (id) => deleteCafe(id);

  return (
    <AppContext.Provider
      value={{
        // Cafe dan review
        cafes,
        addCafe,
        editCafe,
        deleteCafe: deleteCafeFunc,
        reviews,
        addReview,

        // Auth
        user,
        setUser,
        token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};