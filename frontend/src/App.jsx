// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/victim/LoginPage'; // パスはそのまま
// 新しいコンポーネントをインポート
import DashboardPage from './components/victim/DashboardPage';
import RequestPage from './components/victim/RequestPage';
import ConfirmPage from './components/victim/ConfirmPage';
import CompletePage from './components/victim/CompletePage';
import StatusPage from './components/victim/StatusPage';
import LoginPage from './components/Supporter/LoginPage.jsx'
import SupporterReq from './components/Supporter/SupporterReq.jsx'
import SupporterConfirm from './components/Supporter/SupporterConfirm.jsx'
import CompletePage from './components/Supporter/CompletePage.jsx'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Victim側のルーティング */}
      <Route path="/victim">
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="request" element={<RequestPage />} />
        <Route path="confirm" element={<ConfirmPage />} />
        <Route path="complete" element={<CompletePage />} />
        <Route path="status" element={<StatusPage />} />
      </Route>
      <Routes path="/supporter">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/request" element={<SupporterReq />} />
        <Route path="/confirm" element={<SupporterConfirm />} />
        <Route path="/status" element={<CompletePage />} />
      </Routes>
    </Routes>
  );
}

export default App;