import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import CafeForm from '../components/CafeForm';

const AdminDashboard = () => {
  const { cafes, addCafe, editCafe, deleteCafe } = useContext(AppContext);
  const [editingCafe, setEditingCafe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setEditingCafe(null);
    setShowForm(true);
  };

  const handleEditClick = (cafe) => {
    setEditingCafe(cafe);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Yakin ingin menghapus café ini?')) {
      deleteCafe(id);
    }
  };

  const handleFormSubmit = (data) => {
    if (editingCafe) {
      editCafe(editingCafe.id, data);
    } else {
      addCafe(data);
    }
    setShowForm(false);
  };

  return (
    <div>
      <h2>Dashboard Admin</h2>
      {!showForm && (
        <>
          <button className="btn btn-success mb-3" onClick={handleAddClick}>Tambah Café Baru</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Lokasi</th>
                <th>Jam Buka</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cafes.map(cafe => (
                <tr key={cafe.id}>
                  <td>{cafe.name}</td>
                  <td>{cafe.location}</td>
                  <td>{cafe.open_hours}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(cafe)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(cafe.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {showForm && (
        <CafeForm
          initialData={editingCafe}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;