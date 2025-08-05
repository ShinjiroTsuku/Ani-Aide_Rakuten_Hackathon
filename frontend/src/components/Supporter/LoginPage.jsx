import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // For now, just navigate without backend check
    navigate('/supporter/request')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>支援者ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input type="email" required />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Password:</label><br />
          <input type="password" required />
        </div>
        <button type="submit" style={{ marginTop: '1.5rem' }}>
          ログイン
        </button>
      </form>
    </div>
  )
}

export default LoginPage
