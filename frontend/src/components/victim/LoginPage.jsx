// frontend/src/components/victim/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = onBack || (() => navigate('/'))

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === 'hanako@example.com' && password === 'cde123') {
        setError('');
        // Navigate to the dashboard after successful login, passing the email as state
        navigate('/victim/dashboard', { state: { userEmail: email } });
      } else {
        setError('IDまたはパスワードが間違っています。');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="victim-login-container">
      <div className="victim-login-card">
        <div className="victim-login-header">
          <h2>被災者ログイン</h2>
          <p>Victim Login</p>
        </div>
        <form onSubmit={handleSubmit} className="victim-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hanako@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="cde123"
              required
              disabled={isLoading}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button
              type="submit"
              className="login-button"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </button>
            <button type="button" className="back-button" onClick={handleBack} disabled={isLoading}>
              戻る
            </button>
          </div>
        </form>
        <div className="victim-login-footer">
          <p>被災者権限が必要です</p>
          <p>Victim privileges required</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;