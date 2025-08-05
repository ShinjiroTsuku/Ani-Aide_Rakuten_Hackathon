// frontend/src/components/victim/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div>
      <h2>被災者向けダッシュボード</h2>
      <p>物資要請の状況がここに表示されます。</p>
      <nav>
        <Link to="/victim/request">
          <button>物資を要請する</button>
        </Link>
        <Link to="/victim/status">
          <button style={{ marginLeft: '10px' }}>基本情報登録・変更</button>
        </Link>
      </nav>
    </div>
  );
}

export default DashboardPage;