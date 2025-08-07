import { useState } from 'react'
import './AdminRequests.css'

function AdminRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      shelter: '避難所A',
      item: 'ペットフード',
      quantity: '10kg',
      status: 'pending',
      date: '2024-01-15',
      priority: 'high',
      description: 'ペット用の食料が必要です',
      contact: '田中太郎',
      phone: '090-1234-5678',
      address: '東京都渋谷区1-1-1',
      notes: '緊急のため早めの対応をお願いします'
    },
    {
      id: 2,
      shelter: '避難所B',
      item: '薬品',
      quantity: '5箱',
      status: 'completed',
      date: '2024-01-14',
      priority: 'medium',
      description: '薬が必要です',
      contact: '佐藤花子',
      phone: '080-9876-5432',
      address: '大阪府大阪市2-2-2',
      notes: '定期的な服用が必要です'
    },
    {
      id: 3,
      shelter: '避難所C',
      item: '衛生用品',
      quantity: '20個',
      status: 'in-progress',
      date: '2024-01-13',
      priority: 'low',
      description: '歯ブラシと歯磨き粉が必要です',
      contact: '山田次郎',
      phone: '070-5555-1234',
      address: '福岡県福岡市3-3-3',
      notes: '子供用の歯ブラシも含めてください'
    }
  ])

  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [editForm, setEditForm] = useState({})

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ))
  }

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setShowDetailsModal(true)
  }

  const handleEdit = (request) => {
    setSelectedRequest(request)
    setEditForm({ ...request })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    setRequests(requests.map(req => 
      req.id === editForm.id ? editForm : req
    ))
    setShowEditModal(false)
    setSelectedRequest(null)
    setEditForm({})
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setSelectedRequest(null)
    setEditForm({})
  }

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    const matchesSearch = request.shelter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.item.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'in-progress': return 'status-progress'
      case 'completed': return 'status-completed'
      default: return 'status-default'
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return 'priority-default'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return '高'
      case 'medium': return '中'
      case 'low': return '低'
      default: return priority
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return '待機中'
      case 'in-progress': return '進行中'
      case 'completed': return '完了'
      default: return status
    }
  }

  return (
    <div className="admin-requests">
      <div className="requests-header">
        <h2>要請管理 / Request Management</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="検索... / Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">すべて / All</option>
            <option value="pending">待機中 / Pending</option>
            <option value="in-progress">進行中 / In Progress</option>
            <option value="completed">完了 / Completed</option>
          </select>
        </div>
      </div>

      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>避難所 / Shelter</th>
              <th>物品 / Item</th>
              <th>数量 / Quantity</th>
              <th>優先度 / Priority</th>
              <th>状態 / Status</th>
              <th>日付 / Date</th>
              <th>操作 / Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.shelter}</td>
                <td>
                  <div>
                    <strong>{request.item}</strong>
                    <p className="description">{request.description}</p>
                  </div>
                </td>
                <td>{request.quantity}</td>
                <td>
                  <span className={`priority-badge ${getPriorityClass(request.priority)}`}>
                    {getPriorityLabel(request.priority)}
                  </span>
                </td>
                <td>
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    className={`status-select ${getStatusBadgeClass(request.status)}`}
                  >
                    <option value="pending">待機中</option>
                    <option value="in-progress">進行中</option>
                    <option value="completed">完了</option>
                  </select>
                </td>
                <td>{request.date}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-view"
                      onClick={() => handleViewDetails(request)}
                    >
                      詳細
                    </button>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(request)}
                    >
                      編集
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="requests-summary">
        <div className="summary-card">
          <h3>統計 / Statistics</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{requests.filter(r => r.status === 'pending').length}</span>
              <span className="stat-label">待機中</span>
            </div>
            <div className="stat">
              <span className="stat-number">{requests.filter(r => r.status === 'in-progress').length}</span>
              <span className="stat-label">進行中</span>
            </div>
            <div className="stat">
              <span className="stat-number">{requests.filter(r => r.status === 'completed').length}</span>
              <span className="stat-label">完了</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>要請詳細 / Request Details</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="details-grid">
                <div className="detail-item">
                  <label>ID:</label>
                  <span>{selectedRequest.id}</span>
                </div>
                <div className="detail-item">
                  <label>避難所 / Shelter:</label>
                  <span>{selectedRequest.shelter}</span>
                </div>
                <div className="detail-item">
                  <label>物品 / Item:</label>
                  <span>{selectedRequest.item}</span>
                </div>
                <div className="detail-item">
                  <label>数量 / Quantity:</label>
                  <span>{selectedRequest.quantity}</span>
                </div>
                <div className="detail-item">
                  <label>優先度 / Priority:</label>
                  <span className={`priority-badge ${getPriorityClass(selectedRequest.priority)}`}>
                    {getPriorityLabel(selectedRequest.priority)}
                  </span>
                </div>
                <div className="detail-item">
                  <label>状態 / Status:</label>
                  <span className={`status-badge ${getStatusBadgeClass(selectedRequest.status)}`}>
                    {getStatusLabel(selectedRequest.status)}
                  </span>
                </div>
                <div className="detail-item">
                  <label>日付 / Date:</label>
                  <span>{selectedRequest.date}</span>
                </div>
                <div className="detail-item">
                  <label>説明 / Description:</label>
                  <span>{selectedRequest.description}</span>
                </div>
                <div className="detail-item">
                  <label>担当者 / Contact:</label>
                  <span>{selectedRequest.contact}</span>
                </div>
                <div className="detail-item">
                  <label>電話番号 / Phone:</label>
                  <span>{selectedRequest.phone}</span>
                </div>
                <div className="detail-item">
                  <label>住所 / Address:</label>
                  <span>{selectedRequest.address}</span>
                </div>
                <div className="detail-item full-width">
                  <label>備考 / Notes:</label>
                  <span>{selectedRequest.notes}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-edit"
                onClick={() => {
                  setShowDetailsModal(false)
                  handleEdit(selectedRequest)
                }}
              >
                編集 / Edit
              </button>
              <button 
                className="btn-cancel"
                onClick={() => setShowDetailsModal(false)}
              >
                閉じる / Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedRequest && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>要請編集 / Edit Request</h3>
              <button 
                className="modal-close"
                onClick={handleCancelEdit}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="edit-form">
                <div className="form-group">
                  <label>避難所 / Shelter:</label>
                  <input
                    type="text"
                    value={editForm.shelter || ''}
                    onChange={(e) => handleInputChange('shelter', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>物品 / Item:</label>
                  <input
                    type="text"
                    value={editForm.item || ''}
                    onChange={(e) => handleInputChange('item', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>数量 / Quantity:</label>
                  <input
                    type="text"
                    value={editForm.quantity || ''}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>優先度 / Priority:</label>
                  <select
                    value={editForm.priority || ''}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    <option value="high">高 / High</option>
                    <option value="medium">中 / Medium</option>
                    <option value="low">低 / Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>状態 / Status:</label>
                  <select
                    value={editForm.status || ''}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="pending">待機中 / Pending</option>
                    <option value="in-progress">進行中 / In Progress</option>
                    <option value="completed">完了 / Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>日付 / Date:</label>
                  <input
                    type="date"
                    value={editForm.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>説明 / Description:</label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>担当者 / Contact:</label>
                  <input
                    type="text"
                    value={editForm.contact || ''}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>電話番号 / Phone:</label>
                  <input
                    type="text"
                    value={editForm.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>住所 / Address:</label>
                  <input
                    type="text"
                    value={editForm.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>備考 / Notes:</label>
                  <textarea
                    value={editForm.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-save"
                onClick={handleSaveEdit}
              >
                保存 / Save
              </button>
              <button 
                className="btn-cancel"
                onClick={handleCancelEdit}
              >
                キャンセル / Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRequests 