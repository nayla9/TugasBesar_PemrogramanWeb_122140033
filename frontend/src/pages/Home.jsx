import React, { useState, useMemo } from "react";
import { useCafe } from "../hooks/useCafe";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { cafes, loading, error } = useCafe();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) =>
      cafe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cafes, searchTerm]);

  if (loading)
    return (
      <div className={styles.loadingErrorContainer}>
        <p>Memuat data kafe...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.loadingErrorContainer}>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daftar Kafe</h1>

      <input
        type="text"
        placeholder="Cari kafe berdasarkan nama..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBar}
      />

      {filteredCafes.length === 0 ? (
        <p className={styles.noResult}>Belum ada kafe yang cocok dengan pencarian.</p>
      ) : (
        <ul className={styles.cafeList}>
          {filteredCafes.map((cafe) => (
            <li key={cafe.id} className={styles.cafeCard}>
              <h2 className={styles.cafeTitle}>{cafe.name}</h2>
              <p className={styles.cafeDescription}>{cafe.description}</p>
              <Link to={`/detail/${cafe.id}`} className={styles.detailLink}>
                Lihat Detail &rarr;
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
