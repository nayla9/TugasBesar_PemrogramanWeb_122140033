import React, { useState, useMemo } from "react";
import { useCafe } from "../hooks/useCafe";
import { Link } from "react-router-dom";

const Home = () => {
  const { cafes, loading, error } = useCafe();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) =>
      cafe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cafes, searchTerm]);

  if (loading) return <p>Memuat data kafe...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Daftar Kafe</h1>

      <input
        type="text"
        placeholder="Cari kafe..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {filteredCafes.length === 0 ? (
        <p>Belum ada kafe yang cocok dengan pencarian.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredCafes.map((cafe) => (
            <li
              key={cafe.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h2>{cafe.name}</h2>
              <p>{cafe.description}</p>
              <Link to={`/detail/${cafe.id}`}>Lihat Detail</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
