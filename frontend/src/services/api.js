import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:6543';

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getCafes = () => api.get('/cafes');
export const addCafe = (data) => api.post('/cafes', data);
export const editCafe = (id, data) => api.put(`/cafes/${id}`, data);
export const deleteCafe = (id) => api.delete(`/cafes/${id}`);
export const getReviews = (cafeId) => api.get(`/cafes/${cafeId}/reviews`);
export const addReview = (cafeId, data) => api.post(`/cafes/${cafeId}/reviews`, data);