import React, { createContext, useState, useEffect } from 'react';
import { mockCafes } from '../services/mock';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const ADMIN_SECRET = 'admin123';

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  const [cafes, setCafes] = useState(() => {
    const saved = localStorage.getItem('cafes');
    return saved ? JSON.parse(saved) : mockCafes;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('cafes', JSON.stringify(cafes));
  }, [cafes]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const register = ({ username, email, password }) => {
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email sudah terdaftar' };
    }
    const newUser = { username, email, password, role: 'user' };
    setUsers(prev => [...prev, newUser]);
    return { success: true, message: 'Registrasi berhasil' };
  };

  const login = ({ email, password, username = 'Admin' }) => {
    if (password === ADMIN_SECRET) {
      setUser({ username, email, role: 'admin' });
      return { success: true };
    }

    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: 'Email atau password salah' };
    }
    setUser(found);
    return { success: true };
  };

  const logout = () => setUser(null);

  const addCafe = (cafe) => {
    setCafes(prev => [...prev, { ...cafe, id: Date.now(), reviews: [] }]);
  };

  const editCafe = (id, updatedCafe) => {
    setCafes(prev => prev.map(c => c.id === id ? { ...c, ...updatedCafe } : c));
  };

  const deleteCafe = (id) => {
    setCafes(prev => prev.filter(c => c.id !== id));
  };

  const addReview = (cafeId, review) => {
    setCafes(prev =>
      prev.map(cafe => {
        if (cafe.id === cafeId) {
          const newReviews = [...cafe.reviews, { ...review, id: Date.now() }];
          const newRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
          return {
            ...cafe,
            reviews: newReviews,
            rating: parseFloat(newRating.toFixed(2)),
          };
        }
        return cafe;
      })
    );
  };

  return (
    <AppContext.Provider value={{
      user, login, logout, register,
      cafes, addCafe, editCafe, deleteCafe, addReview
    }}>
      {children}
    </AppContext.Provider>
  );
};
