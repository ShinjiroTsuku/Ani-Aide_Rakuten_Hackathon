import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI default port
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('Sending request:', config.url);
    
    // Add token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Do something with request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Do something with response data
    console.log('Received response:', response.data);
    return response;
  },
  (error) => {
    // Do something with response error
    console.error('Response error:', error.response?.data || error.message);
    
    // Handle 401 unauthorized error
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login page here if needed
    }
    
    return Promise.reject(error);
  }
);

export default api; 