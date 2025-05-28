import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/CafeCard.module.css';

const CafeCard = ({ cafe }) => {
  return (
    <div className={styles.card}>
      <img src={cafe.image} alt={cafe.name} className={styles.image} />
      <div className="card-body">
        <h5 className={styles.title}>{cafe.name}</h5>
        <p className={styles.info}>
          Lokasi: {cafe.location}<br />
          Jam buka: {cafe.open_hours}<br />
          Rating: ⭐ {cafe.rating}
        </p>
        <Link to={`/detail/${cafe.id}`} className="btn btn-brown">Lihat Detail</Link>
      </div>
    </div>
  );
};

export default CafeCard;
