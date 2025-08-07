// frontend/src/components/victim/ConfirmPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ConfirmPage.css'; // 新しいCSSファイルをインポート

function ConfirmPage() {
  const navigate = useNavigate();

  return (
    <div className="victim-page-container">
      <div className="victim-card">
        <h2 className="victim-title">要請内容確認</h2>
        <p className="victim-text">要請内容に間違いがないかご確認ください。</p>
        <div className="victim-actions">
          <Link to="/victim/complete" className="victim-link-button">
            <button className="victim-primary-btn">確定</button>
          </Link>
          <button onClick={() => navigate(-1)} className="victim-secondary-btn">
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;