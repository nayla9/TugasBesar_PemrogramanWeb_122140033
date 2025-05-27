import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';


const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { username, email, password } = form;
    if (!username || !email || !password) {
      setError('Semua kolom wajib diisi');
      return;
    }
    try {
      const res = await registerUser(form);
      setSuccess(res.data.message || 'Registrasi berhasil.');
      setForm({ username: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal registrasi');
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 400 }}>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nama Lengkap</label>
          <input type="text" className="form-control"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-brown w-100">Daftar</button>
      </form>
      <p className="mt-3 text-center">
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
};

export default Register;