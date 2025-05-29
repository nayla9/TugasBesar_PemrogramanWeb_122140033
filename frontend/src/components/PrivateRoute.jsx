import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ requiredRole, children }) => {
  const { user, loadingUser } = useContext(AppContext);

  console.log("PrivateRoute user:", user, "required role:", requiredRole);

  if (loadingUser) {
    return <div>Loading...</div>; // atau spinner
  }

  if (!user) {
    // Jika belum login, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Jika role user tidak sesuai, redirect ke halaman lain (misal homepage)
    return <Navigate to="/" replace />;
  }

  // Jika lolos validasi, render komponen anaknya
  return children;
};

export default PrivateRoute;
