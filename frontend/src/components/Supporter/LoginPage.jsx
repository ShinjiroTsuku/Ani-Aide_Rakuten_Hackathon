import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState(''); // ★EmailをStateで管理
  const [password, setPassword] = useState(''); // ★PasswordをStateで管理
  const [error, setError] = useState(''); // ★エラーメッセージ用のStateを追加

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ★認証チェック
    if (email === 'hanako@example.com' && password === 'cde123') {
      // ログイン成功
      console.log("ログイン成功");
      setError('');
      navigate('/supporter/request');
    } else {
      // ログイン失敗
      console.log("ログイン失敗");
      setError('Emailまたはパスワードが間違っています。');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>支援者ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input 
            type="email"
            value={email} // ★valueとonChangeを追加
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Password:</label><br />
          <input 
            type="password"
            value={password} // ★valueとonChangeを追加
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        
        {/* ★エラーメッセージの表示 */}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        
        <button type="submit" style={{ marginTop: '1.5rem' }}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default LoginPage;