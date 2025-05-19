import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ comment, rating: Number(rating) });
    setComment('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <label>Ulasan</label>
        <textarea
          className="form-control"
          required
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-2">
        <label>Rating</label>
        <select
          className="form-select"
          value={rating}
          onChange={e => setRating(e.target.value)}
        >
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Tambah Ulasan</button>
    </form>
  );
};

export default ReviewForm;