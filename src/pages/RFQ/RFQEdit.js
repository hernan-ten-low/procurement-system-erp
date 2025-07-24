import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RFQEdit.css';

const RFQEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackToList = () => {
    navigate('/rfq');
  };

  const handleViewRFQ = () => {
    navigate(`/rfq/view/${id}`);
  };

  return (
    <div className="rfq-edit-container">
      <div className="rfq-edit-header">
        <div className="header-content">
          <div className="page-title">
            <h2>עריכת בקשת RFQ - {id}</h2>
            <nav className="breadcrumb">
              <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span onClick={() => navigate('/rfq')} style={{cursor: 'pointer'}}>בקשות להצעת מחיר</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">עריכת {id}</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleBackToList}>
              <i className="fas fa-arrow-right me-2"></i>
              חזרה לרשימה
            </button>
            <button className="btn btn-outline-info" onClick={handleViewRFQ}>
              <i className="fas fa-eye me-2"></i>
              צפייה
            </button>
          </div>
        </div>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-card">
          <div className="placeholder-icon">
            <i className="fas fa-edit fa-4x text-warning"></i>
          </div>
          <h3>עריכת בקשת RFQ</h3>
          <p>מסך זה יכלול:</p>
          <ul className="feature-list">
            <li><i className="fas fa-check text-success me-2"></i>עריכת פרטי הבקשה</li>
            <li><i className="fas fa-check text-success me-2"></i>הוספה/הסרה של מוצרים</li>
            <li><i className="fas fa-check text-success me-2"></i>עדכון רשימת ספקים</li>
            <li><i className="fas fa-check text-success me-2"></i>שינוי תנאים ומועדים</li>
            <li><i className="fas fa-check text-success me-2"></i>עדכון מסמכים</li>
            <li><i className="fas fa-check text-success me-2"></i>שמירת היסטוריית שינויים</li>
            <li><i className="fas fa-check text-success me-2"></i>שליחת עדכונים לספקים</li>
          </ul>
          <div className="placeholder-actions">
            <button className="btn btn-primary" onClick={handleBackToList}>
              <i className="fas fa-list me-2"></i>
              חזרה לרשימת RFQ
            </button>
            <button className="btn btn-outline-info" onClick={handleViewRFQ}>
              <i className="fas fa-eye me-2"></i>
              צפייה בבקשה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQEdit;