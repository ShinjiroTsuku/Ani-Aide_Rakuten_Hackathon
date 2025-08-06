import { useState } from 'react'
import './AdminShelters.css'

function AdminShelters() {
  const [shelters, setShelters] = useState([
    {
      id: 1,
      name: '避難所A',
      address: '東京都渋谷区1-1-1',
      capacity: 200,
      currentOccupants: 150,
      contact: '03-1234-5678',
      status: 'active',
      manager: '田中太郎',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: '避難所B',
      address: '東京都新宿区2-2-2',
      capacity: 150,
      currentOccupants: 120,
      contact: '03-2345-6789',
      status: 'active',
      manager: '佐藤花子',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: '避難所C',
      address: '東京都港区3-3-3',
      capacity: 100,
      currentOccupants: 80,
      contact: '03-3456-7890',
      status: 'maintenance',
      manager: '鈴木一郎',
      lastUpdated: '2024-01-13'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [newShelter, setNewShelter] = useState({
    name: '',
    address: '',
    capacity: '',
    contact: '',
    manager: ''
  })

  const handleAddShelter = (e) => {
    e.preventDefault()
    const shelter = {
      id: shelters.length + 1,
      ...newShelter,
      capacity: parseInt(newShelter.capacity),
      currentOccupants: 0,
      status: 'active',
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setShelters([...shelters, shelter])
    setNewShelter({ name: '', address: '', capacity: '', contact: '', manager: '' })
    setShowAddForm(false)
  }

  const handleStatusChange = (shelterId, newStatus) => {
    setShelters(shelters.map(shelter => 
      shelter.id === shelterId ? { ...shelter, status: newStatus } : shelter
    ))
  }

  const filteredShelters = shelters.filter(shelter => {
    const matchesStatus = filterStatus === 'all' || shelter.status === filterStatus
    const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelter.address.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'status-active'
      case 'maintenance': return 'status-maintenance'
      case 'closed': return 'status-closed'
      default: return 'status-default'
    }
  }

  const getOccupancyClass = (current, capacity) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return 'occupancy-high'
    if (percentage >= 70) return 'occupancy-medium'
    return 'occupancy-low'
  }

  return (
    <div className="admin-shelters">
      <div className="shelters-header">
        <h2>避難所管理 / Shelter Management</h2>
        <div className="header-actions">
          <button 
            className="btn-add"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'キャンセル' : '+ 避難所追加'}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-shelter-form">
          <h3>新しい避難所を追加 / Add New Shelter</h3>
          <form onSubmit={handleAddShelter}>
            <div className="form-row">
              <div className="form-group">
                <label>避難所名 / Shelter Name</label>
                <input
                  type="text"
                  value={newShelter.name}
                  onChange={(e) => setNewShelter({...newShelter, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>住所 / Address</label>
                <input
                  type="text"
                  value={newShelter.address}
                  onChange={(e) => setNewShelter({...newShelter, address: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>収容人数 / Capacity</label>
                <input
                  type="number"
                  value={newShelter.capacity}
                  onChange={(e) => setNewShelter({...newShelter, capacity: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>連絡先 / Contact</label>
                <input
                  type="text"
                  value={newShelter.contact}
                  onChange={(e) => setNewShelter({...newShelter, contact: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>管理者 / Manager</label>
              <input
                type="text"
                value={newShelter.manager}
                onChange={(e) => setNewShelter({...newShelter, manager: e.target.value})}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-save">保存 / Save</button>
              <button type="button" className="btn-cancel" onClick={() => setShowAddForm(false)}>
                キャンセル / Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
          <option value="active">活動中 / Active</option>
          <option value="maintenance">メンテナンス / Maintenance</option>
          <option value="closed">閉鎖 / Closed</option>
        </select>
      </div>

      <div className="shelters-grid">
        {filteredShelters.map(shelter => (
          <div key={shelter.id} className="shelter-card">
            <div className="shelter-header">
              <h3>{shelter.name}</h3>
              <span className={`status-badge ${getStatusClass(shelter.status)}`}>
                {shelter.status === 'active' ? '活動中' : 
                 shelter.status === 'maintenance' ? 'メンテナンス' : '閉鎖'}
              </span>
            </div>
            
            <div className="shelter-info">
              <p><strong>住所:</strong> {shelter.address}</p>
              <p><strong>管理者:</strong> {shelter.manager}</p>
              <p><strong>連絡先:</strong> {shelter.contact}</p>
            </div>

            <div className="occupancy-info">
              <div className="occupancy-bar">
                <div 
                  className={`occupancy-fill ${getOccupancyClass(shelter.currentOccupants, shelter.capacity)}`}
                  style={{width: `${(shelter.currentOccupants / shelter.capacity) * 100}%`}}
                ></div>
              </div>
              <p className="occupancy-text">
                {shelter.currentOccupants} / {shelter.capacity} 人
              </p>
            </div>

            <div className="shelter-actions">
              <select
                value={shelter.status}
                onChange={(e) => handleStatusChange(shelter.id, e.target.value)}
                className="status-select"
              >
                <option value="active">活動中</option>
                <option value="maintenance">メンテナンス</option>
                <option value="closed">閉鎖</option>
              </select>
              <button className="btn-edit">編集</button>
              <button className="btn-details">詳細</button>
            </div>

            <div className="shelter-footer">
              <small>最終更新: {shelter.lastUpdated}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="shelters-summary">
        <div className="summary-card">
          <h3>避難所統計 / Shelter Statistics</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{shelters.length}</span>
              <span className="stat-label">総避難所数</span>
            </div>
            <div className="stat">
              <span className="stat-number">{shelters.filter(s => s.status === 'active').length}</span>
              <span className="stat-label">活動中</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {shelters.reduce((sum, s) => sum + s.currentOccupants, 0)}
              </span>
              <span className="stat-label">総収容者数</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminShelters 