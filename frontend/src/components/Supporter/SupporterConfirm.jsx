// src/pages/SupporterConfirm.jsx
import { useNavigate } from 'react-router-dom'

function SupporterConfirm() {
  const navigate = useNavigate()

  const handleConfirm = () => {
    navigate('/supporter/status?status=success')  // ✅ go to CompletePage
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>支援内容確認</h2>
      <p>ドッグフード</p>
      <p>合計金額：</p>
      <button onClick={handleConfirm} style={{ marginTop: '1rem' }}>
        要請する
      </button>
    </div>
  )
}

export default SupporterConfirm
