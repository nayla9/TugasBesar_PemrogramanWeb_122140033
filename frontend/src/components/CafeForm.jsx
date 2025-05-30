import React, { useState, useEffect } from 'react';
import styles from '../styles/CafeForm.module.css';

const CafeForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    open_hours: '',
    description: '',
    image: '',
    ...initialData
  });

  useEffect(() => {
    setForm({
      name: initialData.name || '',
      location: initialData.location || '',
      open_hours: initialData.open_hours || '',
      description: initialData.description || '',
      image: initialData.image || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className={styles['form-container']}>
      <h3 className={styles['form-title']}>
        {initialData.id ? 'Edit Café' : 'Tambah Café Baru'}
      </h3>
      <form onSubmit={handleSubmit}>
        {['name', 'location', 'open_hours', 'description', 'image'].map((field) => (
          <div className={styles['form-group']} key={field}>
            <label htmlFor={field}>
              {field.replace('_', ' ')}
            </label>
            {field === 'description' ? (
              <textarea
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className={styles['form-input']}
                required
              />
            ) : (
              <input
                type="text"
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className={styles['form-input']}
                required
              />
            )}
          </div>
        ))}

        <div className={styles['form-actions']}>
          <button type="submit" className={styles['save-button']}>Simpan</button>
          <button type="button" className={styles['cancel-button']} onClick={onCancel}>Batal</button>
        </div>
      </form>
    </div>
  );
};

export default CafeForm;
