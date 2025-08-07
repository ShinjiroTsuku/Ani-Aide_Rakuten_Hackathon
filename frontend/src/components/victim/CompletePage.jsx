// frontend/src/components/victim/CompletePage.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './victim.css'; // victim.cssをインポート

export default function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get victim user from location state or use default
  const currentVictimUser = location.state?.victimUser || { username: '山田太郎' };
  
  // Logout handler
  const handleLogout = () => {
    navigate('/victim/login');
  };

  return (
    <div className="victim-dashboard">
      <div className="victim-main-content">
        {/* Header */}
        <header className="victim-dashboard-header">
          <div className="victim-header-left">
            <h1>完了画面 / Complete Page</h1>
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
            <h2>完了画面</h2>
            <p className="description">物資要請が完了しました。</p>
            <nav className="victim-actions">
              <Link to="/victim/dashboard">
                <button className="victim-btn-primary">
                  要請状況を確認する / Check Status
                </button>
              </Link>
              <Link to="/">
                <button className="victim-btn-secondary">
                  トップに戻る / Return to Top
                </button>
              </Link>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}