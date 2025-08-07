import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function yen(n) {
  try {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(n)
  } catch {
    return `¥${Number(n || 0).toLocaleString()}`
  }
}

export default function SupporterReq() {
  const navigate = useNavigate()
  const location = useLocation()
  const [items, setItems] = useState([])
  const [quantities, setQuantities] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Get supporter user from location state or use default
  const currentSupporterUser = location.state?.supporterUser || { username: 'Supporter' }

  // Logout handler
  const handleLogout = () => {
    navigate('/supporter/login')
  }

  useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('http://localhost:8000/supporter/products/summary')
        if (!res.ok) throw new Error(await res.text() || 'Failed to load products')
        const data = await res.json()
        if (!ignore) {
          setItems(Array.isArray(data) ? data : [])
          const defaultQuantities = Object.fromEntries(data.map(p => [p.product_id, 0]))
          setQuantities(defaultQuantities)
        }
      } catch (e) {
        if (!ignore) setError('データの取得に失敗しました。時間をおいて再度お試しください。')
        console.error(e)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => { ignore = true }
  }, [])

  const changeQuantity = (productId, delta) => {
    setQuantities(q => ({
      ...q,
      [productId]: Math.max(0, (q[productId] || 0) + delta)
    }))
  }

  const handleToConfirm = () => {
    const selectedItems = items
      .filter(item => quantities[item.product_id] > 0)
      .map(item => ({
        name: item.name,
        quantity: quantities[item.product_id],
        item_id: item.product_id,
        price: item.price,
        total: item.price * quantities[item.product_id]
      }))
      console.log("Selected items:", selectedItems);
    navigate('/supporter/confirm', { state: { selectedItems } })
  }

  return (
    <div style={styles.page}>
      {/* Header with user info and logout */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>支援者ページ / Supporter Page</h1>
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
        <p style={styles.helperText}>必要な物資の一覧です。各商品の現在価格とリクエスト数を表示しています。</p>

        {loading && <div style={styles.loader}>読み込み中...</div>}
        {error && <div style={styles.error}>{error}</div>}

        {!loading && !error && (
          <>
            <div style={styles.grid}>
              {items.map((p) => {
                const qty = quantities[p.product_id] || 0
                const totalCost = p.price * qty
                return (
                  <div key={p.product_id} style={styles.card}>
                    <div style={styles.imageWrap}>
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} style={styles.image} />
                      ) : (
                        <div style={styles.imagePlaceholder}>No Image</div>
                      )}
                    </div>
                    <div style={styles.cardBody}>
                      <div style={styles.name}>{p.name}</div>
                      <div style={styles.metaRowRight}>
                        <div style={styles.price}>{yen(p.price)}</div>
                        <div style={styles.requests}>リクエスト数: <strong>{p.total_requests ?? 0}</strong></div>
                      </div>
                      <div style={styles.totalCost}>合計: {yen(totalCost)}</div>
                      <div style={styles.qtyRow}>
                        <button style={styles.qtyBtn} onClick={() => changeQuantity(p.product_id, -1)}>-</button>
                        <span style={styles.qtyValue}>{qty}</span>
                        <button style={styles.qtyBtn} onClick={() => changeQuantity(p.product_id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button style={styles.primaryBtn} onClick={handleToConfirm}>支援に進む</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#BF0000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px',
  },
  header: {
    width: '100%',
    maxWidth: 1000,
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
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    width: '100%', 
    maxWidth: 1000,
  },
  helperText: {
    color: '#808080', 
    fontSize: 13, 
    textAlign: 'center', 
    marginTop: 8, 
    marginBottom: 16,
  },
  loader: {
    background: '#fff', 
    color: '#000', 
    borderRadius: 12, 
    padding: '16px', 
    textAlign: 'center',
  },
  error: {
    background: '#fff', 
    color: '#000', 
    borderRadius: 12, 
    padding: '16px', 
    textAlign: 'center', 
    border: '1px solid #000',
  },
  grid: {
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    overflow: 'hidden', 
    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.08)', 
    display: 'flex', 
    flexDirection: 'column',
  },
  imageWrap: {
    background: '#f6f6f6', 
    height: 160, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  image: {
    maxHeight: '100%', 
    maxWidth: '100%', 
    objectFit: 'contain',
  },
  imagePlaceholder: {
    color: '#808080', 
    fontSize: 12,
  },
  cardBody: {
    padding: 16,
  },
  name: {
    color: '#000000', 
    fontWeight: 700, 
    fontSize: 16, 
    lineHeight: 1.4, 
    marginBottom: 10,
  },
  metaRowRight: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-end', 
    gap: 4, 
    marginBottom: 8,
  },
  price: {
    color: '#000000', 
    fontSize: 16, 
    fontWeight: 700,
  },
  requests: {
    color: '#000000', 
    fontSize: 13,
  },
  totalCost: {
    fontSize: 14, 
    fontWeight: 600, 
    marginBottom: 8, 
    color: '#000',
  },
  qtyRow: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 12,
  },
  qtyBtn: {
    width: 40, 
    height: 40, 
    fontSize: 20, 
    fontWeight: 'bold', 
    backgroundColor: '#BF0000', 
    color: '#fff', 
    border: 'none', 
    borderRadius: 8, 
    cursor: 'pointer', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  qtyValue: {
    fontSize: 16, 
    fontWeight: 600, 
    color: '#000',
  },
  primaryBtn: {
    padding: '14px 24px', 
    backgroundColor: '#FFFFFF', 
    color: '#BF0000', 
    border: '2px solid #BF0000', 
    borderRadius: 10, 
    fontSize: 18, 
    fontWeight: 800, 
    cursor: 'pointer',
  },
}
