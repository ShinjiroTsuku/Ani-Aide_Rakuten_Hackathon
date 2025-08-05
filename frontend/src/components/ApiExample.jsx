import React, { useState, useEffect } from 'react';
import { userAPI, dataAPI, apiService } from '../api/services.js';

const ApiExample = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Test basic API call
  const testBasicAPI = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Call backend root path
      const response = await apiService.get('/');
      setMessage(response.data.message);
    } catch (err) {
      setError('API call failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test user login
  const testLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      const loginData = {
        username: 'test@example.com',
        password: 'password123'
      };
      
      const response = await userAPI.login(loginData);
      setMessage('Login successful: ' + JSON.stringify(response.data));
    } catch (err) {
      setError('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test get data
  const testGetData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await dataAPI.getAll();
      setData(response.data);
      setMessage('Data retrieved successfully');
    } catch (err) {
      setError('Failed to get data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test create data
  const testCreateData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const newData = {
        title: 'Test Title',
        content: 'Test Content',
        timestamp: new Date().toISOString()
      };
      
      const response = await dataAPI.create(newData);
      setMessage('Data created successfully: ' + JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to create data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test basic API when component loads
  useEffect(() => {
    testBasicAPI();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Axios API Test Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Status Information</h3>
        {loading && <p style={{ color: 'blue' }}>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {message && <p style={{ color: 'green' }}>Message: {message}</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>API Test Buttons</h3>
        <button 
          onClick={testBasicAPI}
          disabled={loading}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Test Basic API
        </button>
        
        <button 
          onClick={testLogin}
          disabled={loading}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Test Login
        </button>
        
        <button 
          onClick={testGetData}
          disabled={loading}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Get Data
        </button>
        
        <button 
          onClick={testCreateData}
          disabled={loading}
          style={{ margin: '5px', padding: '10px 15px' }}
        >
          Create Data
        </button>
      </div>

      {data.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Retrieved Data</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '5px',
            overflow: 'auto'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <h3>Usage Instructions</h3>
        <ul>
          <li>Ensure backend server is running at <code>http://localhost:8000</code></li>
          <li>Backend needs to start FastAPI server: <code>uvicorn app.main:app --reload</code></li>
          <li>Frontend needs to start dev server: <code>npm run dev</code></li>
          <li>Check browser console for detailed request and response logs</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiExample; 