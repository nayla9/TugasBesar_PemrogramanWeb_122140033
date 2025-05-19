import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(form);
    if (!res.success) {
      setError(res.message);
    } else {
      navigate('/');
    }
  };

  const handleGoogleLogin = () => {
    alert('Simulasi login Google. Untuk fitur asli, hubungkan dengan Google OAuth di backend nanti.');
    login({ email: 'googleuser@gmail.com', password: '', username: 'Google User' });
    navigate('/');
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-brown w-100">Login</button>
        <button type="button" className="btn btn-outline-dark w-100 mt-2" onClick={handleGoogleLogin}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="G" width="20" className="me-2" />
          Login dengan Google
        </button>
      </form>
      <p className="mt-3 text-center">
        Belum punya akun? <Link to="/register">Daftar sekarang</Link>
      </p>
    </div>
  );
};

export default Login;
