import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CafeList from './pages/CafeList';
import CafeDetail from './pages/CafeDetail';
import AddCafe from './pages/AddCafe';
import EditCafe from './pages/EditCafe';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafes/:id" element={<CafeDetail />} />
          <Route path="/cafes/:id/edit" element={<EditCafe />} />
          <Route path="/add" element={<AddCafe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
