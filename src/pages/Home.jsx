import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import CafeCard from '../components/CafeCard';

const Home = () => {
  const { cafes } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filteredCafes = cafes.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Daftar Kafe di Bandar Lampung</h1>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Cari kafe berdasarkan nama atau lokasi..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filteredCafes.length === 0 && <p>Tidak ada kafe yang sesuai.</p>}

      <div className="row">
        {filteredCafes.map(cafe => (
          <div className="col-md-6" key={cafe.id}>
            <CafeCard cafe={cafe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
