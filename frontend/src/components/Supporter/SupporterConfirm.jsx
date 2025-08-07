import { useLocation, useNavigate } from 'react-router-dom';

export default function SupporterConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];

  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = () => {
    navigate('/supporter/status?status=success') // 完了ページへ
  }


  const handleBack = () => {
    navigate('/supporter/request')
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>支援内容の確認</h2>

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
    minHeight: '100vh', backgroundColor: '#BF0000', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 32,
  },
  container: {
    backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '100%', maxWidth: 600,
  },
  title: {
    fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 20,
  },
  empty: {
    color: '#000', textAlign: 'center'
  },
  list: {
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  itemRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, padding: 8, borderBottom: '1px solid #ccc', color: '#000',
  },
  itemName: {
    fontWeight: 600,
  },
  itemQty: {
    fontWeight: 500,
  },
  totalRow: {
    marginTop: 20, fontSize: 18, fontWeight: 700, textAlign: 'right', color: '#000',
  },
  actions: {
    marginTop: 32, display: 'flex', justifyContent: 'center', gap: 16,
  },
  primaryBtn: {
    padding: '12px 24px', backgroundColor: '#BF0000', color: '#fff', fontSize: 16, fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer'
  },
  secondaryBtn: {
    padding: '12px 24px', backgroundColor: '#fff', color: '#BF0000', fontSize: 16, fontWeight: 700, border: '2px solid #BF0000', borderRadius: 8, cursor: 'pointer'
  },
};
