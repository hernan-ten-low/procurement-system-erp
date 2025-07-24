import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SupplierDetail.css';

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('company');
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupplierData();
  }, [id]);

  const fetchSupplierData = () => {
    setTimeout(() => {
      setSupplier({
        id: id,
        companyName: 'חברת טכנולוגיות מתקדמות בע"מ',
        businessNumber: '515123456',
        vatNumber: '123456789',
        email: 'info@techcompany.co.il',
        phone: '03-1234567',
        website: 'www.techcompany.co.il',
        address: 'רחוב הטכנולוגיה 15, תל אביב',
        status: 'active',
        rating: 4.5,
        totalOrders: 156,
        totalAmount: 2450000,
        lastOrderDate: '2025-01-15',
        contacts: [
          { name: 'דני כהן', role: 'מנהל מכירות', email: 'danny@techcompany.co.il', phone: '050-1234567' },
          { name: 'רחל לוי', role: 'מנהלת פרויקטים', email: 'rachel@techcompany.co.il', phone: '052-7654321' }
        ],
        products: [
          { category: 'חומרה', description: 'מחשבים ואביזרים', price: '₪2,500-15,000' },
          { category: 'תוכנה', description: 'רישיונות ותמיכה', price: '₪500-5,000' }
        ],
        documents: [
          { name: 'תעודת התאגדות', date: '2023-01-15', status: 'מאושר' },
          { name: 'אישור ניהול ספרים', date: '2024-12-01', status: 'מאושר' },
          { name: 'ביטוח אחריות מקצועית', date: '2024-06-15', status: 'ממתין לעדכון' }
        ],
        history: [
          { date: '2025-01-15', type: 'הזמנה', description: 'מחשבים נישאים - 15 יחידות', amount: '₪45,000' },
          { date: '2024-12-20', type: 'תשלום', description: 'תשלום עבור הזמנה #1234', amount: '₪32,000' },
          { date: '2024-11-10', type: 'הצעת מחיר', description: 'RFQ-2024-0156', amount: '₪78,000' }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'active': { text: 'פעיל', class: 'status-active' },
      'inactive': { text: 'לא פעיל', class: 'status-inactive' },
      'pending': { text: 'ממתין לאישור', class: 'status-pending' }
    };
    return statusMap[status] || { text: status, class: 'status-default' };
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= rating ? 'text-warning' : 'text-muted'}`}
        />
      );
    }
    return stars;
  };

  const handleEditSupplier = () => {
    navigate(`/suppliers/edit/${id}`);
  };

  const handleNewQuote = () => {
    alert('יצירת הצעת מחיר חדשה - פונקציונליות תתווסף בשלב הבא');
  };

  const handleBackToList = () => {
    navigate('/suppliers');
  };

  const handleContactEdit = (contactIndex) => {
    alert(`עריכת איש קשר #${contactIndex + 1} - פונקציונליות תתווסף בשלב הבא`);
  };

  const handleContactCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleDocumentDownload = (docName) => {
    alert(`הורדת מסמך: ${docName} - פונקציונליות תתווסף בשלב הבא`);
  };

  const handleDocumentView = (docName) => {
    alert(`צפייה במסמך: ${docName} - פונקציונליות תתווסף בשלב הבא`);
  };

  if (loading) {
    return (
      <div className="supplier-detail-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin fa-3x text-primary"></i>
          <p className="mt-3">טוען פרטי ספק...</p>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="supplier-not-found">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
          <h4>ספק לא נמצא</h4>
          <p>הספק המבוקש לא נמצא במערכת</p>
          <button className="btn btn-primary" onClick={handleBackToList}>
            <i className="fas fa-arrow-right me-2"></i>
            חזרה לרשימת ספקים
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="supplier-detail-container">
      <div className="supplier-header">
        <div className="header-content">
          <div className="supplier-basic-info">
            <div className="supplier-avatar">
              <i className="fas fa-building"></i>
            </div>
            <div className="supplier-title">
              <h2>{supplier.companyName}</h2>
              <div className="supplier-meta">
                <span className={`status-badge ${getStatusBadge(supplier.status).class}`}>
                  {getStatusBadge(supplier.status).text}
                </span>
                <div className="rating-display">
                  {renderStars(supplier.rating)}
                  <span className="rating-value">({supplier.rating})</span>
                </div>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleBackToList}>
              <i className="fas fa-arrow-right me-2"></i>
              חזרה לרשימה
            </button>
            <button className="btn btn-outline-primary" onClick={handleEditSupplier}>
              <i className="fas fa-edit me-2"></i>
              עריכה
            </button>
            <button className="btn btn-primary" onClick={handleNewQuote}>
              <i className="fas fa-plus me-2"></i>
              הצעת מחיר חדשה
            </button>
          </div>
        </div>
      </div>

      <div className="supplier-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bg-primary">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-content">
              <h4>{supplier.totalOrders}</h4>
              <p>סך הזמנות</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-success">
              <i className="fas fa-shekel-sign"></i>
            </div>
            <div className="stat-content">
              <h4>₪{supplier.totalAmount.toLocaleString()}</h4>
              <p>סכום כולל</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-info">
              <i className="fas fa-calendar"></i>
            </div>
            <div className="stat-content">
              <h4>{supplier.lastOrderDate}</h4>
              <p>הזמנה אחרונה</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-warning">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-content">
              <h4>{supplier.rating}</h4>
              <p>דירוג ממוצע</p>
            </div>
          </div>
        </div>
      </div>

      <div className="supplier-tabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'company' ? 'active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              <i className="fas fa-building me-2"></i>
              פרטי חברה
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              <i className="fas fa-users me-2"></i>
              אנשי קשר
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <i className="fas fa-box me-2"></i>
              מוצרים ושירותים
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <i className="fas fa-file-alt me-2"></i>
              מסמכים
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <i className="fas fa-history me-2"></i>
              היסטוריה
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'company' && (
            <div className="tab-pane active">
              <div className="company-info-grid">
                <div className="info-card">
                  <h5><i className="fas fa-info-circle me-2"></i>פרטים כלליים</h5>
                  <div className="info-row">
                    <label>שם החברה:</label>
                    <span>{supplier.companyName}</span>
                  </div>
                  <div className="info-row">
                    <label>מספר עסק:</label>
                    <span>{supplier.businessNumber}</span>
                  </div>
                  <div className="info-row">
                    <label>מספר עמ:</label>
                    <span>{supplier.vatNumber}</span>
                  </div>
                  <div className="info-row">
                    <label>אתר אינטרנט:</label>
                    <span><a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer">{supplier.website}</a></span>
                  </div>
                </div>
                <div className="info-card">
                  <h5><i className="fas fa-phone me-2"></i>פרטי התקשרות</h5>
                  <div className="info-row">
                    <label>טלפון:</label>
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="info-row">
                    <label>אימייל:</label>
                    <span><a href={`mailto:${supplier.email}`}>{supplier.email}</a></span>
                  </div>
                  <div className="info-row">
                    <label>כתובת:</label>
                    <span>{supplier.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="tab-pane active">
              <div className="contacts-grid">
                {supplier.contacts.map((contact, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="contact-info">
                      <h6>{contact.name}</h6>
                      <p className="contact-role">{contact.role}</p>
                      <div className="contact-details">
                        <div><i className="fas fa-envelope me-2"></i>{contact.email}</div>
                        <div><i className="fas fa-phone me-2"></i>{contact.phone}</div>
                      </div>
                    </div>
                    <div className="contact-actions">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleContactEdit(index)}
                        title="עריכת איש קשר"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleContactCall(contact.phone)}
                        title="התקשר"
                      >
                        <i className="fas fa-phone"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="tab-pane active">
              <div className="products-list">
                {supplier.products.map((product, index) => (
                  <div key={index} className="product-card">
                    <div className="product-icon">
                      <i className="fas fa-box"></i>
                    </div>
                    <div className="product-info">
                      <h6>{product.category}</h6>
                      <p>{product.description}</p>
                      <span className="price-range">{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="tab-pane active">
              <div className="documents-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>שם המסמך</th>
                      <th>תאריך</th>
                      <th>סטטוס</th>
                      <th>פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplier.documents.map((doc, index) => (
                      <tr key={index}>
                        <td>
                          <i className="fas fa-file-alt me-2"></i>
                          {doc.name}
                        </td>
                        <td>{doc.date}</td>
                        <td>
                          <span className={`badge ${doc.status === 'מאושר' ? 'bg-success' : 'bg-warning'}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleDocumentDownload(doc.name)}
                            title="הורדת מסמך"
                          >
                            <i className="fas fa-download"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleDocumentView(doc.name)}
                            title="צפייה במסמך"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="tab-pane active">
              <div className="history-timeline">
                {supplier.history.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <i className={`fas ${item.type === 'הזמנה' ? 'fa-shopping-cart' : item.type === 'תשלום' ? 'fa-money-bill' : 'fa-file-invoice'}`}></i>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span className="timeline-type">{item.type}</span>
                        <span className="timeline-date">{item.date}</span>
                      </div>
                      <div className="timeline-description">{item.description}</div>
                      <div className="timeline-amount">{item.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;