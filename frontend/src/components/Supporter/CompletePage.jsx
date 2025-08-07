// src/pages/CompletePage.jsx
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

function CompletePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const status = searchParams.get('status') // "success" or "fail"

  // Get supporter user from location state or use default
  const currentSupporterUser = location.state?.supporterUser || { username: 'Supporter' }

  // Logout handler
  const handleLogout = () => {
    navigate('/supporter/login')
  }

  const handleBack = () => {
    navigate('/supporter/request')
  }

  const isSuccess = status === 'success'

  return (
    <div style={styles.page}>
      {/* Header with user info and logout */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>完了ページ / Complete Page</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <span style={styles.userInfoText}>ようこそ、{currentSupporterUser?.username}さん</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              ログアウト / Logout
            </button>
          </div>
        </div>
      </div>

      <div style={styles.card}>
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
    width: '100%',
    backgroundColor: '#BF0000',  // RED
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
  },
  header: {
    width: '100%',
    maxWidth: 560,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.08)',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    margin: 0,
    fontSize: 20,
    color: '#BF0000',
    fontWeight: 700,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
  },
  logoutBtn: {
    padding: '8px 12px',
    backgroundColor: '#BF0000',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
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
