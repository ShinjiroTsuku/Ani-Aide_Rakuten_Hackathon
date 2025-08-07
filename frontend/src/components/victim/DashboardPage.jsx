import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPage() {
  // ユーザーの名前を直接変数に代入
  const name = "山田太郎";

  return (
    <div>
      <h2>被災者向けダッシュボード</h2>
      {/* ログインしたユーザーの名前を表示 */}
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>ようこそ、{name}さん！</p>
      <p>物資要請の状況がここに表示されます。</p>
      <nav>
        <Link to="/victim/request">
          <button>物資を要請する</button>
        </Link>

        {/* ★ここを修正します */}
        {/* <Link to="/victim/status">
          <button style={{ marginLeft: '10px' }}>基本情報登録・変更</button>
        </Link> */}
        
        {/* ★aタグを使って、外部サイトに直接リンク */}
        <a 
          href="https://my.rakuten.co.jp/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button style={{ marginLeft: '10px' }}>基本情報登録・変更</button>
        </a>
      </nav>
    </div>
  );
}

export default DashboardPage;