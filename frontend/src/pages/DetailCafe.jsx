import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ReviewForm from '../components/ReviewForm';

const DetailCafe = () => {
  const { id } = useParams();
  const { cafes, addReview, user } = useContext(AppContext);

  const cafe = cafes.find(c => c.id === parseInt(id));
  if (!cafe) return <p>Café tidak ditemukan</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert('Harap login untuk memberi ulasan');
    addReview(cafe.id, { ...review, username: user.username });
    setReview({ comment: '', rating: 5 });
  };

  return (
    <div className="card p-4">
      <div className="row">
        <div className="col-md-6">
          <img src={cafe.image} alt={cafe.name} className="img-fluid rounded mb-3" />
        </div>
        <div className="col-md-6">
          <h2 className="section-title">{cafe.name}</h2>
          <p><strong>Lokasi:</strong> {cafe.location}</p>
          <p><strong>Jam Buka:</strong> {cafe.open_hours}</p>
          <p><strong>Deskripsi:</strong> {cafe.description}</p>
          <p><strong>Rating:</strong> ⭐ {cafe.rating}</p>
        </div>
      </div>

      <hr />

      <h4 className="mt-4">Ulasan</h4>
      {cafe.reviews.map(r => (
        <div key={r.id} className="mb-2">
          <strong>{r.username}</strong>: {r.comment} ({r.rating} ⭐)
        </div>
      ))}

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
          />
        </div>
        <button type="submit" className="btn btn-brown">Kirim Ulasan</button>
      </form>
    </div>
  );
};

export default DetailCafe;
