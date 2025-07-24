import React, { useCallback, useEffect } from 'react';

function Confirm({ dialog }) {
  if (!dialog) return null;

  const handleOverlayClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleCancel = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dialog.onCancel?.();
  }, [dialog]);

  const handleConfirm = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dialog.onConfirm?.();
  }, [dialog]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCancel();
      if (e.key === 'Enter') handleConfirm();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleCancel, handleConfirm]);

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
            className="btn btn-secondary no-flash"
            onClick={handleCancel}
            type="button"
          >
            <i className="fas fa-times me-2" />
            {dialog.cancelText}
          </button>
          <button 
            className="btn btn-primary no-flash"
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
}

export default React.memo(Confirm);
