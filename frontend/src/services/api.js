import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6543', // URL backend saya
});

// === AUTH ===
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

// === CAFE ===
export const getCafes = () => api.get('/cafes');
export const addCafe = (data) => api.post('/cafes', data);
export const editCafe = (id, data) => api.put(`/cafes/${id}`, data);
export const deleteCafe = (id) => api.delete(`/cafes/${id}`);

// === REVIEW ===
export const getReviews = (cafeId) => api.get(`/cafes/${cafeId}/reviews`);
export const addReview = (cafeId, data) => api.post(`/cafes/${cafeId}/reviews`, data);

export default api;