import { useLocation, useNavigate } from 'react-router-dom';
import './SupporterDashboard.css';

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
    <div className="supporter-dashboard">
      {/* Main Content */}
      <div className="supporter-main-content">
        {/* Header */}
        <header className="supporter-dashboard-header">
          <div className="supporter-header-left">
            <h1>支援内容の確認 / Confirm Support</h1>
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
            <h2>支援内容の確認 / Support Confirmation</h2>
            <p>選択された商品と数量を確認してください。問題がなければ「支援を確定」ボタンを押してください。</p>

            {selectedItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>選択された商品がありません。</p>
                <p>No items selected.</p>
              </div>
            ) : (
              <div className="supporter-items-list">
                {selectedItems.map((item, index) => (
                  <div key={index} className="supporter-item-row">
                    <span style={{ fontWeight: '600', color: '#333', fontSize: '16px' }}>
                      {item.name}
                    </span>
                    <span style={{ fontWeight: '500', color: '#666', fontSize: '16px' }}>
                      {item.quantity}個 / {yen(item.total)}
                    </span>
                  </div>
                ))}
                <div className="supporter-total-row">
                  合計金額 / Total: <strong>{yen(total)}</strong>
                </div>
              </div>
            )}

            <div className="supporter-actions">
              <button 
                type="button" 
                onClick={handleConfirm} 
                className="supporter-btn-primary"
                disabled={selectedItems.length === 0}
              >
                支援を確定 / Confirm Support
              </button>
              <button 
                type="button" 
                onClick={handleBack} 
                className="supporter-btn-secondary"
              >
                戻る / Back
              </button>
            </div>
          </div>
        </main>
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
