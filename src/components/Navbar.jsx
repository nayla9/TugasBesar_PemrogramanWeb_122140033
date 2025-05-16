import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">CaféFinder.ID</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Dashboard Admin</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item nav-link disabled">Hello, {user.username}</li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

