import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './victim.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get victim user from location state or use default
  const currentVictimUser = location.state?.victimUser || { username: '山田太郎' };

  // Logout handler
  const handleLogout = () => {
    navigate('/victim/login');
  };

  // ダミーの要請データ
  const recentRequests = [
    { shelter: '避難所A', petType: 'ペットフード', item: 'ドライフード', quantity: '10kg', status: '処理中', date: '2024-01-15' },
    { shelter: '避難所B', petType: '犬', item: '首輪', quantity: '1個', status: '完了', date: '2024-01-14' },
    { shelter: '避難所C', petType: '猫', item: '猫砂', quantity: '20個', status: '完了', date: '2024-01-13' },
    { shelter: '避難所D', petType: '犬', item: '毛布', quantity: '5枚', status: '処理中', date: '2024-01-12' },
    { shelter: '避難所E', petType: 'その他', item: 'ケージ', quantity: '6個', status: '処理中', date: '2024-01-11' },
  ];

  return (
    <div className="victim-dashboard">
      <div className="victim-main-content">
        {/* Header */}
        <header className="victim-dashboard-header">
          <div className="victim-header-left">
            <h1>被災者向けダッシュボード / Victim Dashboard</h1>
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
            <h2>被災者向けダッシュボード</h2>
            <p className="description">物資要請の状況がここに表示されます。</p>

            {/* ここに「最近の要請」の表を直接配置します */}
            <div className="victim-recent-requests-card">
              <h3>最近の要請 / Recent Requests</h3>
              <div className="victim-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>避難所 / Shelter</th>
                      <th>ペット種別 / Pet Type</th>
                      <th>物資 / Item</th>
                      <th>数量 / Quantity</th>
                      <th>状態 / Status</th>
                      <th>日付 / Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request, index) => (
                      <tr key={index}>
                        <td>{request.shelter}</td>
                        <td>{request.petType}</td>
                        <td>{request.item}</td>
                        <td>{request.quantity}</td>
                        <td>
                          <span className={`status-badge status-${request.status === '完了' ? 'completed' : 'pending'}`}>
                            {request.status}
                          </span>
                        </td>
                        <td>{request.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <nav className="victim-actions">
              <Link to="/victim/request">
                <button className="victim-btn-primary">
                  物資を要請する / Request Items
                </button>
              </Link>
              <a
                href="https://my.rakuten.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="victim-btn-secondary">
                  基本情報登録・変更 / Edit Profile
                </button>
              </a>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}