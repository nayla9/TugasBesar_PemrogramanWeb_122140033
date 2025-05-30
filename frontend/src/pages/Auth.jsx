import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import styles from '../styles/Auth.module.css';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(AppContext);

  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      if (isRegister) {
        const res = await register(form);
        if (res === true) {
          setSuccess('Registrasi berhasil! Silakan login.');
          setForm({ username: '', email: '', password: '', role: 'user' });
          setTimeout(() => setIsRegister(false), 1500);
        } else {
          setError(res || 'Registrasi gagal');
        }
      } else {
        const loginData = { email: form.email, password: form.password };
        console.log('Login payload:', loginData); // DEBUG
        const res = await login(loginData);
        if (res === true) {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          setError(res || 'Login gagal');
        }
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    clearMessages();
    setIsRegister(!isRegister);
    setForm({ username: '', email: '', password: '', role: 'user' });
  };

  return (
    <div className={styles['register-container']}>
      <h2 className={styles.title}>{isRegister ? 'Daftar' : 'Login'}</h2>

      {error && <div className={`${styles.alert} ${styles['alert-danger']}`}>{error}</div>}
      {success && <div className={`${styles.alert} ${styles['alert-success']}`}>{success}</div>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input
              className={styles['auth-input']}
              name="username"
              placeholder="Nama"
              value={form.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <select
              className={styles['auth-input']}
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="user">User Biasa</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}

        <input
          className={styles['auth-input']}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          className={styles['auth-input']}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button
          className={styles['login-button']}
          type="submit"
          disabled={loading}
        >
          {loading ? (isRegister ? 'Mendaftarkan...' : 'Masuk...') : (isRegister ? 'Daftar' : 'Login')}
        </button>
      </form>

      <p className={styles['switch-mode']}>
        {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
        <button
          type="button"
          onClick={toggleMode}
          disabled={loading}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            padding: 0,
            margin: 0,
            cursor: 'pointer'
          }}
        >
          {isRegister ? 'Login di sini' : 'Daftar di sini'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
