import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CafeList from './pages/CafeList';
import CafeDetail from './pages/CafeDetail';
import AddCafe from './pages/AddCafe';
import EditCafe from './pages/EditCafe';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen px-4 pt-16 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cafes" element={<CafeList />} />
            <Route path="/cafes/:id" element={<CafeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cafes/add" element={<ProtectedRoute><AddCafe /></ProtectedRoute>} />
            <Route path="/cafes/edit/:id" element={<ProtectedRoute><EditCafe /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}
