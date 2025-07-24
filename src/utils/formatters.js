// Formatting utilities for dates, numbers, and currency

export const formatCurrency = (amount, currency = 'ILS') => {
  const formatter = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(amount);
};

export const formatNumber = (number, decimals = 0) => {
  const formatter = new Intl.NumberFormat('he-IL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return formatter.format(number);
};

export const formatDate = (date, format = 'short') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options = {
    short: { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    },
    long: { 
      weekday: 'long',
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    },
    medium: { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }
  };
  
  return new Intl.DateTimeFormat('he-IL', options[format]).format(dateObj);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
  if (diffInSeconds < 60) return 'עכשיו';
  if (diffInSeconds < 3600) return `לפני ${Math.floor(diffInSeconds / 60)} דקות`;
  if (diffInSeconds < 86400) return `לפני ${Math.floor(diffInSeconds / 3600)} שעות`;
  if (diffInSeconds < 2592000) return `לפני ${Math.floor(diffInSeconds / 86400)} ימים`;
  if (diffInSeconds < 31536000) return `לפני ${Math.floor(diffInSeconds / 2592000)} חודשים`;
  return `לפני ${Math.floor(diffInSeconds / 31536000)} שנים`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 בתים';
  
  const k = 1024;
  const sizes = ['בתים', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatBusinessNumber = (businessNumber) => {
  if (!businessNumber) return '';
  
  // Format Israeli business number (9 digits)
  const cleaned = businessNumber.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return businessNumber;
};

export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Format Israeli phone number
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatOrderNumber = (orderNumber, prefix = 'PO') => {
  if (!orderNumber) return '';
  return `${prefix}-${String(orderNumber).padStart(6, '0')}`;
};

export const formatDaysFromNow = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInDays = Math.ceil((dateObj - now) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'היום';
  if (diffInDays === 1) return 'מחר';
  if (diffInDays === -1) return 'אתמול';
  if (diffInDays > 0) return `בעוד ${diffInDays} ימים`;
  return `לפני ${Math.abs(diffInDays)} ימים`;
};
