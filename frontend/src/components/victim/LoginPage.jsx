// frontend/src/components/victim/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState(''); // ★UserIDからEmailに変更
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // ★エラーメッセージ用のStateを追加
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ★認証チェック
    if (email === 'hanako@example.com' && password === 'cde123') {
      // ログイン成功
      console.log("ログイン成功");
      setError('');
      navigate('/victim/dashboard');
    } else {
      // ログイン失敗
      console.log("ログイン失敗");
      setError('IDまたはパスワードが間違っています。');
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="victim-login-container">
      <div className="victim-login-card">
        <div className="victim-login-header">
          <h2>被災者ログイン</h2>
          <p>Victim Login</p>
        </div>
        
        <form onSubmit={handleLogin} className="victim-login-form">
          <div className="form-group">
            <label htmlFor="email">メールアドレス / Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力"
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
              disabled={isLoading || !email || !password}
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
        
        <div className="victim-login-footer">
          <p>被災者アカウントでログインしてください</p>
          <p>Please login with your victim account</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;