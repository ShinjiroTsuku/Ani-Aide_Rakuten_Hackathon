// frontend/src/components/victim/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <h2>被災者向けログイン画面</h2>
      <p>IDとパスワードを入力してください。</p>
      <Link to="/victim/dashboard">
        <button>Dashboard画面へ</button>
      </Link>
    </div>
  );
}

export default LoginPage;