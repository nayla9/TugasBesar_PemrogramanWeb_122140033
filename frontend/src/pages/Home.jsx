import React, { useContext, useState, useEffect} from 'react';
import { AppContext } from '../context/AppContext';
import CafeCard from '../components/CafeCard';
import { getCafes } from '../services/api';

const Home = () => {
  const { cafes } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [fetchedCafes, setFetchedCafes] = useState([]);

useEffect(() => {
  getCafes()
    .then(res => setCafes(res.data))
    .catch(err => console.error('Gagal mengambil data kafe:', err));
}, []);

  const sourceCafes = fetchedCafes.length > 0 ? fetchedCafes : cafes;

  const filteredCafes = cafes.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="section-title mb-2">Explore Local Cafés with Comfort</h1>
      <p className="slogan mb-4">“Nge-spot Kafe Gak Pernah Seasy Ini”</p>

      <input
        className="form-control mb-4"
        placeholder="Cari kafe berdasarkan nama atau lokasi..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredCafes.length === 0 && <p>Tidak ada kafe yang sesuai.</p>}

      <div className="row">
        {filteredCafes.map(cafe => (
          <div className="col-md-6 col-lg-4 mb-4" key={cafe.id}>
            <CafeCard cafe={cafe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
