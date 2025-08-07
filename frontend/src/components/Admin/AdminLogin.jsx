import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

function AdminLogin({ onBack, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Default handlers if props are not provided
  const handleBack = onBack || (() => navigate('/'))
  const handleLogin = onLogin || ((userData) => {
    // Navigate to admin dashboard after successful login
    navigate('/admin/dashboard', { state: { adminUser: userData } })
  })

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // TODO: Replace with actual admin authentication API call
      console.log('Admin login attempt:', { username, password })
      
      // For now, just show success and call onLogin
      alert('Admin login successful!')
      handleLogin({ username })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>管理者ログイン</h2>
          <p>Admin Login</p>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">ユーザー名 / Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="管理者ユーザー名を入力"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">パスワード / Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="login-button"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? 'ログイン中...' : 'ログイン / Login'}
            </button>
            
            <button
              type="button"
              className="back-button"
              onClick={handleBack}
              disabled={isLoading}
            >
              戻る / Back
            </button>
          </div>
        </form>
        
        <div className="admin-login-footer">
          <p>管理者権限が必要です</p>
          <p>Administrator privileges required</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin