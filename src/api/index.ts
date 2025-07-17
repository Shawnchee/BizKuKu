import axios from 'axios';

const api = axios.create({
    baseURL: process.env.APP_API_URL || 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  
export default api;