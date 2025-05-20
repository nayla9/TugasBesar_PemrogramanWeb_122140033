import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';
import './theme.css';


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container my-4 min-vh-75">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
