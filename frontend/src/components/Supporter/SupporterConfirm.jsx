import { useLocation, useNavigate } from 'react-router-dom';

export default function SupporterConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];

  // Get supporter user from location state or use default
  const currentSupporterUser = location.state?.supporterUser || { username: 'Supporter' }

  // Logout handler
  const handleLogout = () => {
    navigate('/supporter/login')
  }

  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formattedItem = selectedItems.map( (item, index) => 
    (
      {
        item_id: item.item_id,
        amount: item.quantity
      }
    )
  )

  const handleConfirm = async () => {

    try {
      const res = await fetch('http://localhost:8000/supporter/products/confirm/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedItem),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.detail || 'ERROR')
        return
      }
      navigate('/supporter/status?status=success') // success → go to supporter page

    } catch (err) {
      setError('Network error')
    }
  }


  const handleBack = () => {
    navigate('/supporter/request')
  }

  return (
    <div style={styles.page}>
      {/* Header with user info and logout */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>支援内容の確認 / Confirm Support</h1>
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

      <div style={styles.container}>
        {selectedItems.length === 0 ? (
          <p style={styles.empty}>選択された商品がありません。</p>
        ) : (
          <div style={styles.list}>
            {selectedItems.map((item) => (
              <div key={item.product_id} style={styles.itemRow}>
                <span style={styles.itemName}>{item.name}</span>
                <span style={styles.itemQty}>{item.quantity}個</span>
              </div>
            ))}
            <div style={styles.totalRow}>
              合計金額: <strong style={{ color: '#000' }}>{yen(total)}</strong>
            </div>
          </div>
        )}

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
  );
}

function yen(n) {
  try {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(n)
  } catch {
    return `¥${Number(n || 0).toLocaleString()}`
  }
}

const styles = {
  page: {
    minHeight: '100vh', 
    backgroundColor: '#BF0000', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    padding: 32,
  },
  header: {
    width: '100%',
    maxWidth: 600,
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
    fontWeight: 700,
    color: '#BF0000',
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
  container: {
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 24, 
    width: '100%', 
    maxWidth: 600,
  },
  empty: {
    color: '#000', 
    textAlign: 'center'
  },
  list: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: 12,
  },
  itemRow: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    fontSize: 16, 
    padding: 8, 
    borderBottom: '1px solid #ccc', 
    color: '#000',
  },
  itemName: {
    fontWeight: 600,
  },
  itemQty: {
    fontWeight: 500,
  },
  totalRow: {
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: 700, 
    textAlign: 'right', 
    color: '#000',
  },
  actions: {
    marginTop: 32, 
    display: 'flex', 
    justifyContent: 'center', 
    gap: 16,
  },
  primaryBtn: {
    padding: '12px 24px', 
    backgroundColor: '#BF0000', 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 700, 
    border: 'none', 
    borderRadius: 8, 
    cursor: 'pointer'
  },
  secondaryBtn: {
    padding: '12px 24px', 
    backgroundColor: '#fff', 
    color: '#BF0000', 
    fontSize: 16, 
    fontWeight: 700, 
    border: '2px solid #BF0000', 
    borderRadius: 8, 
    cursor: 'pointer'
  },
};
