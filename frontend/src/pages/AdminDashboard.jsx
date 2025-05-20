import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import CafeForm from '../components/CafeForm';

const AdminDashboard = () => {
  const { cafes, addCafe, editCafe, deleteCafe } = useContext(AppContext);
  const [editingCafe, setEditingCafe] = useState(null);
  const [showForm, setShowForm] = useState(false);

   const handleAdd = () => {
    setEditingCafe(null);
    setShowForm(true);
  };

  const handleEdit = (cafe) => {
    setEditingCafe(cafe);
    setShowForm(true);
  };

  const handleDelete = (id) => {
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
      <h2 className="section-title">Dashboard Admin</h2>
      {!showForm ? (
        <>
          <button className="btn btn-brown mb-3" onClick={handleAdd}>+ Tambah Café</button>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
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
                      <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(cafe)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cafe.id)}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
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