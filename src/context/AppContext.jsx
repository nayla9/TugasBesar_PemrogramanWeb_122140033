import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Ambil user login dari localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Data user terdaftar (register) juga disimpan localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  // Simpan user login ke localStorage
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // Simpan daftar users ke localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Fungsi register user/admin
  const register = ({ username, role }) => {
    // Cek username sudah dipakai?
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username sudah terdaftar' };
    }
    const newUser = { username, role };
    setUsers(prev => [...prev, newUser]);
    return { success: true, message: 'Registrasi berhasil' };
  };

  // Fungsi login user/admin
  const login = ({ username, role }) => {
    const found = users.find(u => u.username === username && u.role === role);
    if (!found) {
      return { success: false, message: 'User tidak ditemukan atau role salah' };
    }
    setUser(found);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{
      user, login, logout, register,
    }}>
      {children}
    </AppContext.Provider>
  );
};
