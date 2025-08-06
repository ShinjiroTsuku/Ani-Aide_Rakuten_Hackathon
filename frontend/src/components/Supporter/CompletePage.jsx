// src/pages/CompletePage.jsx
import { useSearchParams, useNavigate } from 'react-router-dom'

function CompletePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const status = searchParams.get('status') // "success" or "fail"

  const handleBack = () => {
    navigate('/supporter/request')
  }

  const isSuccess = status === 'success'

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>完了ページ</h2>

        <div style={styles.statusWrap}>
          <p style={styles.statusText}>
            {isSuccess
              ? '寄付が完了しました。ありがとうございます！'
              : '寄付に失敗しました。もう一度お試しください。'}
          </p>
          <p style={styles.helperText}>
            {isSuccess
              ? '内容はマイページでいつでも確認できます。'
              : '通信状況や入力内容をご確認のうえ、再度お試しください。'}
          </p>
        </div>

        <button type="button" onClick={handleBack} style={styles.primaryBtn}>
          寄付ページに戻る
        </button>
      </div>
    </div>
  )
}

const styles = {
  // Full-bleed red background
  page: {
    minHeight: '100vh',
    width: '100vw',              // ensures no side gutters if you use Option B
    backgroundColor: '#BF0000',  // RED
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  // White card
  card: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: '28px 24px',
    boxShadow:
      '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.08)',
  },
  // Title in RED
  title: {
    margin: 0,
    marginBottom: 12,
    fontSize: 24,
    color: '#BF0000',     // make the main heading red
    fontWeight: 800,
    textAlign: 'center',
  },
  statusWrap: {
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  // Main text in black
  statusText: {
    margin: 0,
    color: '#000000',
    fontSize: 16,
    lineHeight: 1.6,
  },
  // Small support strings in gray
  helperText: {
    marginTop: 8,
    marginBottom: 0,
    color: '#808080',
    fontSize: 13,
    lineHeight: 1.5,
  },
  // Button: RED background, white text
  primaryBtn: {
    marginTop: 16,
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#BF0000',  // red
    color: '#FFFFFF',            // white text
    border: '1px solid #BF0000',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
  },
}

export default CompletePage
