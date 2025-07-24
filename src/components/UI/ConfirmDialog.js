// Confirmation dialog component

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDialog = ({
  show = false,
  onHide,
  onConfirm,
  title = 'אישור פעולה',
  message = 'האם אתה בטוח שברצונך לבצע פעולה זו?',
  confirmText = 'אישור',
  cancelText = 'ביטול',
  confirmVariant = 'danger',
  icon = 'bi-exclamation-triangle',
  iconColor = 'warning',
  size = 'md',
  loading = false
}) => {
  const handleConfirm = () => {
    if (onConfirm && !loading) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onHide && !loading) {
      onHide();
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleCancel}
      size={size}
      centered
      backdrop={loading ? 'static' : true}
      keyboard={!loading}
    >
      <Modal.Header closeButton={!loading}>
        <Modal.Title className="d-flex align-items-center">
          {icon && (
            <i className={`${icon} text-${iconColor} me-2 fs-4`} />
          )}
          {title}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="text-center p-3">
          {typeof message === 'string' ? (
            <p className="mb-0 fs-6">{message}</p>
          ) : (
            message
          )}
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={handleCancel}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button 
          variant={confirmVariant} 
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading && (
            <span 
              className="spinner-border spinner-border-sm me-2" 
              role="status" 
              aria-hidden="true"
            />
          )}
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Specific confirmation dialogs
export const DeleteConfirmDialog = ({ 
  show, 
  onHide, 
  onConfirm, 
  itemName = 'פריט זה',
  loading = false 
}) => (
  <ConfirmDialog
    show={show}
    onHide={onHide}
    onConfirm={onConfirm}
    title="מחיקת פריט"
    message={
      <div>
        <p>האם אתה בטוח שברצונך למחוק את <strong>{itemName}</strong>?</p>
        <small className="text-danger">
          <i className="bi bi-exclamation-triangle me-1" />
          פעולה זו לא ניתנת לביטול
        </small>
      </div>
    }
    confirmText="מחק"
    confirmVariant="danger"
    icon="bi-trash"
    iconColor="danger"
    loading={loading}
  />
);

export const SaveConfirmDialog = ({ 
  show, 
  onHide, 
  onConfirm, 
  hasUnsavedChanges = false,
  loading = false 
}) => (
  <ConfirmDialog
    show={show}
    onHide={onHide}
    onConfirm={onConfirm}
    title="שמירת שינויים"
    message={
      hasUnsavedChanges ? 
        "יש לך שינויים שלא נשמרו. האם תרצה לשמור לפני יציאה?" :
        "האם אתה בטוח שברצונך לשמור את השינויים?"
    }
    confirmText="שמור"
    cancelText="בטל"
    confirmVariant="primary"
    icon="bi-save"
    iconColor="primary"
    loading={loading}
  />
);

export const LeaveConfirmDialog = ({ 
  show, 
  onHide, 
  onConfirm, 
  loading = false 
}) => (
  <ConfirmDialog
    show={show}
    onHide={onHide}
    onConfirm={onConfirm}
    title="יציאה מהדף"
    message="יש לך שינויים שלא נשמרו. האם אתה בטוח שברצונך לצאת בלי לשמור?"
    confirmText="צא בלי לשמור"
    cancelText="המשך עריכה"
    confirmVariant="warning"
    icon="bi-exclamation-triangle"
    iconColor="warning"
    loading={loading}
  />
);

export const StatusChangeConfirmDialog = ({ 
  show, 
  onHide, 
  onConfirm, 
  currentStatus,
  newStatus,
  itemType = 'פריט',
  loading = false 
}) => (
  <ConfirmDialog
    show={show}
    onHide={onHide}
    onConfirm={onConfirm}
    title="שינוי סטטוס"
    message={
      <div>
        <p>האם אתה בטוח שברצונך לשנות את סטטוס {itemType}?</p>
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <span className="badge bg-secondary">{currentStatus}</span>
          <i className="bi bi-arrow-left" />
          <span className="badge bg-primary">{newStatus}</span>
        </div>
      </div>
    }
    confirmText="שנה סטטוס"
    confirmVariant="primary"
    icon="bi-arrow-repeat"
    iconColor="info"
    loading={loading}
  />
);

export default ConfirmDialog;
