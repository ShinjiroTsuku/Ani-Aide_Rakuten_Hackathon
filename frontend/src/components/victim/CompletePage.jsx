// frontend/src/components/victim/CompletePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CompletePage() {
  return (
    <div>
      <h2>完了画面</h2>
      <p>物資要請が完了しました。</p>
      <nav>
        <Link to="/victim/dashboard">
          <button>要請状況を確認する</button>
        </Link>
        <Link to="/">
          <button style={{ marginLeft: '10px' }}>トップに戻る</button>
        </Link>
      </nav>
    </div>
  );
}

export default CompletePage;