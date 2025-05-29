import React, { useState, useEffect } from 'react';
import { useCafe } from '../hooks/useCafe.js';
import CafeForm from '../components/CafeForm.jsx';
import styles from '../styles/AdminDashboard.module.css';
import { AppContext } from '../context/AppContext';
import { useLoginRegister } from '../hooks/useLoginRegister.js';

const AdminDashboard = () => {
  const { user } = useLoginRegister();
  const { cafes = [], fetchCafes, createCafe, updateCafe, deleteCafe } = useCafe();
  const [editingCafe, setEditingCafe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      setLoading(true);
      fetchCafes()
        .catch(() => setError('Gagal memuat data cafe'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAdd = () => {
    setEditingCafe(null);
    setShowForm(true);
    setError('');
  };

  const handleEdit = (cafe) => {
    setEditingCafe(cafe);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus café ini?')) {
      setError('');
      try {
        await deleteCafe(id);
        setLoading(true);
        await fetchCafes();
      } catch {
        setError('Gagal menghapus cafe');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = async (data) => {
    setError('');
    try {
      if (editingCafe) {
        await updateCafe(editingCafe.id, data);
      } else {
        await createCafe(data);
      }
      setShowForm(false);
      setLoading(true);
      await fetchCafes();
    } catch {
      setError('Gagal menyimpan data cafe');
    } finally {
      setLoading(false);
    }
  };

  // Guarding loading & akses
  if (loading) return <div>Memuat...</div>;
  if (!user) return <div>Silakan login terlebih dahulu</div>;
  if (user.role !== 'admin') return <div>Anda bukan admin, akses ditolak</div>;

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Dashboard Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!showForm ? (
        <>
          <button className={styles.addButton} onClick={handleAdd}>+ Tambah Café</button>
          <div className={styles.tableResponsive}>
            <table className={styles.cafeTable}>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Lokasi</th>
                  <th>Jam Buka</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cafes.length > 0 ? (
                  cafes.map(cafe => (
                    <tr key={cafe.id}>
                      <td>{cafe.name}</td>
                      <td>{cafe.location}</td>
                      <td>{cafe.open_hours}</td>
                      <td>
                        <button className={styles.editButton} onClick={() => handleEdit(cafe)}>Edit</button>
                        <button className={styles.deleteButton} onClick={() => handleDelete(cafe.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>Tidak ada data cafe</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <CafeForm
          initialData={editingCafe || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
