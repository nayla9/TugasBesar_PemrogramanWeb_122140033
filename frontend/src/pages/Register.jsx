import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await registerUser(form);
      setSuccess(res.data.message || 'Registrasi berhasil.');
      setForm({ username: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal registrasi.');
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 400 }}>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nama</label>
          <input
            type="text"
            className="form-control"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-brown w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
