import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './SupporterDashboard.css'

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
    <div className="supporter-dashboard">
      {/* Main Content */}
      <div className="supporter-main-content">
        {/* Header */}
        <header className="supporter-dashboard-header">
          <div className="supporter-header-left">
            <h1>支援者ページ / Supporter Page</h1>
          </div>
          <div className="supporter-user-info">
            <span>ようこそ、{currentSupporterUser?.username}さん</span>
            <button className="supporter-logout-btn" onClick={handleLogout}>
              ログアウト / Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="supporter-content-area">
          <div className="supporter-confirmation-card">
            <h2>必要な物資の選択 / Select Required Items</h2>
            <p>各商品の現在価格とリクエスト数を表示しています。支援したい商品の数量を選択してください。</p>

            {loading && (
              <div className="supporter-loading">
                <p>読み込み中... / Loading...</p>
              </div>
            )}
            
            {error && (
              <div className="supporter-error">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="supporter-products-grid">
                  {items.map((p) => {
                    const qty = quantities[p.product_id] || 0
                    const totalCost = p.price * qty
                    return (
                      <div key={p.product_id} className="supporter-product-card">
                        <div className="supporter-product-image">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} />
                          ) : (
                            <div>No Image</div>
                          )}
                        </div>
                        <div className="supporter-product-body">
                          <div className="supporter-product-name">{p.name}</div>
                          <div className="supporter-product-meta">
                            <div className="supporter-product-price">{yen(p.price)}</div>
                            <div>リクエスト数: <strong>{p.total_requests ?? 0}</strong></div>
                          </div>
                          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
                            合計: {yen(totalCost)}
                          </div>
                          <div className="supporter-quantity-controls">
                            <button 
                              className="supporter-qty-btn" 
                              onClick={() => changeQuantity(p.product_id, -1)}
                              disabled={qty === 0}
                            >
                              -
                            </button>
                            <span className="supporter-qty-value">{qty}</span>
                            <button 
                              className="supporter-qty-btn" 
                              onClick={() => changeQuantity(p.product_id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="supporter-actions">
                  <button 
                    className="supporter-btn-primary" 
                    onClick={handleToConfirm}
                    disabled={Object.values(quantities).every(q => q === 0)}
                  >
                    支援に進む / Proceed to Support
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
