import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RFQList.css';

const RFQList = () => {
  const navigate = useNavigate();
  const [rfqs, setRFQs] = useState([]);
  const [filteredRFQs, setFilteredRFQs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    dateRange: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRFQData();
  }, []);

  const fetchRFQData = () => {
    setTimeout(() => {
      const mockRFQs = [
        {
          id: 'RFQ-2025-001',
          title: 'מחשבים נישאים לצוות הפיתוח',
          description: '15 מחשבים נישאים עם מפרט טכני מתקדם',
          status: 'פתוח',
          priority: 'גבוה',
          createdDate: '2025-01-20',
          dueDate: '2025-02-05',
          suppliers: ['טכנולוגיות מתקדמות בע"מ', 'סמארט טק פתרונות'],
          quotesReceived: 2,
          totalSuppliers: 3,
          estimatedValue: 75000,
          category: 'מחשבים',
          creator: 'דני כהן'
        },
        {
          id: 'RFQ-2025-002',
          title: 'ציוד רשת ותקשורת',
          description: 'מתגים, נתבים וציוד תקשורת למשרד חדש',
          status: 'ממתין להצעות',
          priority: 'בינוני',
          createdDate: '2025-01-18',
          dueDate: '2025-02-10',
          suppliers: ['רכיבים ומערכות בע"מ'],
          quotesReceived: 1,
          totalSuppliers: 4,
          estimatedValue: 45000,
          category: 'רשתות',
          creator: 'שרה לוי'
        },
        {
          id: 'RFQ-2025-003',
          title: 'ריהוט משרדי',
          description: 'שולחנות, כיסאות וארונות למשרד החדש',
          status: 'סגור',
          priority: 'נמוך',
          createdDate: '2025-01-10',
          dueDate: '2025-01-25',
          suppliers: ['ריהוט אופיס בע"מ', 'עיצוב ונוחות'],
          quotesReceived: 2,
          totalSuppliers: 2,
          estimatedValue: 35000,
          category: 'ריהוט',
          creator: 'מיכאל דוד'
        },
        {
          id: 'RFQ-2025-004',
          title: 'תוכנות וליסינסים',
          description: 'רישיונות תוכנה ושירותי מחשוב ענן',
          status: 'בהכנה',
          priority: 'גבוה',
          createdDate: '2025-01-22',
          dueDate: '2025-02-15',
          suppliers: [],
          quotesReceived: 0,
          totalSuppliers: 0,
          estimatedValue: 120000,
          category: 'תוכנה',
          creator: 'רחל אברהם'
        }
      ];

      setRFQs(mockRFQs);
      setFilteredRFQs(mockRFQs);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let filtered = rfqs.filter(rfq => {
      const matchesSearch = filters.search === '' || 
        rfq.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        rfq.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        rfq.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === '' || rfq.status === filters.status;
      const matchesPriority = filters.priority === '' || rfq.priority === filters.priority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    setFilteredRFQs(filtered);
  }, [filters, rfqs]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'פתוח': { text: 'פתוח', class: 'status-open' },
      'ממתין להצעות': { text: 'ממתין להצעות', class: 'status-waiting' },
      'סגור': { text: 'סגור', class: 'status-closed' },
      'בהכנה': { text: 'בהכנה', class: 'status-draft' }
    };
    return statusMap[status] || { text: status, class: 'status-default' };
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'גבוה': { text: 'גבוה', class: 'priority-high' },
      'בינוני': { text: 'בינוני', class: 'priority-medium' },
      'נמוך': { text: 'נמוך', class: 'priority-low' }
    };
    return priorityMap[priority] || { text: priority, class: 'priority-default' };
  };

  const handleCreateRFQ = () => {
    navigate('/rfq/create');
  };

  const handleViewRFQ = (rfqId) => {
    navigate(`/rfq/view/${rfqId}`);
  };

  const handleCompareRFQ = (rfqId) => {
    navigate(`/rfq/compare/${rfqId}`);
  };

  const handleEditRFQ = (rfqId) => {
    navigate(`/rfq/edit/${rfqId}`);
  };

  const handleExportToExcel = () => {
    const csvContent = generateCSVContent();
    downloadCSV(csvContent, 'rfq-list.csv');
  };

  const generateCSVContent = () => {
    const headers = ['מספר RFQ', 'כותרת', 'תיאור', 'סטטוס', 'עדיפות', 'תאריך יצירה', 'תאריך יעד', 'ספקים', 'הצעות התקבלו', 'שווי משוער', 'קטגוריה', 'יוצר'];
    const rows = filteredRFQs.map(rfq => [
      rfq.id,
      rfq.title,
      rfq.description,
      rfq.status,
      rfq.priority,
      rfq.createdDate,
      rfq.dueDate,
      rfq.totalSuppliers,
      rfq.quotesReceived,
      rfq.estimatedValue,
      rfq.category,
      rfq.creator
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDuplicateRFQ = (rfqId) => {
    const rfq = rfqs.find(r => r.id === rfqId);
    if (rfq) {
      const newRFQ = {
        ...rfq,
        id: `RFQ-2025-${String(rfqs.length + 1).padStart(3, '0')}`,
        status: 'בהכנה',
        createdDate: new Date().toISOString().split('T')[0],
        quotesReceived: 0,
        suppliers: []
      };
      setRFQs(prev => [...prev, newRFQ]);
      alert(`בקשת RFQ שוכפלה בהצלחה. מספר חדש: ${newRFQ.id}`);
    }
  };

  const handleSendReminder = (rfqId) => {
    const rfq = rfqs.find(r => r.id === rfqId);
    if (rfq) {
      alert(`תזכורת נשלחה ל-${rfq.totalSuppliers} ספקים עבור ${rfq.id}`);
    }
  };

  const handleDeleteRFQ = (rfqId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את בקשת RFQ זו?')) {
      setRFQs(prev => prev.filter(r => r.id !== rfqId));
      alert('בקשת RFQ נמחקה בהצלחה');
    }
  };

  const handleStatCardClick = (filterType) => {
    switch (filterType) {
      case 'all':
        setFilters({ search: '', status: '', priority: '', dateRange: '' });
        break;
      case 'open':
        setFilters(prev => ({ ...prev, status: 'פתוח', search: '', priority: '', dateRange: '' }));
        break;
      case 'waiting':
        setFilters(prev => ({ ...prev, status: 'ממתין להצעות', search: '', priority: '', dateRange: '' }));
        break;
      case 'value':
        // Sort by highest estimated value
        const sortedByValue = [...filteredRFQs].sort((a, b) => b.estimatedValue - a.estimatedValue);
        setFilteredRFQs(sortedByValue);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="rfq-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin fa-3x text-primary"></i>
          <p className="mt-3">טוען בקשות להצעת מחיר...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rfq-container">
      <div className="rfq-header">
        <div className="header-content">
          <div className="page-title">
            <h2>בקשות להצעת מחיר (RFQ)</h2>
            <nav className="breadcrumb">
              <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">בקשות להצעת מחיר</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleExportToExcel}>
              <i className="fas fa-download me-2"></i>
              ייצוא לאקסל
            </button>
            <button className="btn btn-primary" onClick={handleCreateRFQ}>
              <i className="fas fa-plus me-2"></i>
              בקשה חדשה
            </button>
          </div>
        </div>
      </div>

      <div className="rfq-stats">
        <div className="stats-grid">
          <div className="stat-card clickable" onClick={() => handleStatCardClick('all')} title="הצג את כל הבקשות">
            <div className="stat-icon bg-primary">
              <i className="fas fa-file-invoice"></i>
            </div>
            <div className="stat-content">
              <h4>{rfqs.length}</h4>
              <p>סך בקשות</p>
            </div>
          </div>
          <div className="stat-card clickable" onClick={() => handleStatCardClick('open')} title="הצג בקשות פתוחות">
            <div className="stat-icon bg-success">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h4>{rfqs.filter(r => r.status === 'פתוח').length}</h4>
              <p>בקשות פתוחות</p>
            </div>
          </div>
          <div className="stat-card clickable" onClick={() => handleStatCardClick('waiting')} title="הצג בקשות הממתינות להצעות">
            <div className="stat-icon bg-warning">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h4>{rfqs.filter(r => r.status === 'ממתין להצעות').length}</h4>
              <p>ממתין להצעות</p>
            </div>
          </div>
          <div className="stat-card clickable" onClick={() => handleStatCardClick('value')} title="מיין לפי שווי גבוה">
            <div className="stat-icon bg-info">
              <i className="fas fa-shekel-sign"></i>
            </div>
            <div className="stat-content">
              <h4>₪{rfqs.reduce((sum, r) => sum + r.estimatedValue, 0).toLocaleString()}</h4>
              <p>שווי משוער</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rfq-filters">
        <div className="filters-card">
          <div className="filters-grid">
            <div className="filter-group">
              <label>חיפוש</label>
              <div className="search-input">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="חפש לפי מספר, כותרת או תיאור..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>סטטוס</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">הכל</option>
                <option value="בהכנה">בהכנה</option>
                <option value="פתוח">פתוח</option>
                <option value="ממתין להצעות">ממתין להצעות</option>
                <option value="סגור">סגור</option>
              </select>
            </div>
            <div className="filter-group">
              <label>עדיפות</label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="">הכל</option>
                <option value="גבוה">גבוה</option>
                <option value="בינוני">בינוני</option>
                <option value="נמוך">נמוך</option>
              </select>
            </div>
            <div className="filter-group">
              <button 
                className="btn btn-secondary"
                onClick={() => setFilters({ search: '', status: '', priority: '', dateRange: '' })}
              >
                <i className="fas fa-redo me-2"></i>
                נקה סינון
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rfq-list">
        <div className="list-header">
          <h5>רשימת בקשות ({filteredRFQs.length})</h5>
          <div className="view-options">
            <button className="btn btn-sm btn-outline-secondary active">
              <i className="fas fa-list"></i>
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="fas fa-th-large"></i>
            </button>
          </div>
        </div>

        <div className="rfq-cards">
          {filteredRFQs.map(rfq => (
            <div key={rfq.id} className="rfq-card">
              <div className="card-header">
                <div className="rfq-id-title">
                  <h6 className="rfq-id">{rfq.id}</h6>
                  <h5 className="rfq-title">{rfq.title}</h5>
                </div>
                <div className="card-badges">
                  <span className={`status-badge ${getStatusBadge(rfq.status).class}`}>
                    {getStatusBadge(rfq.status).text}
                  </span>
                  <span className={`priority-badge ${getPriorityBadge(rfq.priority).class}`}>
                    {getPriorityBadge(rfq.priority).text}
                  </span>
                </div>
              </div>

              <div className="card-content">
                <p className="rfq-description">{rfq.description}</p>
                
                <div className="rfq-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <i className="fas fa-calendar-alt me-2"></i>
                      <span>נוצר: {rfq.createdDate}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-clock me-2"></i>
                      <span>תאריך יעד: {rfq.dueDate}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-item">
                      <i className="fas fa-building me-2"></i>
                      <span>ספקים: {rfq.quotesReceived}/{rfq.totalSuppliers}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-shekel-sign me-2"></i>
                      <span>שווי משוער: ₪{rfq.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-item">
                      <i className="fas fa-user me-2"></i>
                      <span>יוצר: {rfq.creator}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-tag me-2"></i>
                      <span>קטגוריה: {rfq.category}</span>
                    </div>
                  </div>
                </div>

                {rfq.quotesReceived > 0 && (
                  <div className="quotes-progress">
                    <div className="progress-header">
                      <span>התקדמות הצעות מחיר</span>
                      <span>{Math.round((rfq.quotesReceived / rfq.totalSuppliers) * 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{width: `${(rfq.quotesReceived / rfq.totalSuppliers) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="card-actions">
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleViewRFQ(rfq.id)}
                  title="צפייה"
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleEditRFQ(rfq.id)}
                  title="עריכה"
                  disabled={rfq.status === 'סגור'}
                >
                  <i className="fas fa-edit"></i>
                </button>
                {rfq.quotesReceived > 1 && (
                  <button 
                    className="btn btn-sm btn-outline-success"
                    onClick={() => handleCompareRFQ(rfq.id)}
                    title="השווה הצעות"
                  >
                    <i className="fas fa-balance-scale"></i>
                  </button>
                )}
                <div className="dropdown">
                  <button 
                    className="btn btn-sm btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => handleDuplicateRFQ(rfq.id)}>שכפל בקשה</button></li>
                    <li><button className="dropdown-item" onClick={() => handleSendReminder(rfq.id)} disabled={rfq.totalSuppliers === 0}>שלח תזכורת</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={() => handleDeleteRFQ(rfq.id)}>מחק בקשה</button></li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRFQs.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-file-invoice fa-3x text-muted mb-3"></i>
            <h5>לא נמצאו בקשות להצעת מחיר</h5>
            <p>לא נמצאו בקשות התואמות לקריטריונים שנבחרו</p>
            <button className="btn btn-primary" onClick={handleCreateRFQ}>
              <i className="fas fa-plus me-2"></i>
              צור בקשה חדשה
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RFQList;