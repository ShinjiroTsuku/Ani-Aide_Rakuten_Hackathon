// src/pages/SupporterConfirm.jsx
import { useNavigate } from 'react-router-dom'

function SupporterConfirm() {
  const navigate = useNavigate()

  const handleConfirm = () => {
    navigate('/supporter/status?status=success') // 完了ページへ
  }

  const handleBack = () => {
    navigate('/supporter/request')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>支援内容確認</h2>

        <div style={styles.block}>
          <p style={styles.label}>支援品目</p>
          <p style={styles.value}>ドッグフード（10kg × 1）</p>
        </div>

        <div style={styles.block}>
          <p style={styles.label}>合計金額</p>
          <p style={styles.value}>¥4,500</p>
        </div>

        <p style={styles.helperText}>
          内容をご確認のうえ「要請する」を押してください。
        </p>

        <div style={styles.actions}>
          <button type="button" onClick={handleConfirm} style={styles.primaryBtn}>
            要請する
          </button>
          <button type="button" onClick={handleBack} style={styles.secondaryBtn}>
            戻る
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  // Full-bleed red background
  page: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#BF0000',
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
    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.08)',
  },
  // Title in red
  title: {
    margin: 0,
    marginBottom: 16,
    fontSize: 24,
    color: '#BF0000',
    fontWeight: 800,
    textAlign: 'center',
  },
  block: {
    marginTop: 8,
    marginBottom: 12,
  },
  // Labels (black)
  label: {
    margin: 0,
    color: '#000000',
    fontSize: 13,
    opacity: 0.9,
    marginBottom: 4,
  },
  // Values (black)
  value: {
    margin: 0,
    color: '#000000',
    fontSize: 16,
    fontWeight: 600,
  },
  // Small helper text (gray)
  helperText: {
    marginTop: 8,
    marginBottom: 0,
    color: '#808080',
    fontSize: 13,
    lineHeight: 1.5,
    textAlign: 'center',
  },
  actions: {
    display: 'grid',
    gap: 10,
    marginTop: 20,
  },
  // Primary button: red bg, white text
  primaryBtn: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#BF0000',
    color: '#FFFFFF',
    border: '1px solid #BF0000',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
  },
  // Secondary button: white bg, black text (subtle)
  secondaryBtn: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    border: '1px solid #000000',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
  },
}

export default SupporterConfirm
