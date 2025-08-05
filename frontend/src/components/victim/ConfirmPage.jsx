// frontend/src/components/victim/ConfirmPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ConfirmPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>確認画面</h2>
      <p>要請内容に間違いがないかご確認ください。</p>
      <Link to="/victim/complete">
        <button>確定</button>
      </Link>
      <button onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>
        戻る
      </button>
    </div>
  );
}

export default ConfirmPage;