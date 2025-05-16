import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', role: 'user' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.username.trim()) {
      setError('Username harus diisi');
      return;
    }
    const res = login(form);
    if (!res.success) {
      setError(res.message);
      return;
    }
    navigate('/');
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text" className="form-control"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-select"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-brown">Login</button>
      </form>
      <p className="mt-3">
        Belum punya akun? <Link to="/register">Register di sini</Link>
      </p>
    </div>
  );
};

export default Login;
