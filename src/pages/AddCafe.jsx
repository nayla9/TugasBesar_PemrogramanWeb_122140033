import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

// Form untuk menambahkan cafe baru (admin)
export default function AddCafe() {
  const [form, setForm] = useState({ name: '', address: '', rating: '', hours: '' });
  const navigate = useNavigate();

  // Mengirim data cafe baru ke backend
  const handleSubmit = e => {
    e.preventDefault();
    api.post('/cafes', form).then(() => navigate('/cafes'));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Add Cafe</h2>
      <input
        type="text"
        placeholder="Nama Cafe"
        className="border p-2 w-full mb-2"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Alamat"
        className="border p-2 w-full mb-2"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Jam Operasional"
        className="border p-2 w-full mb-2"
        value={form.hours}
        onChange={e => setForm({ ...form, hours: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Rating"
        className="border p-2 w-full mb-2"
        value={form.rating}
        onChange={e => setForm({ ...form, rating: e.target.value })}
        step="0.1"
        max="5"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2">Add</button>
    </form>
  );
}
