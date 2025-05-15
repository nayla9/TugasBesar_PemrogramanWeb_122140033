import React from 'react';
import { useParams } from 'react-router-dom';
import { mockCafes } from '../services/mockCafes';

const DetailCafe = () => {
  const { id } = useParams();
  const cafe = mockCafes.find((c) => c.id === parseInt(id));

  if (!cafe) return <p>Kafe tidak ditemukan!</p>;

  return (
    <div className="card shadow-sm">
      <img src={cafe.image} className="card-img-top" alt={cafe.name} />
      <div className="card-body">
        <h2>{cafe.name}</h2>
        <p><strong>Lokasi:</strong> {cafe.location}</p>
        <p><strong>Jam Buka:</strong> {cafe.open_hours}</p>
        <p><strong>Rating:</strong> ⭐ {cafe.rating}</p>
        <p>{cafe.description}</p>
      </div>
    </div>
  );
};

export default DetailCafe;
