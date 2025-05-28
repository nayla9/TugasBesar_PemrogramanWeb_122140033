import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import DetailCafe from '../pages/DetailCafe';
import Auth from '../pages/Auth';
import AdminDashboard from '../pages/AdminDashboard';
import { AppContext } from '../context/AppContext';

console.log('Home:', Home);
console.log('DetailCafe:', DetailCafe);
console.log('Auth:', Auth);
console.log('AdminDashboard:', AdminDashboard);
console.log('AppContext:', AppContext);

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AppContext);
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<DetailCafe />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/admin" element={
        <PrivateRoute role="admin">
          <AdminDashboard />
        </PrivateRoute>
      } />
      <Route path="*" element={<h2>404: Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;

