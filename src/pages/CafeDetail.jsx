import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../contexts/AuthContext';

// Komponen detail cafe berdasarkan id dari url
export default function CafeDetail() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [saved, setSaved] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ user: '', comment: '' });
  const { user } = useContext(AuthContext); 

  // Mengambil data cafe dan ulasan saat komponen dimuat
  useEffect(() => {
    api.get(`/cafes/${id}`).then(res => setCafe(res.data)); // Ambil detail cafe
    api.get(`/cafes/${id}/reviews`).then(res => setReviews(res.data)); // Ambil ulasan
  }, [id]);

  // Fungsi Menyimpan cafe
  const handleSaveCafe = () => {
    api.post(`/cafes/${id}/save`, { userId: user?.id })
      .then(() => setSaved(true));
  };

  // Fungsi untuk kirim ulasan
  const handleReviewSubmit = e => {
    e.preventDefault();
    const data = {
      user: user?.username || reviewForm.user, // Jika login, pakai username
      comment: reviewForm.comment
    };
    api.post(`/cafes/${id}/reviews`, data).then(res => {
      setReviews([...reviews, res.data]); // Tambah ulasan ke daftar
      setReviewForm({ user: '', comment: '' }); // Reset form
    });
  };

   // Jika data cafe belum ada, tampilkan loading
  if (!cafe) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{cafe.name}</h2>
      <p>{cafe.address}</p>
      <p>Jam Operasional: {cafe.hours}</p>
      <p>Rating: {cafe.rating}</p>

      {/* Tombol simpan cafe */}
      <button
        onClick={handleSaveCafe}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        disabled={saved}
      >
        {saved ? 'Cafe Disimpan' : 'Simpan Cafe'}
      </button>

      {/* Form ulasan */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Tulis Ulasan</h3>
        <form onSubmit={handleReviewSubmit} className="mt-2 space-y-2">
          <input
            type="text"
            placeholder="Nama Anda"
            className="border p-2 w-full"
            value={reviewForm.user}
            onChange={e => setReviewForm({ ...reviewForm, user: e.target.value })}
            required
          />
          <textarea
            placeholder="Komentar"
            className="border p-2 w-full"
            value={reviewForm.comment}
            onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
            required
          />
          <button className="bg-blue-500 text-white px-4 py-2">Kirim</button>
        </form>
      </div>

      {/* Daftar ulasan */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Ulasan Pengunjung</h3>
        {reviews.length === 0 && <p>Belum ada ulasan.</p>}
        <ul className="space-y-2 mt-2">
          {reviews.map((r, idx) => (
            <li key={idx} className="border p-2 rounded">
              <strong>{r.user}</strong>
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
