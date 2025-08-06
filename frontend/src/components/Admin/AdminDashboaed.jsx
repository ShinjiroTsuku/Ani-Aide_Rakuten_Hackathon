import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard({ adminUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Get admin user from location state or use default
  const currentAdminUser = adminUser || location.state?.adminUser || { username: 'Admin' }

  // Default logout handler if not provided
  const handleLogout = onLogout || (() => {
    navigate('/admin/login')
  })

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

  // Render dashboard content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>総要請数</h3>
                <p className="stat-number">{mockStats.totalRequests}</p>
                <p className="stat-label">Total Requests</p>
              </div>
              <div className="stat-card">
                <h3>待機中</h3>
                <p className="stat-number">{mockStats.pendingRequests}</p>
                <p className="stat-label">Pending</p>
              </div>
              <div className="stat-card">
                <h3>完了支援</h3>
                <p className="stat-number">{mockStats.completedSupports}</p>
                <p className="stat-label">Completed</p>
              </div>
              <div className="stat-card">
                <h3>活動避難所</h3>
                <p className="stat-number">{mockStats.activeShelters}</p>
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
                    {mockRecentRequests.map(request => (
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
        return (
          <div className="requests-management">
            <h2>要請管理 / Request Management</h2>
            <p>Manage all support requests from disaster victims</p>
            {/* TODO: Add request management interface */}
          </div>
        )
      
      case 'shelters':
        return (
          <div className="shelters-management">
            <h2>避難所管理 / Shelter Management</h2>
            <p>Manage registered shelters and their information</p>
            {/* TODO: Add shelter management interface */}
          </div>
        )
      
      case 'reports':
        return (
          <div className="reports-section">
            <h2>レポート / Reports</h2>
            <p>Generate and view various reports and analytics</p>
            {/* TODO: Add reporting interface */}
          </div>
        )
      
      case 'settings':
        return (
          <div className="settings-section">
            <h2>設定 / Settings</h2>
            <p>Manage system settings and configurations</p>
            {/* TODO: Add settings interface */}
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