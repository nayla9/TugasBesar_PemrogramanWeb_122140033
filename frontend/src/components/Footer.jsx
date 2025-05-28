import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <p className="mb-0">&copy; 2025 CaféFinder.ID</p>
      <small><em>“Nge-spot Kafe Gak Pernah Seasy Ini”</em></small>
    </div>
  </footer>
);

export default Footer;