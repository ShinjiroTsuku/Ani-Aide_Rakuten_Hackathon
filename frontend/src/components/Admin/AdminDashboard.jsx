import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminDashboard.css'
import AdminRequests from './AdminRequests'
import AdminShelters from './AdminShelters'

function AdminDashboard({ adminUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [recentRequests, setRecentRequests] = useState([])
  const [stats, setStats] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  // Get admin user from location state or use default
  const currentAdminUser = adminUser || location.state?.adminUser || { username: 'Admin' }

  // Default logout handler if not provided
  const handleLogout = onLogout || (() => {
    navigate('/admin/login')
  })

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchRecentRequests()
    }
  }, [activeTab])

  const fetchRecentRequests = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/request', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 認証が必要な場合はAuthorizationヘッダーを追加
          // 'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setRecentRequests(data.requests)
      setStats(data.stats)
    } catch (err) {
      console.error('Error fetching recent requests:', err)
      // エラー時はmockデータを使用
      setRecentRequests([
        { id: 1, location: '東京都', shelter: '避難所A', petType: '猫', item: 'ペットフード', quantity: '10kg', status: 'pending', date: '2024-01-15' },
        { id: 2, location: '大府', shelter: '避難所B', petType: '犬', item: '薬品', quantity: '5箱', status: 'completed', date: '2024-01-14' },
        { id: 3, location: '福岡県', shelter: '避難所C', petType: '猫', item: '衛生用品', quantity: '20個', status: 'in-progress', date: '2024-01-13' },
        { id: 4, location: '北海道', shelter: '避難所D', petType: '犬', item: '毛布', quantity: '15枚', status: 'pending', date: '2024-01-12' },
        { id: 5, location: '沖縄県', shelter: '避難所E', petType: 'その他', item: 'ケージ', quantity: '8個', status: 'completed', date: '2024-01-11' }
      ])
    } 
  }


  // Mock data for demonstration
  const mockStats = {
    totalRequests: 156,
    pendingRequests: 23,
    completedSupports: 89,
    activeShelters: 12
  }

  const mockRecentRequests = [
    { id: 1, location: '東京都', shelter: '避難所A', petType: '猫', item: 'ペットフード', quantity: '10kg', status: 'pending', date: '2024-01-15' },
    { id: 2, location: '大阪府', shelter: '避難所B', petType: '犬', item: '薬品', quantity: '5箱', status: 'completed', date: '2024-01-14' },
    { id: 3, location: '福岡県', shelter: '避難所C', petType: '猫', item: '衛生用品', quantity: '20個', status: 'in-progress', date: '2024-01-13' },
    { id: 4, location: '北海道', shelter: '避難所D', petType: '犬', item: '毛布', quantity: '15枚', status: 'pending', date: '2024-01-12' },
    { id: 5, location: '沖縄県', shelter: '避難所E', petType: 'その他', item: 'ケージ', quantity: '8個', status: 'completed', date: '2024-01-11' }
  ]

  // Mock data for reports
  const mockReportData = {
    monthlyStats: [
      { month: '1月', requests: 45, completed: 38, pending: 7 },
      { month: '2月', requests: 52, completed: 45, pending: 7 },
      { month: '3月', requests: 38, completed: 32, pending: 6 },
      { month: '4月', requests: 61, completed: 54, pending: 7 },
      { month: '5月', requests: 48, completed: 42, pending: 6 },
      { month: '6月', requests: 55, completed: 49, pending: 6 }
    ],
    topItems: [
      { item: 'ペットフード', count: 89, percentage: 23 },
      { item: '薬品', count: 67, percentage: 17 },
      { item: '毛布', count: 54, percentage: 14 },
      { item: '衛生用品', count: 43, percentage: 11 },
      { item: 'ケージ', count: 38, percentage: 10 }
    ],
    shelterPerformance: [
      { shelter: '避難所A', requests: 25, completionRate: 92 },
      { shelter: '避難所B', requests: 18, completionRate: 89 },
      { shelter: '避難所C', requests: 22, completionRate: 95 },
      { shelter: '避難所D', requests: 15, completionRate: 87 },
      { shelter: '避難所E', requests: 20, completionRate: 90 }
    ]
  }

  // Mock settings data
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    language: 'ja',
    theme: 'light',
    autoRefresh: true,
    refreshInterval: 30
  })

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  // Render dashboard content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>総要請数</h3>
                <p className="stat-number">{stats.totalRequests}</p>
                <p className="stat-label">Total Requests</p>
              </div>
              <div className="stat-card">
                <h3>待機中</h3>
                <p className="stat-number">{stats.pendingRequests}</p>
                <p className="stat-label">Pending</p>
              </div>
              <div className="stat-card">
                <h3>完了支援</h3>
                <p className="stat-number">{stats.completedSupports}</p>
                <p className="stat-label">Completed</p>
              </div>
              <div className="stat-card">
                <h3>活動避難所</h3>
                <p className="stat-number">{stats.activeShelters}</p>
                <p className="stat-label">Active Shelters</p>
              </div>
            </div>
            
            <div className="recent-requests">
              <h3>最近の要請 / Recent Requests</h3>
              <div className="requests-table">
                <table>
                  <thead>
                    <tr>
                      <th>所在地 / Location</th>
                      <th>避難所 / Shelter</th>
                      <th>ペット種類 / Pet Type</th>
                      <th>物品 / Item</th>
                      <th>数量 / Quantity</th>
                      <th>状態 / Status</th>
                      <th>日付 / Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map(request => (
                      <tr key={request.id}>
                        <td>{request.location}</td>
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
          </div>
        )
      
      case 'requests':
        return <AdminRequests />
      
      case 'shelters':
        return <AdminShelters />
      
      case 'reports':
        return (
          <div className="reports-section">
            <div className="reports-header">
              <h2>レポート / Reports</h2>
              <div className="report-actions">
                <button className="btn-export">📊 エクスポート / Export</button>
                <button className="btn-print">🖨️ 印刷 / Print</button>
              </div>
            </div>

            <div className="reports-grid">
              {/* Monthly Statistics */}
              <div className="report-card">
                <h3>月次統計 / Monthly Statistics</h3>
                <div className="chart-container">
                  <div className="monthly-chart">
                    {mockReportData.monthlyStats.map((stat, index) => (
                      <div key={index} className="chart-bar">
                        <div className="bar-label">{stat.month}</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill completed" 
                            style={{height: `${(stat.completed / 70) * 100}%`}}
                            title={`完了: ${stat.completed}`}
                          ></div>
                          <div 
                            className="bar-fill pending" 
                            style={{height: `${(stat.pending / 70) * 100}%`}}
                            title={`待機中: ${stat.pending}`}
                          ></div>
                        </div>
                        <div className="bar-total">{stat.requests}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Requested Items */}
              <div className="report-card">
                <h3>要請物品ランキング / Top Requested Items</h3>
                <div className="items-list">
                  {mockReportData.topItems.map((item, index) => (
                    <div key={index} className="item-row">
                      <div className="item-rank">#{index + 1}</div>
                      <div className="item-name">{item.item}</div>
                      <div className="item-count">{item.count}</div>
                      <div className="item-percentage">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shelter Performance */}
              <div className="report-card">
                <h3>避難所パフォーマンス / Shelter Performance</h3>
                <div className="performance-table">
                  <table>
                    <thead>
                      <tr>
                        <th>避難所 / Shelter</th>
                        <th>要請数 / Requests</th>
                        <th>完了率 / Completion Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReportData.shelterPerformance.map((shelter, index) => (
                        <tr key={index}>
                          <td>{shelter.shelter}</td>
                          <td>{shelter.requests}</td>
                          <td>
                            <div className="completion-bar">
                              <div 
                                className="completion-fill"
                                style={{width: `${shelter.completionRate}%`}}
                              ></div>
                              <span>{shelter.completionRate}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'settings':
        return (
          <div className="settings-section">
            <div className="settings-header">
              <h2>設定 / Settings</h2>
              <p>システム設定と構成を管理します / Manage system settings and configurations</p>
            </div>

            <div className="settings-grid">
              {/* Notification Settings */}
              <div className="settings-card">
                <h3>通知設定 / Notification Settings</h3>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                    />
                    メール通知 / Email Notifications
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.sms}
                      onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                    />
                    SMS通知 / SMS Notifications
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                    />
                    プッシュ通知 / Push Notifications
                  </label>
                </div>
              </div>

              {/* Display Settings */}
              <div className="settings-card">
                <h3>表示設定 / Display Settings</h3>
                <div className="setting-item">
                  <label>言語 / Language</label>
                  <select 
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', 'language', e.target.value)}
                  >
                    <option value="ja">日本語</option>
                    <option value="en">English</option>
                    <option value="ko">한국어</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>テーマ / Theme</label>
                  <select 
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', 'theme', e.target.value)}
                  >
                    <option value="light">ライト / Light</option>
                    <option value="dark">ダーク / Dark</option>
                    <option value="auto">自動 / Auto</option>
                  </select>
                </div>
              </div>

              {/* System Settings */}
              <div className="settings-card">
                <h3>システム設定 / System Settings</h3>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.autoRefresh}
                      onChange={(e) => handleSettingChange('autoRefresh', 'autoRefresh', e.target.checked)}
                    />
                    自動更新 / Auto Refresh
                  </label>
                </div>
                <div className="setting-item">
                  <label>更新間隔 / Refresh Interval (秒)</label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={settings.refreshInterval}
                    onChange={(e) => handleSettingChange('refreshInterval', 'refreshInterval', parseInt(e.target.value))}
                    disabled={!settings.autoRefresh}
                  />
                </div>
              </div>

              {/* Account Settings */}
              <div className="settings-card">
                <h3>アカウント設定 / Account Settings</h3>
                <div className="setting-item">
                  <label>ユーザー名 / Username</label>
                  <input type="text" value={currentAdminUser?.username || 'Admin'} readOnly />
                </div>
                <div className="setting-item">
                  <label>メールアドレス / Email</label>
                  <input type="email" placeholder="admin@example.com" />
                </div>
                <div className="setting-item">
                  <button className="btn-change-password">パスワード変更 / Change Password</button>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="btn-save-settings">設定を保存 / Save Settings</button>
              <button className="btn-reset-settings">リセット / Reset</button>
            </div>
          </div>
        )
      
      default:
        return <div>Select a tab from the sidebar</div>
    }
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h3>管理者パネル</h3>
          <button 
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 ダッシュボード
          </button>
          <button 
            className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📋 要請管理
          </button>
          <button 
            className={`nav-item ${activeTab === 'shelters' ? 'active' : ''}`}
            onClick={() => setActiveTab('shelters')}
          >
            🏠 避難所管理
          </button>
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            📈 レポート
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ 設定
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>{activeTab === 'dashboard' ? 'ダッシュボード / Dashboard' : 
                 activeTab === 'requests' ? '要請管理 / Request Management' :
                 activeTab === 'shelters' ? '避難所管理 / Shelter Management' :
                 activeTab === 'reports' ? 'レポート / Reports' :
                 '設定 / Settings'}</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span>ようこそ、{currentAdminUser?.username}さん</span>
              <button className="logout-btn" onClick={handleLogout}>
                ログアウト / Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard