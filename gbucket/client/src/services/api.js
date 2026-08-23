import axios from 'axios';

// Dynamically handle root endpoint version prefixes
const API_PREFIX = '/v1';

/**
 * Main API client configured with environment variables and base URLs.
 * Content-Type is left flexible or defaults to JSON, but can handle FormData automatically.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `http://localhost:3060/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Request interceptor to omit 'Content-Type' if sending FormData 
// so the browser can correctly append the multipart boundary string.
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const fileService = {
  createFile: (data) => api.post('/files', data)
};

export default api;