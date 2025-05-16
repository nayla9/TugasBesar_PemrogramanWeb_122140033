import React, { useState, useEffect } from 'react';

const CafeForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    open_hours: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nama Café</label>
        <input
          type="text" name="name" className="form-control" required
          value={form.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Lokasi</label>
        <input
          type="text" name="location" className="form-control" required
          value={form.location} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Jam Buka</label>
        <input
          type="text" name="open_hours" className="form-control" required
          value={form.open_hours} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Deskripsi</label>
        <textarea
          name="description" className="form-control" rows="3" required
          value={form.description} onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">URL Gambar</label>
        <input
          type="text" name="image" className="form-control" required
          value={form.image} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-success me-2">Simpan</button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">Batal</button>
    </form>
  );
};

export default CafeForm;
