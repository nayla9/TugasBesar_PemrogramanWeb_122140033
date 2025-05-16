import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.username.trim()) {
      setError('Username harus diisi');
      return;
    }
    const res = register(form);
    if (!res.success) {
      setError(res.message);
      return;
    }
    setSuccess('Registrasi berhasil! Silakan login.');
    setForm({ username: '', role: 'user' });
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '400px' }}>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
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
        <button type="submit" className="btn btn-brown">Register</button>
      </form>
      <p className="mt-3">
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
};

export default Register;
