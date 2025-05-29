import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import DetailCafe from '../pages/DetailCafe';
import Auth from '../pages/Auth';
import AdminDashboard from '../pages/AdminDashboard';
import { AppContext } from '../context/AppContext';

const PrivateRoute = ({ children, role }) => {
  const { user, loadingUser } = useContext(AppContext);

  console.log("PrivateRoute user:", user, "required role:", role);

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

const NotFound = () => <h2>404: Page Not Found</h2>;

const AppRoutes = () => (
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
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
