import React, { useState, useContext} from 'react';
import { useLoginRegister } from '../hooks/useLoginRegister.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import styles from '../styles/Auth.module.css';
import Home from '../pages/Home';           
import AdminDashboard from '../pages/AdminDashboard'


const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(AppContext);  // ambil fungsi dari context
  // Form state, role default "user"
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
        // Panggil register dari context
        const res = await register(form);
        if (res === true) {
          setSuccess('Registrasi berhasil! Silakan login.');
          setForm({ username: '', email: '', password: '', role: 'user' });
          setTimeout(() => setIsRegister(false), 1500);
        } else {
          setError(res || 'Registrasi gagal');
        }
      } else {
        // Login
        const loginData = { identity: form.email, password: form.password };
        const res = await login(loginData);
        if (res === true) {
          // Ambil user dari localStorage (atau kamu juga bisa simpan user di context)
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
              className="form-control mb-2"
              name="username"
              placeholder="Nama"
              value={form.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <select
              className="form-control mb-3"
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
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? (isRegister ? 'Mendaftarkan...' : 'Masuk...') : (isRegister ? 'Daftar' : 'Login')}
        </button>
      </form>
      <p className="mt-2 text-center">
        {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
        <button
          className="btn btn-link p-0"
          type="button"
          onClick={toggleMode}
          disabled={loading}
        >
          {isRegister ? 'Login di sini' : 'Daftar di sini'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
