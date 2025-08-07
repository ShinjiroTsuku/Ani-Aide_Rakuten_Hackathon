// src/components/Supporter/LoginPage.jsx (or your path)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:8000/supporter/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username_or_email: usernameOrEmail,
          password: password,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.detail || 'Login failed')
        setIsLoading(false)
        return
      }

      navigate('/supporter/request') // success → go to supporter page
    } catch (err) {
      setError('Network error')
      console.error(err)
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="supporter-login-container">
      <div className="supporter-login-card">
        <div className="supporter-login-header">
          <h2>支援者ログイン</h2>
          <p>Supporter Login</p>
        </div>
        
        <form onSubmit={handleSubmit} className="supporter-login-form">
          <div className="form-group">
            <label htmlFor="usernameOrEmail">ユーザー名またはメール / Username or Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="ユーザー名またはメールアドレスを入力"
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
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button
              type="submit"
              className="login-button"
              disabled={isLoading || !usernameOrEmail || !password}
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
        
        <div className="supporter-login-footer">
          <p>支援者アカウントでログインしてください</p>
          <p>Please login with your supporter account</p>
        </div>
      </div>
    </div>
  )
}
