import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logo} to="/">CaféFinder.ID</Link>
      <div className={styles['nav-links']}>
        {user?.role === 'admin' && <Link to="/admin">Dashboard Admin</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hi, {user.username}</span>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;