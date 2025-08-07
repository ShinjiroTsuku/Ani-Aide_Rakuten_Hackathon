// frontend/src/components/victim/RequestPage.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './victim.css'; // victim.cssをインポート

export default function RequestPage() {
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
            <h1>物資要請フォーム / Request Form</h1>
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
            <h2>物資要請フォーム</h2>
            <p className="description">必要な物資と数量を入力してください。</p>
            <nav className="victim-actions">
              <Link to="/victim/confirm">
                <button className="victim-btn-primary">
                  確認画面へ / To Confirm Page
                </button>
              </Link>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}