import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:6543/api',
});

export default API;
