// frontend/src/components/victim/ConfirmPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './victim.css'; // victim.cssをインポート

export default function ConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get victim user from location state or use default
  const currentVictimUser = location.state?.victimUser || { username: '山田太郎' };
  
  // Logout handler
  const handleLogout = () => {
    navigate('/victim/login');
  };

  const handleConfirm = () => {
    navigate('/victim/complete');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="victim-dashboard">
      <div className="victim-main-content">
        {/* Header */}
        <header className="victim-dashboard-header">
          <div className="victim-header-left">
            <h1>確認画面 / Confirm Page</h1>
          </div>
          <div className="victim-user-info">
            <span>ようこそ、{currentVictimUser?.username}さん</span>
            <button className="victim-logout-btn" onClick={handleLogout}>
              ログアウト / Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="victim-content-area">
          <div className="victim-dashboard-card">
            <h2>確認画面</h2>
            <p className="description">要請内容に間違いがないかご確認ください。</p>
            <div className="victim-actions">
              <button
                className="victim-btn-primary"
                onClick={handleConfirm}
              >
                確定 / Confirm
              </button>
              <button
                className="victim-btn-secondary"
                onClick={handleBack}
              >
                戻る / Back
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}