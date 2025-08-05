import { useNavigate } from 'react-router-dom'

function SupporterReq() {
  const navigate = useNavigate()

  const handleGoToConfirm = () => {
    navigate('/supporter/confirm')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>支援者ページ</h2>
      <p>ここは支援者の寄付ページです。</p>
      <button onClick={handleGoToConfirm} style={{ marginTop: '1rem' }}>
        支援を確定する
      </button>
    </div>
  )
}

export default SupporterReq
