// System constants and enums

export const ORDER_STATUSES = {
  DRAFT: 'טיוטה',
  PENDING_APPROVAL: 'ממתין לאישור',
  APPROVED: 'אושר',
  SENT_TO_SUPPLIER: 'נשלח לספק',
  CONFIRMED: 'אושר על ידי ספק',
  PARTIALLY_RECEIVED: 'התקבל חלקית',
  COMPLETED: 'הושלם',
  CANCELLED: 'בוטל'
};

export const RFQ_STATUSES = {
  DRAFT: 'טיוטה',
  SENT: 'נשלח',
  RESPONSES_RECEIVED: 'התקבלו הצעות',
  UNDER_REVIEW: 'בבדיקה',
  AWARDED: 'זכה',
  CANCELLED: 'בוטל'
};

export const SUPPLIER_STATUSES = {
  ACTIVE: 'פעיל',
  INACTIVE: 'לא פעיל',
  PENDING_APPROVAL: 'ממתין לאישור',
  SUSPENDED: 'מושעה',
  BLACKLISTED: 'ברשימה שחורה'
};

export const PRODUCT_CATEGORIES = [
  'מחשבים ניידים',
  'מחשבים שולחניים',
  'מסכים',
  'רכיבי מחשב',
  'אביזרי מחשב',
  'רשתות ותקשורת',
  'אחסון',
  'מדפסות וסורקים',
  'תוכנה',
  'אלקטרוניקה צרכנית',
  'טלפונים חכמים',
  'טאבלטים',
  'אוזניות וקול',
  'מצלמות',
  'משחקים',
  'אחר'
];

export const CURRENCIES = [
  { code: 'ILS', symbol: '₪', name: 'שקל חדש' },
  { code: 'USD', symbol: '$', name: 'דולר אמריקאי' },
  { code: 'EUR', symbol: '€', name: 'יורו' }
];

export const PAYMENT_TERMS = [
  'מזומן',
  'שוטף + 30',
  'שוטף + 45',
  'שוטף + 60',
  'שוטף + 90',
  'תשלום מקדמה',
  'בהעברה בנקאית'
];

export const SHIPPING_METHODS = [
  'איסוף עצמי',
  'משלוח רגיל',
  'משלוח מהיר',
  'משלוח אקספרס',
  'מוביל מיוחד'
];

export const PRIORITIES = {
  LOW: { value: 'נמוכה', color: 'success' },
  MEDIUM: { value: 'בינונית', color: 'warning' },
  HIGH: { value: 'גבוהה', color: 'danger' },
  URGENT: { value: 'דחוף', color: 'danger' }
};

export const ALERT_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'danger'
};

export const USER_ROLES = {
  ADMIN: 'מנהל מערכת',
  PROCUREMENT_MANAGER: 'מנהל רכש',
  PROCUREMENT_STAFF: 'עובד רכש',
  WAREHOUSE_MANAGER: 'מנהל מחסן',
  VIEWER: 'צופה'
};

export const DOCUMENT_TYPES = {
  BUSINESS_LICENSE: 'רישיון עסק',
  TAX_CERTIFICATE: 'תעודת עוסק מורשה',
  INSURANCE: 'ביטוח',
  BANK_GUARANTEE: 'ערבות בנקאית',
  QUALITY_CERTIFICATE: 'תעודת איכות',
  OTHER: 'אחר'
};

export const INVENTORY_TYPES = {
  REGULAR: 'רגיל',
  CONSIGNMENT: 'קונסיגנציה',
  RESERVED: 'שמור',
  DAMAGED: 'פגום',
  IN_TRANSIT: 'בדרך'
};

export const MOVEMENT_TYPES = {
  RECEIPT: 'קבלה',
  ISSUE: 'הוצאה',
  TRANSFER: 'העברה',
  ADJUSTMENT: 'התאמה',
  RETURN: 'החזרה',
  DAMAGE: 'נזק'
};
