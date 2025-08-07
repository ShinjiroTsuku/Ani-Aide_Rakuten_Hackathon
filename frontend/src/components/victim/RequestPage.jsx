// frontend/src/components/victim/RequestPage.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function RequestPage() {
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
          <h1 style={styles.headerTitle}>物資要請フォーム / Request Form</h1>
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
        <h2 style={styles.title}>物資要請フォーム</h2>
        <p style={styles.description}>必要な物資と数量を入力してください。</p>
        <Link to="/victim/confirm">
          <button style={styles.confirmButton}>Confirm画面へ</button>
        </Link>
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
  confirmButton: {
    padding: '12px 24px',
    backgroundColor: '#BF0000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default RequestPage;