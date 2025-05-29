import React, { useContext} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/Navbar.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Footer from './components/Footer.jsx';
import { AppProvider,  AppContext} from './context/AppContext.jsx';
import Home from './pages/Home.jsx';

function AppContent() {
  const { loadingUser } = useContext(AppContext);

  if (loadingUser) return <div>Memuat aplikasi...</div>;

  return  <AppRoutes />;
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="content">
            <AppContent />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}


export default App;