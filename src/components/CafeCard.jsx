import React from 'react';
import { Link } from 'react-router-dom';

const CafeCard = ({ cafe }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <img src={cafe.image} alt={cafe.name} className="card-img-top" style={{height:'200px', objectFit:'cover'}}/>
      <div className="card-body">
        <h5 className="card-title">{cafe.name}</h5>
        <p className="card-text">
          Lokasi: {cafe.location}<br />
          Jam buka: {cafe.open_hours}<br />
          Rating: ⭐ {cafe.rating}
        </p>
        <Link to={`/detail/${cafe.id}`} className="btn btn-primary">Lihat Detail</Link>
      </div>
    </div>
  );
};

export default CafeCard;
