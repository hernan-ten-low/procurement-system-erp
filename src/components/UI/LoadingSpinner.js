// Loading spinner component

import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = 'טוען...', 
  showText = true,
  className = '',
  centered = false
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border spinner-border-lg'
  };

  const containerClasses = centered 
    ? 'd-flex justify-content-center align-items-center' 
    : '';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div 
        className={`spinner-border text-${color} ${sizeClasses[size]}`} 
        role="status"
        aria-hidden="true"
      >
        <span className="visually-hidden">{text}</span>
      </div>
      {showText && (
        <span className="ms-2 text-muted">{text}</span>
      )}
    </div>
  );
};

// Full page loading overlay
export const LoadingOverlay = ({ text = 'טוען...', show = true }) => {
  if (!show) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75"
      style={{ zIndex: 9999 }}
    >
      <div className="text-center">
        <LoadingSpinner size="lg" showText={false} />
        <div className="mt-3 text-muted">{text}</div>
      </div>
    </div>
  );
};

// Inline loading for buttons
export const ButtonSpinner = ({ size = 'sm' }) => (
  <span 
    className={`spinner-border spinner-border-${size} me-2`} 
    role="status" 
    aria-hidden="true"
  />
);

// Loading skeleton for content
export const LoadingSkeleton = ({ lines = 3, height = '1rem', className = '' }) => (
  <div className={`${className}`}>
    {Array.from({ length: lines }, (_, index) => (
      <div 
        key={index}
        className="placeholder-glow mb-2"
      >
        <div 
          className="placeholder w-100" 
          style={{ height }}
        />
      </div>
    ))}
  </div>
);

export default LoadingSpinner;
