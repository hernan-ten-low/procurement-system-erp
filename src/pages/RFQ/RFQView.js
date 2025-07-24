import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RFQView.css';

const RFQView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackToList = () => {
    navigate('/rfq');
  };

  const handleEditRFQ = () => {
    navigate(`/rfq/edit/${id}`);
  };

  const handleCompareQuotes = () => {
    navigate(`/rfq/compare/${id}`);
  };

  return (
    <div className="rfq-view-container">
      <div className="rfq-view-header">
        <div className="header-content">
          <div className="page-title">
            <h2>צפייה בבקשת RFQ - {id}</h2>
            <nav className="breadcrumb">
              <span>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span onClick={() => navigate('/rfq')} style={{cursor: 'pointer'}}>בקשות להצעת מחיר</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">צפייה ב-{id}</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleBackToList}>
              <i className="fas fa-arrow-right me-2"></i>
              חזרה לרשימה
            </button>
            <button className="btn btn-outline-primary" onClick={handleEditRFQ}>
              <i className="fas fa-edit me-2"></i>
              עריכה
            </button>
            <button className="btn btn-success" onClick={handleCompareQuotes}>
              <i className="fas fa-balance-scale me-2"></i>
              השווה הצעות
            </button>
          </div>
        </div>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-card">
          <div className="placeholder-icon">
            <i className="fas fa-eye fa-4x text-info"></i>
          </div>
          <h3>צפייה בבקשת RFQ</h3>
          <p>מסך זה יכלול:</p>
          <ul className="feature-list">
            <li><i className="fas fa-check text-success me-2"></i>פרטי הבקשה המלאים</li>
            <li><i className="fas fa-check text-success me-2"></i>רשימת מוצרים וכמויות</li>
            <li><i className="fas fa-check text-success me-2"></i>ספקים שנשלחה אליהם הבקשה</li>
            <li><i className="fas fa-check text-success me-2"></i>הצעות מחיר שהתקבלו</li>
            <li><i className="fas fa-check text-success me-2"></i>מסמכים מצורפים</li>
            <li><i className="fas fa-check text-success me-2"></i>היסטוריית פעילות</li>
            <li><i className="fas fa-check text-success me-2"></i>אפשרות הדפסה ו-PDF</li>
          </ul>
          <div className="placeholder-actions">
            <button className="btn btn-primary" onClick={handleBackToList}>
              <i className="fas fa-list me-2"></i>
              חזרה לרשימת RFQ
            </button>
            <button className="btn btn-outline-primary" onClick={handleEditRFQ}>
              <i className="fas fa-edit me-2"></i>
              עריכה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQView;