import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EditCafe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', rating: '', hours: '' });

  useEffect(() => {
    api.get(`/cafes/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/cafes/${id}`, form).then(() => navigate(`/cafes/${id}`));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Edit Cafe</h2>
      <input
        type="text"
        placeholder="Nama Cafe"
        className="border p-2 w-full mb-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Alamat"
        className="border p-2 w-full mb-2"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Jam Operasional"
        className="border p-2 w-full mb-2"
        value={form.hours}
        onChange={(e) => setForm({ ...form, hours: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Rating"
        className="border p-2 w-full mb-2"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: e.target.value })}
        step="0.1"
        max="5"
        required
      />
      <button className="bg-yellow-500 text-white px-4 py-2">Simpan</button>
    </form>
  );
}