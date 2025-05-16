import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ReviewForm from '../components/ReviewForm';

const DetailCafe = () => {
  const { id } = useParams();
  const { cafes, addReview, user } = useContext(AppContext);

  const cafe = cafes.find(c => c.id === parseInt(id));
  if (!cafe) return <p>Kafe tidak ditemukan</p>;

  const handleAddReview = (review) => {
    if (!user) return alert('Silakan login dulu untuk menambah ulasan');
    addReview(cafe.id, { ...review, username: user.username });
  };

  return (
    <div>
      <h2>{cafe.name}</h2>
      <img src={cafe.image} alt={cafe.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <p><strong>Lokasi:</strong> {cafe.location}</p>
      <p><strong>Jam Buka:</strong> {cafe.open_hours}</p>
      <p><strong>Rating:</strong> ⭐ {cafe.rating}</p>
      <p>{cafe.description}</p>

      <h4>Ulasan</h4>
      {cafe.reviews.length === 0 && <p>Belum ada ulasan.</p>}
      {cafe.reviews.map(r => (
        <div key={r.id} className="mb-2 border p-2 rounded">
          <strong>{r.username}</strong> - Rating: {r.rating}<br />
          {r.comment}
        </div>
      ))}

      <h5 className="mt-4">Tambah Ulasan</h5>
      <ReviewForm onSubmit={handleAddReview} />
    </div>
  );
};

export default DetailCafe;
