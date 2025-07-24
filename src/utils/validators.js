// Form validation utilities

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} הוא שדה חובה`;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email) return null;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'כתובת דוא"ל לא תקינה';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null;
  
  const phoneRegex = /^0[2-9]\d{7,8}$/;
  const cleaned = phone.replace(/\D/g, '');
  
  if (!phoneRegex.test(cleaned)) {
    return 'מספר טלפון לא תקין';
  }
  return null;
};

export const validateBusinessNumber = (businessNumber) => {
  if (!businessNumber) return null;
  
  const cleaned = businessNumber.replace(/\D/g, '');
  
  if (cleaned.length !== 9) {
    return 'מספר עוסק מורשה חייב להכיל 9 ספרות';
  }
  
  // Israeli business number validation algorithm
  const digits = cleaned.split('').map(Number);
  let sum = 0;
  
  for (let i = 0; i < 8; i++) {
    let digit = digits[i] * ((i % 2) + 1);
    if (digit > 9) {
      digit = Math.floor(digit / 10) + (digit % 10);
    }
    sum += digit;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  
  if (checkDigit !== digits[8]) {
    return 'מספר עוסק מורשה לא תקין';
  }
  
  return null;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (!value) return null;
  
  if (value.length < minLength) {
    return `${fieldName} חייב להכיל לפחות ${minLength} תווים`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (!value) return null;
  
  if (value.length > maxLength) {
    return `${fieldName} לא יכול להכיל יותר מ-${maxLength} תווים`;
  }
  return null;
};

export const validateNumber = (value, fieldName) => {
  if (!value) return null;
  
  if (isNaN(value) || isNaN(parseFloat(value))) {
    return `${fieldName} חייב להיות מספר`;
  }
  return null;
};

export const validatePositiveNumber = (value, fieldName) => {
  const numberError = validateNumber(value, fieldName);
  if (numberError) return numberError;
  
  if (parseFloat(value) <= 0) {
    return `${fieldName} חייב להיות מספר חיובי`;
  }
  return null;
};

export const validateMinValue = (value, minValue, fieldName) => {
  const numberError = validateNumber(value, fieldName);
  if (numberError) return numberError;
  
  if (parseFloat(value) < minValue) {
    return `${fieldName} חייב להיות לפחות ${minValue}`;
  }
  return null;
};

export const validateMaxValue = (value, maxValue, fieldName) => {
  const numberError = validateNumber(value, fieldName);
  if (numberError) return numberError;
  
  if (parseFloat(value) > maxValue) {
    return `${fieldName} לא יכול להיות יותר מ-${maxValue}`;
  }
  return null;
};

export const validateDate = (date, fieldName) => {
  if (!date) return null;
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return `${fieldName} הוא תאריך לא תקין`;
  }
  return null;
};

export const validateFutureDate = (date, fieldName) => {
  const dateError = validateDate(date, fieldName);
  if (dateError) return dateError;
  
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dateObj < today) {
    return `${fieldName} חייב להיות תאריך עתידי`;
  }
  return null;
};

export const validatePastDate = (date, fieldName) => {
  const dateError = validateDate(date, fieldName);
  if (dateError) return dateError;
  
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  if (dateObj > today) {
    return `${fieldName} חייב להיות תאריך עבר`;
  }
  return null;
};

export const validateFileSize = (file, maxSizeInMB, fieldName = 'קובץ') => {
  if (!file) return null;
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return `${fieldName} לא יכול להיות גדול מ-${maxSizeInMB}MB`;
  }
  return null;
};

export const validateFileType = (file, allowedTypes, fieldName = 'קובץ') => {
  if (!file) return null;
  
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return `${fieldName} חייב להיות מסוג: ${allowedTypes.join(', ')}`;
  }
  return null;
};

export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(fieldName => {
    const rules = validationRules[fieldName];
    const value = formData[fieldName];
    
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[fieldName] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
