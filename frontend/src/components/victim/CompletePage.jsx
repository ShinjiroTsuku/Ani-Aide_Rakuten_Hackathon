// frontend/src/components/victim/CompletePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CompletePage.css'; // 新しいCSSファイルをインポート

function CompletePage() {
  return (
    <div className="victim-page-container">
      <div className="victim-card">
        <h2 className="victim-title">完了</h2>
        <p className="victim-text">物資要請が完了しました。</p>
        <nav className="victim-actions">
          <Link to="/victim/dashboard" className="victim-link-button">
            <button className="victim-primary-btn">要請状況を確認する</button>
          </Link>
          <Link to="/" className="victim-link-button">
            <button className="victim-secondary-btn">トップに戻る</button>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default CompletePage;