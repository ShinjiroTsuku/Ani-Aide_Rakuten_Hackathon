// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ★importが重要
import './index.css';
import App from './App.jsx'; // ★Appコンポーネントを読み込む

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ★Appコンポーネント全体を<BrowserRouter>で囲む */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);