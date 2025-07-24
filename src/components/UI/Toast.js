// Toast notification component

import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Individual toast component
const ToastNotification = ({ 
  id,
  title,
  message,
  type = 'info',
  show = true,
  onClose,
  autoHide = true,
  delay = 5000,
  icon = null
}) => {
  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    setShowToast(show);
  }, [show]);

  const handleClose = () => {
    setShowToast(false);
    if (onClose) {
      setTimeout(() => onClose(id), 150); // Delay to allow animation
    }
  };

  const getToastConfig = () => {
    const configs = {
      success: {
        bg: 'success',
        icon: icon || 'bi-check-circle-fill',
        textColor: 'white'
      },
      error: {
        bg: 'danger',
        icon: icon || 'bi-exclamation-triangle-fill',
        textColor: 'white'
      },
      warning: {
        bg: 'warning',
        icon: icon || 'bi-exclamation-triangle-fill',
        textColor: 'dark'
      },
      info: {
        bg: 'info',
        icon: icon || 'bi-info-circle-fill',
        textColor: 'white'
      }
    };
    
    return configs[type] || configs.info;
  };

  const config = getToastConfig();

  return (
    <Toast
      show={showToast}
      onClose={handleClose}
      autohide={autoHide}
      delay={delay}
      bg={config.bg}
      className={`text-${config.textColor}`}
    >
      <Toast.Header closeButton className={`text-${config.textColor}`}>
        <i className={`${config.icon} me-2`} />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      {message && (
        <Toast.Body>
          {typeof message === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: message }} />
          ) : (
            message
          )}
        </Toast.Body>
      )}
    </Toast>
  );
};

// Toast manager component
const ToastManager = ({ toasts = [], onRemoveToast, position = 'top-end' }) => {
  return (
    <ToastContainer 
      position={position} 
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      {toasts.map(toast => (
        <ToastNotification
          key={toast.id}
          {...toast}
          onClose={onRemoveToast}
        />
      ))}
    </ToastContainer>
  );
};

// Custom hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      ...toast,
      show: true
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  // Convenience methods
  const showSuccess = (title, message, options = {}) => {
    return addToast({ type: 'success', title, message, ...options });
  };

  const showError = (title, message, options = {}) => {
    return addToast({ type: 'error', title, message, autoHide: false, ...options });
  };

  const showWarning = (title, message, options = {}) => {
    return addToast({ type: 'warning', title, message, ...options });
  };

  const showInfo = (title, message, options = {}) => {
    return addToast({ type: 'info', title, message, ...options });
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

// Global toast context
export const ToastContext = React.createContext();

export const ToastProvider = ({ children, position = 'top-end' }) => {
  const toastManager = useToast();

  return (
    <ToastContext.Provider value={toastManager}>
      {children}
      <ToastManager 
        toasts={toastManager.toasts}
        onRemoveToast={toastManager.removeToast}
        position={position}
      />
    </ToastContext.Provider>
  );
};

// Hook to use toast context
export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export { ToastNotification, ToastManager };
export default ToastNotification;
