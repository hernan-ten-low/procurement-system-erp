import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Receiving.css';

const ConfirmDialog = memo(({ dialog }) => {
  const handleConfirm = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dialog?.onConfirm?.();
  }, [dialog]);

  const handleCancel = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dialog?.onCancel?.();
  }, [dialog]);

  const handleOverlayClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (!dialog) return;
    if (e.key === 'Escape') handleCancel(e);
    if (e.key === 'Enter') handleConfirm(e);
  }, [dialog, handleCancel, handleConfirm]);

  useEffect(() => {
    if (dialog) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [dialog, handleKeyDown]);

  if (!dialog) return null;

  return (
    <div 
      className="confirm-overlay" 
      onClick={handleOverlayClick}
      style={{ 
        position: 'fixed',
        isolation: 'isolate',
        contain: 'strict'
      }}
    >
      <div 
        className="confirm-dialog"
        style={{ 
          position: 'relative',
          isolation: 'isolate',
          contain: 'content'
        }}
      >
        <div className="confirm-header">
          <div className="confirm-icon">
            <i className="fas fa-question-circle" />
          </div>
          <h4>{dialog.title}</h4>
        </div>
        <div className="confirm-content">
          <pre>{dialog.message}</pre>
        </div>
        <div className="confirm-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleCancel}
            type="button"
          >
            <i className="fas fa-times me-2" />
            {dialog.cancelText}
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleConfirm}
            type="button"
          >
            <i className="fas fa-check me-2" />
            {dialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
});

const CustomAlert = memo(({ alert, onMouseEnter, onMouseLeave, onClose, progress }) => {
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
});

function Receiving() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [receivingData, setReceivingData] = useState({});
  const [customAlert, setCustomAlert] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [alertProgress, setAlertProgress] = useState(100);
  const [alertTimer, setAlertTimer] = useState(null);
  const [progressInterval, setProgressInterval] = useState(null);
  
  const isProcessing = useRef(false);

  // ... Rest of the component code ... //

  return (
    <div className="receiving-container">
      <CustomAlert 
        alert={customAlert} 
        progress={alertProgress}
        onMouseEnter={handleAlertMouseEnter}
        onMouseLeave={handleAlertMouseLeave}
        onClose={() => setCustomAlert(null)}
      />
      
      <ConfirmDialog dialog={confirmDialog} />

      {/* ... Rest of the JSX ... */}
    </div>
  );
}

export default memo(Receiving);
