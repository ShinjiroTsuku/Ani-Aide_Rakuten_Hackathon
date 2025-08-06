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
      description: 'ペット用の食料が必要です'
    },
    {
      id: 2,
      shelter: '避難所B',
      item: '薬品',
      quantity: '5箱',
      status: 'completed',
      date: '2024-01-14',
      priority: 'medium',
      description: '高血圧の薬が必要です'
    },
    {
      id: 3,
      shelter: '避難所C',
      item: '衛生用品',
      quantity: '20個',
      status: 'in-progress',
      date: '2024-01-13',
      priority: 'low',
      description: '歯ブラシと歯磨き粉が必要です'
    }
  ])

  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ))
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
                    {request.priority === 'high' ? '高' : 
                     request.priority === 'medium' ? '中' : '低'}
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
                    <button className="btn-view">詳細</button>
                    <button className="btn-edit">編集</button>
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
    </div>
  )
}

export default AdminRequests 