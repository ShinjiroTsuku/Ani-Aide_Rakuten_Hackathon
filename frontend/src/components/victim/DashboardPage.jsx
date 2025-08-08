import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get victim user from location state or use default
  const currentVictimUser = location.state?.victimUser || { username: '山田太郎' };

  // Logout handler
  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div style={styles.page}>
      {/* Header with user info and logout */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>被災者向けダッシュボード / Victim Dashboard</h1>
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
        <h2 style={styles.title}>被災者向けダッシュボード</h2>
        <p style={styles.welcomeText}>ようこそ、{currentVictimUser?.username}さん！</p>
        <p style={styles.description}>物資要請の状況がここに表示されます。</p>
        
        <nav style={styles.navigation}>
          <Link to="/victim/request">
            <button style={styles.navButton}>物資を要請する</button>
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
            <button style={styles.navButton}>基本情報登録・変更</button>
          </a>
        </nav>
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
  },
  title: {
    margin: 0,
    marginBottom: 16,
    fontSize: 28,
    color: '#BF0000',
    fontWeight: 800,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000000',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666666',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '12px 24px',
    backgroundColor: '#BF0000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default DashboardPage;