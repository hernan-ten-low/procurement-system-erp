import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RFQCompare.css';

const RFQCompare = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackToList = () => {
    navigate('/rfq');
  };

  const handleViewRFQ = () => {
    navigate(`/rfq/view/${id}`);
  };

  const handleCreatePurchaseOrder = () => {
    alert('יצירת הזמנת רכש - פונקציונליות תתווסף בשלב הבא');
  };

  return (
    <div className="rfq-compare-container">
      <div className="rfq-compare-header">
        <div className="header-content">
          <div className="page-title">
            <h2>השוואת הצעות מחיר - {id}</h2>
            <nav className="breadcrumb">
              <span>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span onClick={() => navigate('/rfq')} style={{cursor: 'pointer'}}>בקשות להצעת מחיר</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">השוואת הצעות {id}</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleBackToList}>
              <i className="fas fa-arrow-right me-2"></i>
              חזרה לרשימה
            </button>
            <button className="btn btn-outline-info" onClick={handleViewRFQ}>
              <i className="fas fa-eye me-2"></i>
              צפייה בבקשה
            </button>
            <button className="btn btn-success" onClick={handleCreatePurchaseOrder}>
              <i className="fas fa-shopping-cart me-2"></i>
              צור הזמנת רכש
            </button>
          </div>
        </div>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-card">
          <div className="placeholder-icon">
            <i className="fas fa-balance-scale fa-4x text-success"></i>
          </div>
          <h3>השוואת הצעות מחיר</h3>
          <p>מסך זה יכלול:</p>
          <ul className="feature-list">
            <li><i className="fas fa-check text-success me-2"></i>טבלה השוואתית של ההצעות</li>
            <li><i className="fas fa-check text-success me-2"></i>השוואת מחירים ותנאים</li>
            <li><i className="fas fa-check text-success me-2"></i>מערכת ניקוד והערכה</li>
            <li><i className="fas fa-check text-success me-2"></i>כלי החלטה וסינון</li>
            <li><i className="fas fa-check text-success me-2"></i>בחירת הצעה זוכה</li>
            <li><i className="fas fa-check text-success me-2"></i>הדפסת דוח השוואה</li>
            <li><i className="fas fa-check text-success me-2"></i>המרה להזמנת רכש</li>
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

export default RFQCompare;