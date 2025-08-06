// src/components/Supporter/LoginPage.jsx (or your path)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

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
        return
      }

      navigate('/supporter/request') // success → go to supporter page
    } catch (err) {
      setError('Network error')
      console.error(err)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>支援者ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名またはメール:</label><br />
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>パスワード:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p style={{ color: 'red', marginTop: '0.75rem' }}>{error}</p>
        )}

        <button type="submit" style={{ marginTop: '1.5rem' }}>
          ログイン
        </button>
      </form>
    </div>
  )
}
