// src/pages/CompletePage.jsx
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import './SupporterDashboard.css'

function CompletePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const status = searchParams.get('status') // "success" or "fail"

  // Get supporter user from location state or use default
  const currentSupporterUser = location.state?.supporterUser || { username: 'Supporter' }

  // Logout handler
  const handleLogout = () => {
    navigate('/supporter/login')
  }

  const handleBack = () => {
    navigate('/supporter/request')
  }

  const isSuccess = status === 'success'

  return (
    <div className="supporter-dashboard">
      {/* Main Content */}
      <div className="supporter-main-content">
        {/* Header */}
        <header className="supporter-dashboard-header">
          <div className="supporter-header-left">
            <h1>完了ページ / Complete Page</h1>
          </div>
          <div className="supporter-user-info">
            <span>ようこそ、{currentSupporterUser?.username}さん</span>
            <button className="supporter-logout-btn" onClick={handleLogout}>
              ログアウト / Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="supporter-content-area">
          <div className="supporter-complete-card">
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
              {isSuccess ? '✅' : '❌'}
            </div>
            
            <div className="supporter-status-text">
              {isSuccess
                ? '支援が完了しました。ありがとうございます！'
                : '支援に失敗しました。もう一度お試しください。'}
            </div>
            
            <div className="supporter-helper-text">
              {isSuccess
                ? '内容はマイページでいつでも確認できます。'
                : '通信状況や入力内容をご確認のうえ、再度お試しください。'}
            </div>

            <div className="supporter-actions">
              <button 
                type="button" 
                onClick={handleBack} 
                className="supporter-btn-primary"
              >
                支援ページに戻る / Back to Support Page
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CompletePage
