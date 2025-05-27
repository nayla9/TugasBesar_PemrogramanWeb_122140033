import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { loginUser } from '../services/api';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(form);     // Panggil backend
      login(res.data);                       // Simpan ke context
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal login');
    }
  };

  const handleGoogleLogin = () => {
    alert('Ini simulasi login Google. Untuk fitur asli, hubungkan dengan Google OAuth di backend nanti ya.');
    login({ email: 'googleuser@gmail.com', username: 'Google User', role: 'user' });
    navigate('/');
  };

  return (
    <div className="mx-auto p-4" style={{ maxWidth: 420, backgroundColor: 'var(--cream)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="nama@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-brown w-100">Login</button>

        <button type="button" className="btn btn-google w-100 mt-3" onClick={handleGoogleLogin}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="G" width="20" className="me-2" />
          Login dengan Google
        </button>
      </form>

      <p className="mt-4 text-center">
        Belum punya akun? <Link to="/register">Daftar sekarang</Link>
      </p>
    </div>
  );
};

export default Login;