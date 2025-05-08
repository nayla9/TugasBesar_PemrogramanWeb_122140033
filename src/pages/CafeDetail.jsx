import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export default function CafeDetail() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);

// data cafe berdasarkan id
  useEffect(() => {
    api.get(`/cafes/${id}`).then(res => setCafe(res.data));
  }, [id]);

  if (!cafe) return <p>Load...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{cafe.name}</h2>
      <p>{cafe.address}</p>
      <p>Jam Operasional: {cafe.hours}</p>
      <p>Rating: {cafe.rating}</p>
    </div>
  );
}