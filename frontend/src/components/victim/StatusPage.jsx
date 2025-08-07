import React from 'react';
import { Link } from 'react-router-dom';

function StatusPage() {
  return (
    <div className="status-page-container">
      <h2>楽天アカウント 基本情報登録・変更</h2>
      <p>以下のボタンから楽天のウェブサイトに移動し、情報を変更してください。</p>
      
      {/* 新しいタブで楽天のサイトを開くリンクボタン */}
      <a 
        href="https://www.rakuten.co.jp/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <button className="open-link-button">楽天アカウントページへ</button>
      </a>

      <div className="back-button-container">
        <Link to="/victim/dashboard">
          <button className="back-button">Dashboardに戻る</button>
        </Link>
      </div>
    </div>
  );
}

export default StatusPage;