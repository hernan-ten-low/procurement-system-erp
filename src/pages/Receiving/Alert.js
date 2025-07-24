import React, { useCallback, useEffect } from 'react';

function Alert({ alert, progress, onMouseEnter, onMouseLeave, onClose }) {
  if (!alert) return null;
  
  return (
    <div className="custom-alert-overlay">
      <div 
        className={`custom-alert custom-alert-${alert.type}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="alert-header">
          <div className="alert-icon">
            <i className={alert.icon} />
          </div>
          <div className="alert-title">
            <h4>{alert.title}</h4>
            <span className="alert-timestamp">{alert.timestamp}</span>
          </div>
          <button className="alert-close" onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="alert-content">
          <pre>{alert.message}</pre>
        </div>
        <div className="alert-progress-bar">
          <div 
            className="alert-progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Alert);
