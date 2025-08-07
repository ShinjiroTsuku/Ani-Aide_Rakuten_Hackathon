// frontend/src/components/victim/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location.state?.userEmail || 'ゲスト';

  const handleLogout = () => {
    navigate('/victim/login');
  };

  // ★ここに仮の要請データを追加
  const mockRecentRequests = [
    { id: 1, shelter: '避難所A', petType: '猫', item: 'ペットフード', quantity: '10kg', status: 'pending', date: '2024-01-15' },
    { id: 2, shelter: '避難所B', petType: '犬', item: '薬品', quantity: '5箱', status: 'completed', date: '2024-01-14' },
    { id: 3, shelter: '避難所C', petType: '猫', item: '衛生用品', quantity: '20個', status: 'in-progress', date: '2024-01-13' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>被災者向けダッシュボード</h1>
        <div className="user-info">
          <span>ようこそ、{userEmail}さん</span>
          <button className="logout-btn" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </header>
      
      <main className="dashboard-main">
        
        {/* ★ここに表を追加 */}
        <div className="recent-requests">
          <h3>最近の要請 / Recent Requests</h3>
          <div className="requests-table">
            <table>
              <thead>
                <tr>
                  <th>避難所 / Shelter</th>
                  <th>ペット種類 / Pet Type</th>
                  <th>物品 / Item</th>
                  <th>数量 / Quantity</th>
                  <th>状態 / Status</th>
                  <th>日付 / Date</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.shelter}</td>
                    <td>{request.petType}</td>
                    <td>{request.item}</td>
                    <td>{request.quantity}</td>
                    <td>
                      <span className={`status-badge ${request.status}`}>
                        {request.status === 'pending' ? '待機中' : 
                         request.status === 'completed' ? '完了' : '進行中'}
                      </span>
                    </td>
                    <td>{request.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <nav className="dashboard-nav">
          <Link to="/victim/request">
            <button className="nav-button primary-button">物資を要請する</button>
          </Link>
          <a
            href="https://my.rakuten.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="nav-button secondary-button">基本情報登録・変更</button>
          </a>
        </nav>
      </main>
    </div>
  );
}

export default DashboardPage;