// frontend/src/components/victim/StatusPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function StatusPage() {
  return (
    <div>
      <h2>基本情報登録・変更画面</h2>
      <p>お名前や連絡先などの登録・変更ができます。</p>
      <Link to="/victim/dashboard">
        <button>Dashboardに戻る</button>
      </Link>
    </div>
  );
}

export default StatusPage;