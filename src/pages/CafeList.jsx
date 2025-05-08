import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

// menampilkan daftar semua cafe
export default function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [search, setSearch] = useState(''); // state untuk menyimpan kata kunci pencarian

  // mengambil data cafe dari API saat komponen dimuat
  useEffect(() => {
    api.get('/cafes').then(res => setCafes(res.data));
  }, []);

  // filter berdasarkan nama cafe sesuai input pencarian
  const filteredCafes = cafes.filter(cafe =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cafe List</h2>
      <input
        type="text"
        placeholder="Search Cafe ..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCafes.map(cafe => (
          <div key={cafe.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{cafe.name}</h3>
            <p>{cafe.address}</p>
            <p>Rating: {cafe.rating}</p>
            <Link to={`/cafes/${cafe.id}`} className="text-blue-500">More...</Link>
          </div>
        ))}
      </div>
    </div>
  );
}