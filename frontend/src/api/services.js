import api from './axios.js';

// User related APIs
export const userAPI = {
  // Get user information
  getUserInfo: () => api.get('/users/me'),
  
  // User login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // User registration
  register: (userData) => api.post('/auth/register', userData),
  
  // User logout
  logout: () => api.post('/auth/logout'),
};

// Data related APIs
export const dataAPI = {
  // Get all data
  getAll: () => api.get('/data'),
  
  // Get data by ID
  getById: (id) => api.get(`/data/${id}`),
  
  // Create new data
  create: (data) => api.post('/data', data),
  
  // Update data
  update: (id, data) => api.put(`/data/${id}`, data),
  
  // Delete data
  delete: (id) => api.delete(`/data/${id}`),
};

// File upload APIs
export const uploadAPI = {
  // Upload file
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Generic API service methods
export const apiService = {
  // GET request
  get: (url, params = {}) => api.get(url, { params }),
  
  // POST request
  post: (url, data = {}) => api.post(url, data),
  
  // PUT request
  put: (url, data = {}) => api.put(url, data),
  
  // DELETE request
  delete: (url) => api.delete(url),
  
  // PATCH request
  patch: (url, data = {}) => api.patch(url, data),
}; 