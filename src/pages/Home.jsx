import React from 'react';
import { mockCafes } from '../services/mockCafes';
import CafeCard from '../components/CafeCard';

const Home = () => {
  return (
    <div>
      <h1 className="mb-4">Daftar Kafe di Bandar Lampung</h1>
      <div className="row">
        {mockCafes.map((cafe) => (
          <div key={cafe.id} className="col-md-6">
            <CafeCard cafe={cafe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
