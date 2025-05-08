import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

// komponen detail cafe berdasarkan id dari url (link)
export default function CafeDetail() {
  const { id } = useParams(); // ambil id dari url
  const [cafe, setCafe] = useState(null);

  // ambil data detail cafe berdasarkan idnya
  useEffect(() => {
    api.get(`/cafes/${id}`).then(res => setCafe(res.data));
  }, [id]);

  if (!cafe) return <p>Memuat...</p>; // tampilkan teks saat data belum ada

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{cafe.name}</h2>
      <p>{cafe.address}</p>
      <p>Jam Operasional: {cafe.hours}</p>
      <p>Rating: {cafe.rating}</p>
      {/* tambahkan lebih banyak detail dan ulasan di sini nanti */}
    </div>
  );
}