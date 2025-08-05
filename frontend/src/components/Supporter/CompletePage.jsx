// src/pages/CompletePage.jsx
import { useSearchParams, useNavigate } from 'react-router-dom'

function CompletePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const status = searchParams.get('status')  // "success" or "fail"

  const handleBack = () => {
    navigate('/supporter/request')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>完了ページ</h2>
      {status === 'success' ? (
        <p style={{ color: 'green' }}>寄付が完了しました。ありがとうございます！</p>
      ) : (
        <p style={{ color: 'red' }}>寄付に失敗しました。もう一度お試しください。</p>
      )}

      <button onClick={handleBack} style={{ marginTop: '1rem' }}>
        寄付ページに戻る
      </button>
    </div>
  )
}

export default CompletePage
