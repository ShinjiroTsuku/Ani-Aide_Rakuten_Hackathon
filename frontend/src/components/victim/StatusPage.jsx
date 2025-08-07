import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function StatusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get victim user from location state or use default
  const currentVictimUser = location.state?.victimUser || { username: '山田太郎' };

  // Logout handler
  const handleLogout = () => {
    navigate('/victim/login')
  }

  return (
    <div style={styles.page}>
      {/* Header with user info and logout */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>基本情報登録・変更 / Account Settings</h1>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <span style={styles.userInfoText}>ようこそ、{currentVictimUser?.username}さん</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              ログアウト / Logout
            </button>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>楽天アカウント 基本情報登録・変更</h2>
        <p style={styles.description}>以下のボタンから楽天のウェブサイトに移動し、情報を変更してください。</p>
        
        {/* 新しいタブで楽天のサイトを開くリンクボタン */}
        <a 
          href="https://www.rakuten.co.jp/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button style={styles.openLinkButton}>楽天アカウントページへ</button>
        </a>

        <div style={styles.backButtonContainer}>
          <Link to="/victim/dashboard">
            <button style={styles.backButton}>Dashboardに戻る</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#BF0000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px',
  },
  header: {
    width: '100%',
    maxWidth: 800,
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
    fontSize: 24,
    color: '#BF0000',
    fontWeight: 800,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  userInfoText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 600,
  },
  logoutBtn: {
    padding: '8px 12px',
    backgroundColor: '#BF0000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  container: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    marginBottom: 16,
    fontSize: 28,
    color: '#BF0000',
    fontWeight: 800,
  },
  description: {
    marginBottom: 32,
    color: '#666666',
    fontSize: 16,
  },
  openLinkButton: {
    padding: '12px 24px',
    backgroundColor: '#BF0000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: 24,
  },
  backButtonContainer: {
    marginTop: 16,
  },
  backButton: {
    padding: '12px 24px',
    backgroundColor: '#FFFFFF',
    color: '#BF0000',
    border: '2px solid #BF0000',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default StatusPage;