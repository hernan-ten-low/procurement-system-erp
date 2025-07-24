// Empty state component for when no data is available

import React from 'react';
import { Button } from 'react-bootstrap';

const EmptyState = ({
  icon = 'bi-inbox',
  title = 'אין נתונים',
  message = 'לא נמצאו פריטים להצגה',
  actionText = null,
  onAction = null,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: { container: 'p-3', icon: 'fs-1', title: 'h6', message: 'small' },
    md: { container: 'p-4', icon: 'fs-1', title: 'h4', message: '' },
    lg: { container: 'p-5', icon: 'display-4', title: 'h2', message: 'fs-5' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`text-center text-muted ${currentSize.container} ${className}`}>
      <div className="mb-3">
        <i className={`${icon} ${currentSize.icon} text-muted`} />
      </div>
      
      <h3 className={`${currentSize.title} mb-2 text-muted`}>
        {title}
      </h3>
      
      <p className={`${currentSize.message} mb-3 text-muted`}>
        {message}
      </p>
      
      {actionText && onAction && (
        <Button 
          variant="outline-primary" 
          onClick={onAction}
          className="rounded-pill"
        >
          <i className="bi bi-plus-circle me-2" />
          {actionText}
        </Button>
      )}
    </div>
  );
};

// Specific empty states for different sections
export const EmptySuppliers = ({ onAddSupplier }) => (
  <EmptyState
    icon="bi-people"
    title="אין ספקים במערכת"
    message="התחל בהוספת הספק הראשון שלך כדי לנהל את תהליכי הרכש"
    actionText="הוסף ספק חדש"
    onAction={onAddSupplier}
  />
);

export const EmptyPurchaseOrders = ({ onCreateOrder }) => (
  <EmptyState
    icon="bi-cart"
    title="אין הזמנות רכש"
    message="צור הזמנת רכש ראשונה או המתן לאישור הזמנות קיימות"
    actionText="צור הזמנה חדשה"
    onAction={onCreateOrder}
  />
);

export const EmptyRFQs = ({ onCreateRFQ }) => (
  <EmptyState
    icon="bi-envelope"
    title="אין בקשות הצעות מחיר"
    message="צור בקשת הצעת מחיר ראשונה כדי להתחיל בתהליך הרכש"
    actionText="צור בקשה חדשה"
    onAction={onCreateRFQ}
  />
);

export const EmptyProducts = ({ onAddProduct }) => (
  <EmptyState
    icon="bi-box"
    title="אין מוצרים במערכת"
    message="הוסף מוצרים כדי לנהל מלאי ולבצע הזמנות רכש"
    actionText="הוסף מוצר חדש"
    onAction={onAddProduct}
  />
);

export const EmptySearchResults = ({ searchTerm, onClearSearch }) => (
  <EmptyState
    icon="bi-search"
    title="לא נמצאו תוצאות"
    message={`החיפוש "${searchTerm}" לא השיב תוצאות. נסה מילות חיפוש אחרות.`}
    actionText="נקה חיפוש"
    onAction={onClearSearch}
    size="sm"
  />
);

export const EmptyFilterResults = ({ onClearFilters }) => (
  <EmptyState
    icon="bi-funnel"
    title="אין תוצאות עבור המסננים שנבחרו"
    message="נסה לשנות את המסננים או לנקות אותם כדי לראות יותר תוצאות"
    actionText="נקה מסננים"
    onAction={onClearFilters}
    size="sm"
  />
);

export default EmptyState;
