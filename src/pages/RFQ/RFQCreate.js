import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RFQCreate.css';

const RFQCreate = () => {
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/rfq');
  };

  return (
    <div className="rfq-create-container">
      <div className="rfq-create-header">
        <div className="header-content">
          <div className="page-title">
            <h2>יצירת בקשה להצעת מחיר חדשה</h2>
            <nav className="breadcrumb">
              <span>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span onClick={() => navigate('/rfq')} style={{cursor: 'pointer'}}>בקשות להצעת מחיר</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">יצירת בקשה חדשה</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleBackToList}>
              <i className="fas fa-arrow-right me-2"></i>
              חזרה לרשימה
            </button>
          </div>
        </div>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-card">
          <div className="placeholder-icon">
            <i className="fas fa-file-invoice fa-4x text-primary"></i>
          </div>
          <h3>יצירת בקשה להצעת מחיר</h3>
          <p>מסך זה יכלול:</p>
          <ul className="feature-list">
            <li><i className="fas fa-check text-success me-2"></i>טופס פרטי הבקשה (כותרת, תיאור, עדיפות)</li>
            <li><i className="fas fa-check text-success me-2"></i>בחירת מוצרים וכמויות</li>
            <li><i className="fas fa-check text-success me-2"></i>בחירת ספקים לשליחה</li>
            <li><i className="fas fa-check text-success me-2"></i>הגדרת תנאים ומועדים</li>
            <li><i className="fas fa-check text-success me-2"></i>צירוף מסמכים ומפרטים</li>
            <li><i className="fas fa-check text-success me-2"></i>אישורים נדרשים</li>
          </ul>
          <div className="placeholder-actions">
            <button className="btn btn-primary" onClick={handleBackToList}>
              <i className="fas fa-list me-2"></i>
              חזרה לרשימת RFQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQCreate;