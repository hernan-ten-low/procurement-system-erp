// Mock data service for client-side data management

import { ORDER_STATUSES, RFQ_STATUSES, SUPPLIER_STATUSES, PRODUCT_CATEGORIES } from '../utils/constants';

// Generate mock suppliers
export const generateMockSuppliers = () => [
  {
    id: 1,
    companyName: 'אלקטרוניקה מתקדמת בע"מ',
    businessNumber: '514123456',
    contactName: 'יוסי כהן',
    contactPosition: 'מנהל מכירות',
    phone: '052-1234567',
    email: 'yossi@advanced-electronics.co.il',
    address: 'רחוב הטכנולוגיה 15, תל אביב',
    categories: ['אלקטרוניקה', 'מחשבים'],
    rating: 4.2,
    status: SUPPLIER_STATUSES.ACTIVE,
    isMain: true,
    paymentTerms: 'שוטף + 30',
    currency: 'ILS',
    creditLimit: 500000,
    leadTime: 7,
    createdDate: '2024-01-15'
  },
  {
    id: 2,
    companyName: 'טכנולוגיות חדשניות',
    businessNumber: '514789123',
    contactName: 'שרה לוי',
    contactPosition: 'סמנכ"ל מכירות',
    phone: '054-9876543',
    email: 'sarah@innovative-tech.co.il',
    address: 'שדרות רוטשילד 22, תל אביב',
    categories: ['מחשבים', 'רשתות'],
    rating: 4.8,
    status: SUPPLIER_STATUSES.ACTIVE,
    isMain: false,
    paymentTerms: 'שוטף + 45',
    currency: 'USD',
    creditLimit: 750000,
    leadTime: 14,
    createdDate: '2024-02-20'
  },
  {
    id: 3,
    companyName: 'רכיבים ומערכות בע"מ',
    businessNumber: '514456789',
    contactName: 'מיכאל דוד',
    contactPosition: 'מנהל טכני',
    phone: '053-1122334',
    email: 'michael@components-systems.co.il',
    address: 'רחוב יגאל אלון 94, תל אביב',
    categories: ['רכיבים', 'אלקטרוניקה'],
    rating: 3.9,
    status: SUPPLIER_STATUSES.PENDING_APPROVAL,
    isMain: false,
    paymentTerms: 'מזומן',
    currency: 'ILS',
    creditLimit: 250000,
    leadTime: 10,
    createdDate: '2024-03-10'
  }
];

// Generate mock products
export const generateMockProducts = () => [
  {
    id: 1,
    sku: 'LAP001',
    name: 'מחשב נייד Dell Latitude 5520',
    category: 'מחשבים ניידים',
    brand: 'Dell',
    description: 'מחשב נייד עסקי עם מעבד Intel Core i5',
    price: 3500,
    currency: 'ILS',
    supplierId: 1,
    supplierName: 'אלקטרוניקה מתקדמת בע"מ',
    inStock: 25,
    minStock: 5,
    maxStock: 50,
    status: 'פעיל'
  },
  {
    id: 2,
    sku: 'MON001',
    name: 'מסך Dell 24 אינץ\' UltraSharp',
    category: 'מסכים',
    brand: 'Dell',
    description: 'מסך 24 אינץ\' ברזולוציה 1920x1080',
    price: 850,
    currency: 'ILS',
    supplierId: 2,
    supplierName: 'טכנולוגיות חדשניות',
    inStock: 40,
    minStock: 10,
    maxStock: 80,
    status: 'פעיל'
  }
];

// Generate mock RFQs
export const generateMockRFQs = () => [
  {
    id: 1,
    rfqNumber: 'RFQ-2024-001',
    title: 'בקשת הצעת מחיר למחשבים ניידים',
    description: 'דרושים 20 מחשבים ניידים עסקיים',
    status: RFQ_STATUSES.SENT,
    createdDate: '2024-07-15',
    dueDate: '2024-07-25',
    suppliers: [1, 2],
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'מחשב נייד Dell Latitude 5520',
        quantity: 20,
        specifications: 'מעבד Intel Core i5, 16GB RAM, 512GB SSD'
      }
    ],
    responses: [
      {
        supplierId: 1,
        supplierName: 'אלקטרוניקה מתקדמת בע"מ',
        submittedDate: '2024-07-18',
        items: [
          {
            productId: 1,
            unitPrice: 3200,
            totalPrice: 64000,
            deliveryTime: 14,
            notes: 'כולל אחריות 3 שנים'
          }
        ],
        totalAmount: 64000,
        currency: 'ILS'
      }
    ]
  }
];

// Generate mock purchase orders
export const generateMockPurchaseOrders = () => [
  {
    id: 1,
    orderNumber: 'PO-2024-001',
    rfqId: 1,
    supplierId: 1,
    supplierName: 'אלקטרוניקה מתקדמת בע"מ',
    status: ORDER_STATUSES.CONFIRMED,
    orderDate: '2024-07-20',
    deliveryDate: '2024-08-03',
    currency: 'ILS',
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'מחשב נייד Dell Latitude 5520',
        quantity: 20,
        unitPrice: 3200,
        totalPrice: 64000
      }
    ],
    subtotal: 64000,
    vat: 10880,
    total: 74880,
    shippingAddress: 'רחוב הבורסה 28, רמת גן',
    paymentTerms: 'שוטף + 30',
    notes: 'דחוף - נדרש תיאום מועד אספקה'
  },
  {
    id: 2,
    orderNumber: 'PO-2024-002',
    supplierId: 2,
    supplierName: 'טכנולוגיות חדשניות',
    status: ORDER_STATUSES.PENDING_APPROVAL,
    orderDate: '2024-07-22',
    deliveryDate: '2024-08-05',
    currency: 'ILS',
    items: [
      {
        id: 1,
        productId: 2,
        productName: 'מסך Dell 24 אינץ\' UltraSharp',
        quantity: 30,
        unitPrice: 850,
        totalPrice: 25500
      }
    ],
    subtotal: 25500,
    vat: 4335,
    total: 29835,
    shippingAddress: 'רחוב הבורסה 28, רמת גן',
    paymentTerms: 'שוטף + 45'
  }
];

// Generate dashboard statistics
export const generateDashboardStats = () => ({
  suppliers: {
    total: 124,
    active: 118,
    pending: 6,
    change: '+5'
  },
  purchaseOrders: {
    open: 47,
    total: 285,
    value: 485320,
    change: '+12%'
  },
  deliveries: {
    pending: 23,
    overdue: 3,
    thisWeek: 15
  },
  rfqs: {
    active: 8,
    awaitingResponse: 12,
    thisMonth: 34
  }
});

// Generate recent activities
export const generateRecentActivities = () => [
  {
    id: 1,
    type: 'order_created',
    title: 'הזמנה חדשה נוצרה',
    description: 'הזמנת רכש PO-2024-002 נוצרה עבור טכנולוגיות חדשניות',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    user: 'יוסי כהן',
    icon: 'bi-cart-plus',
    color: 'success'
  },
  {
    id: 2,
    type: 'rfq_response',
    title: 'התקבלה הצעת מחיר',
    description: 'התקבלה הצעת מחיר מספק אלקטרוניקה מתקדמת',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    user: 'שרה לוי',
    icon: 'bi-envelope-check',
    color: 'info'
  },
  {
    id: 3,
    type: 'delivery_delayed',
    title: 'עיכוב במשלוח',
    description: 'משלוח PO-2024-001 עוכב ב-3 ימים',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    user: 'מערכת',
    icon: 'bi-exclamation-triangle',
    color: 'warning'
  }
];

// API simulation functions
export const mockApi = {
  // Suppliers
  getSuppliers: () => Promise.resolve(generateMockSuppliers()),
  getSupplier: (id) => Promise.resolve(generateMockSuppliers().find(s => s.id === parseInt(id))),
  
  // Products
  getProducts: () => Promise.resolve(generateMockProducts()),
  getProduct: (id) => Promise.resolve(generateMockProducts().find(p => p.id === parseInt(id))),
  
  // RFQs
  getRFQs: () => Promise.resolve(generateMockRFQs()),
  getRFQ: (id) => Promise.resolve(generateMockRFQs().find(r => r.id === parseInt(id))),
  
  // Purchase Orders
  getPurchaseOrders: () => Promise.resolve(generateMockPurchaseOrders()),
  getPurchaseOrder: (id) => Promise.resolve(generateMockPurchaseOrders().find(po => po.id === parseInt(id))),
  
  // Dashboard
  getDashboardStats: () => Promise.resolve(generateDashboardStats()),
  getRecentActivities: () => Promise.resolve(generateRecentActivities())
};
