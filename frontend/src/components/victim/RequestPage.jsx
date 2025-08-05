// frontend/src/components/victim/RequestPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function RequestPage() {
  return (
    <div>
      <h2>物資要請フォーム</h2>
      <p>必要な物資と数量を入力してください。</p>
      <Link to="/victim/confirm">
        <button>Confirm画面へ</button>
      </Link>
    </div>
  );
}

export default RequestPage;