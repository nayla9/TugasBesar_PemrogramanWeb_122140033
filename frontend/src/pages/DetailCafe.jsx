import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { useCafe } from '../hooks/useCafe.js';
import { useReview } from '../hooks/useReview.js';
import styles from '../styles/DetailCafe.module.css';

const DetailCafe = () => {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const { cafes, fetchCafes } = useCafe();
  const { createReview } = useReview();
  const [cafe, setCafe] = useState(null);
  const [review, setReview] = useState({ comment: '', rating: 5 });
  const [error, setError] = useState('');

  useEffect(() => {
    if (cafes.length > 0) {
      const found = cafes.find(c => c.id === parseInt(id));
      setCafe(found);
    }
  }, [cafes, id]);

  useEffect(() => {
    fetchCafes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Harap login untuk memberi ulasan');
      return;
    }

    try {
      setError('');
      const newReview = { ...review, username: user.username, cafe_id: cafe.id };
      await createReview(newReview);
      setCafe({ 
        ...cafe, 
        reviews: [...(cafe.reviews || []), newReview] 
      });
      setReview({ comment: '', rating: 5 });
    } catch (err) {
      setError('Gagal mengirim ulasan');
      console.error(err);
    }
  };

  if (!cafe) return <p>Memuat data kafe...</p>;

  return (
    <div className={styles['detail-container']}>
      <div className="row">
        <div className="col-md-6">
          <img src={cafe.image} alt={cafe.name} className={styles['detail-image']} />
        </div>
        <div className="col-md-6">
          <h2 className={styles['detail-title']}>{cafe.name}</h2>
          <p><strong>Lokasi:</strong> {cafe.location}</p>
          <p><strong>Jam Buka:</strong> {cafe.open_hours}</p>
          <p><strong>Deskripsi:</strong> {cafe.description}</p>
          <p><strong>Rating:</strong> ⭐ {cafe.rating}</p>
        </div>
      </div>

      <hr />

      <h4 className="mt-4">Ulasan</h4>
      {cafe.reviews?.length === 0 && <p>Belum ada ulasan.</p>}
      {cafe.reviews?.map((r, i) => (
        <div key={i} className="mb-2">
          <strong>{r.username}</strong>: {r.comment} ({r.rating} ⭐)
        </div>
      ))}

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-2">
          <label>Rating</label>
          <select
            className="form-select"
            value={review.rating}
            onChange={e => setReview({ ...review, rating: parseInt(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <label>Komentar</label>
          <textarea
            className="form-control"
            rows="3"
            value={review.comment}
            onChange={e => setReview({ ...review, comment: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-brown">Kirim Ulasan</button>
      </form>
    </div>
  );
};

export default DetailCafe;