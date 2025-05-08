import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function CafeList() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    api.get('/cafes').then(res => setCafes(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cafe List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cafes.map(cafe => (
          <div key={cafe.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{cafe.name}</h3>
            <p>{cafe.address}</p>
            <p>Rating: {cafe.rating}</p>
            <Link to={`/cafes/${cafe.id}`} className="text-blue-500">Lihat Detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
}