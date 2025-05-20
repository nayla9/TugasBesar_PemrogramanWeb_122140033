import React, { useState, useEffect } from 'react';

const CafeForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    name: initialData.name || '',
    location: initialData.location || '',
    open_hours: initialData.open_hours || '',
    description: initialData.description ||'',
    image: initialData.image || '',
  });


  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">{initialData.id ? 'Edit Café' : 'Tambah Café Baru'}</h4>
      <form onSubmit={handleSubmit}>
        {['name', 'location', 'open_hours', 'description', 'image'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field.replace('_', ' ')}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-brown">Simpan</button>
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Batal</button>
        </div>
      </form>
    </div>
  );
};

export default CafeForm;
