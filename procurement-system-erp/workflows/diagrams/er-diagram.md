# תרשים ER - Entity Relationship Diagram

## 🗄️ מודל נתונים מלא של המערכת

```mermaid
erDiagram
    SUPPLIERS ||--o{ SUPPLIER_CONTACTS : has
    SUPPLIERS ||--o{ SUPPLIER_CATEGORIES : belongs_to
    SUPPLIERS ||--o{ SUPPLIER_PRODUCTS : supplies
    SUPPLIERS ||--|| SUPPLIER_TERMS : has
    SUPPLIERS ||--o{ SUPPLIER_DOCUMENTS : has
    SUPPLIERS ||--o{ PURCHASE_ORDERS : receives
    SUPPLIERS ||--o{ SUPPLIER_PERFORMANCE : evaluated_by
    SUPPLIERS ||--o{ SUPPLIER_EVENTS : logs
    
    PRODUCT_CATEGORIES ||--o{ SUPPLIER_CATEGORIES : includes
    PRODUCT_CATEGORIES ||--o{ PRODUCTS : contains
    
    PRODUCTS ||--o{ SUPPLIER_PRODUCTS : supplied_by
    PRODUCTS ||--o{ RFQ_ITEMS : requested_in
    PRODUCTS ||--o{ PURCHASE_ORDER_ITEMS : ordered_in
    PRODUCTS ||--o{ GOODS_RECEIPT_ITEMS : received_in
    
    RFQ_HEADERS ||--o{ RFQ_ITEMS : contains
    RFQ_HEADERS ||--o{ RFQ_SUPPLIERS : sent_to
    RFQ_HEADERS ||--o{ RFQ_RESPONSES : receives
    
    RFQ_SUPPLIERS }o--|| SUPPLIERS : supplier
    RFQ_RESPONSES }o--|| SUPPLIERS : from
    RFQ_RESPONSES }o--|| RFQ_ITEMS : for_item
    
    PURCHASE_ORDERS ||--o{ PURCHASE_ORDER_ITEMS : contains
    PURCHASE_ORDERS ||--o{ GOODS_RECEIPTS : fulfilled_by
    
    GOODS_RECEIPTS ||--o{ GOODS_RECEIPT_ITEMS : contains
    GOODS_RECEIPT_ITEMS }o--|| PURCHASE_ORDER_ITEMS : matches
    
    ALERTS }o--|| SUPPLIERS : about
    ALERTS }o--|| PRODUCTS : about
```

## 📊 טבלאות ישויות מפורטות

### 1️⃣ טבלת ספקים (SUPPLIERS)

```mermaid
erDiagram
    SUPPLIERS {
        int supplier_id PK
        string company_name
        enum business_type
        string business_number UK
        enum status
        decimal rating
        string street_address
        string city
        string postal_code
        string region
        string phone
        string fax
        string email
        string website
        string operating_hours
        string business_area
        string employee_count
        string annual_revenue
        text notes
        datetime created_date
        int created_by FK
        datetime modified_date
        int modified_by FK
        boolean is_deleted
    }
```

### 2️⃣ מערכת יחסים - אנשי קשר

```mermaid
erDiagram
    SUPPLIERS ||--o{ SUPPLIER_CONTACTS : has
    
    SUPPLIERS {
        int supplier_id PK
        string company_name
        string phone
        string email
    }
    
    SUPPLIER_CONTACTS {
        int contact_id PK
        int supplier_id FK
        string full_name
        string position
        string phone
        string mobile
        string email
        boolean is_primary
        boolean is_active
        text notes
        datetime created_date
    }
```

### 3️⃣ מערכת מוצרים וקטגוריות

```mermaid
erDiagram
    SUPPLIERS ||--o{ SUPPLIER_PRODUCTS : supplies
    PRODUCTS ||--o{ SUPPLIER_PRODUCTS : supplied_by
    PRODUCT_CATEGORIES ||--o{ PRODUCTS : contains
    
    PRODUCTS {
        int product_id PK
        string sku UK
        string barcode
        string product_name
        int category_id FK
        string brand
        int quantity_in_stock
        int min_stock_level
        string location
        decimal cost_price
        decimal selling_price
        decimal special_price
        int warranty_months
        enum status
        text notes
    }
    
    SUPPLIER_PRODUCTS {
        int supplier_id FK
        int product_id FK
        string supplier_sku
        decimal supplier_price
        int lead_time_days
        int min_order_quantity
        boolean is_primary_supplier
        date last_purchase_date
    }
    
    PRODUCT_CATEGORIES {
        int category_id PK
        int parent_id FK
        string category_name
        string category_code UK
        text description
        string icon
        int sort_order
        boolean is_active
    }
```

### 4️⃣ תהליך RFQ מלא

```mermaid
erDiagram
    RFQ_HEADERS ||--o{ RFQ_ITEMS : contains
    RFQ_HEADERS ||--o{ RFQ_SUPPLIERS : sent_to
    RFQ_SUPPLIERS ||--o{ RFQ_RESPONSES : responds
    SUPPLIERS ||--o{ RFQ_SUPPLIERS : participates
    PRODUCTS ||--o{ RFQ_ITEMS : requested
    
    RFQ_HEADERS {
        int rfq_id PK
        string rfq_number UK
        datetime request_date
        date due_date
        enum status
        text notes
        int created_by FK
    }
    
    RFQ_ITEMS {
        int rfq_item_id PK
        int rfq_id FK
        int product_id FK
        string product_description
        int quantity
        text notes
    }
    
    RFQ_SUPPLIERS {
        int rfq_id FK
        int supplier_id FK
        datetime sent_date
        datetime response_date
        enum status
    }
    
    RFQ_RESPONSES {
        int response_id PK
        int rfq_id FK
        int supplier_id FK
        int rfq_item_id FK
        decimal unit_price
        decimal total_price
        int lead_time_days
        text notes
    }
```

### 5️⃣ הזמנות רכש וקליטה

```mermaid
erDiagram
    PURCHASE_ORDERS ||--o{ PURCHASE_ORDER_ITEMS : contains
    PURCHASE_ORDERS ||--o{ GOODS_RECEIPTS : fulfilled_by
    GOODS_RECEIPTS ||--o{ GOODS_RECEIPT_ITEMS : contains
    SUPPLIERS ||--o{ PURCHASE_ORDERS : supplies_to
    
    PURCHASE_ORDERS {
        int po_id PK
        string po_number UK
        int supplier_id FK
        datetime order_date
        date expected_delivery
        decimal subtotal
        decimal tax_amount
        decimal total_amount
        enum status
        text shipping_address
        text notes
        int created_by FK
        int approved_by FK
        datetime approved_date
    }
    
    PURCHASE_ORDER_ITEMS {
        int po_item_id PK
        int po_id FK
        int product_id FK
        string product_description
        int quantity
        decimal unit_price
        decimal total_price
        int received_quantity
        datetime received_date
    }
    
    GOODS_RECEIPTS {
        int receipt_id PK
        string receipt_number UK
        int po_id FK
        int supplier_id FK
        datetime receipt_date
        string invoice_number
        string delivery_note_number
        enum status
        text notes
        int received_by FK
    }
    
    GOODS_RECEIPT_ITEMS {
        int receipt_item_id PK
        int receipt_id FK
        int product_id FK
        int po_item_id FK
        int ordered_quantity
        int received_quantity
        int accepted_quantity
        int rejected_quantity
        enum status
        text notes
    }
```

### 6️⃣ מערכת הערכה וביצועים

```mermaid
erDiagram
    SUPPLIERS ||--o{ SUPPLIER_PERFORMANCE : evaluated
    SUPPLIERS ||--o{ SUPPLIER_EVENTS : has_events
    
    SUPPLIER_PERFORMANCE {
        int performance_id PK
        int supplier_id FK
        date evaluation_date
        decimal quality_rating
        decimal delivery_rating
        decimal service_rating
        decimal price_rating
        decimal flexibility_rating
        decimal documentation_rating
        decimal overall_rating
        text notes
        int evaluated_by FK
    }
    
    SUPPLIER_EVENTS {
        int event_id PK
        int supplier_id FK
        datetime event_date
        string event_type
        string event_title
        text description
        enum severity
        int created_by FK
    }
```

### 7️⃣ מערכת התראות

```mermaid
erDiagram
    ALERTS {
        int alert_id PK
        string alert_type
        string entity_type
        int entity_id
        string title
        text description
        enum severity
        enum status
        datetime created_date
        date due_date
        int assigned_to FK
        datetime resolved_date
        int resolved_by FK
    }
    
    ALERTS }o--|| SUPPLIERS : references
    ALERTS }o--|| PRODUCTS : references
    ALERTS }o--|| PURCHASE_ORDERS : references
```

## 🔑 מפתחות ואינדקסים

```sql
-- Primary Keys
ALTER TABLE suppliers ADD PRIMARY KEY (supplier_id);
ALTER TABLE supplier_contacts ADD PRIMARY KEY (contact_id);
ALTER TABLE products ADD PRIMARY KEY (product_id);
ALTER TABLE purchase_orders ADD PRIMARY KEY (po_id);

-- Foreign Keys
ALTER TABLE supplier_contacts 
    ADD FOREIGN KEY (supplier_id) 
    REFERENCES suppliers(supplier_id);

ALTER TABLE purchase_order_items 
    ADD FOREIGN KEY (po_id) 
    REFERENCES purchase_orders(po_id);

-- Unique Constraints
ALTER TABLE suppliers 
    ADD UNIQUE KEY uk_business_number (business_number);

ALTER TABLE products 
    ADD UNIQUE KEY uk_sku (sku);

-- Indexes for Performance
CREATE INDEX idx_supplier_status ON suppliers(status);
CREATE INDEX idx_supplier_rating ON suppliers(rating);
CREATE INDEX idx_po_order_date ON purchase_orders(order_date);
CREATE INDEX idx_po_status ON purchase_orders(status);
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_alert_status ON alerts(status);
CREATE INDEX idx_alert_severity ON alerts(severity);
```

## 📈 Views לדוחות

```sql
-- View: סיכום ספקים
CREATE VIEW v_supplier_summary AS
SELECT 
    s.supplier_id,
    s.company_name,
    s.status,
    s.rating,
    COUNT(DISTINCT po.po_id) as total_orders,
    COALESCE(SUM(po.total_amount), 0) as total_purchase_amount,
    COUNT(DISTINCT sp.product_id) as product_count,
    MAX(po.order_date) as last_order_date
FROM suppliers s
LEFT JOIN purchase_orders po ON s.supplier_id = po.supplier_id
LEFT JOIN supplier_products sp ON s.supplier_id = sp.supplier_id
WHERE s.is_deleted = FALSE
GROUP BY s.supplier_id;

-- View: מצב הזמנות
CREATE VIEW v_order_status_summary AS
SELECT 
    status,
    COUNT(*) as order_count,
    SUM(total_amount) as total_value,
    AVG(DATEDIFF(NOW(), order_date)) as avg_days_pending
FROM purchase_orders
GROUP BY status;
```

## 🔐 הרשאות ואבטחה

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned_to
    ROLES ||--o{ ROLE_PERMISSIONS : has
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : granted_to
    
    USERS {
        int user_id PK
        string username UK
        string email UK
        string password_hash
        string full_name
        boolean is_active
        datetime last_login
    }
    
    ROLES {
        int role_id PK
        string role_name UK
        string description
        boolean is_active
    }
    
    PERMISSIONS {
        int permission_id PK
        string permission_name UK
        string module
        string action
        string description
    }
    
    USER_ROLES {
        int user_id FK
        int role_id FK
        datetime assigned_date
        int assigned_by FK
    }
    
    ROLE_PERMISSIONS {
        int role_id FK
        int permission_id FK
        boolean can_create
        boolean can_read
        boolean can_update
        boolean can_delete
    }
```

## 📊 סטטיסטיקות מסד הנתונים

```mermaid
pie title התפלגות רשומות במסד הנתונים
    "ספקים" : 124
    "מוצרים" : 3450
    "הזמנות רכש" : 1876
    "קליטות" : 1654
    "משתמשים" : 45
```

## 🚀 אופטימיזציה

### אינדקסים מומלצים:
1. **Multi-column indexes** על שדות שמחפשים יחד
2. **Covering indexes** לשאילתות נפוצות
3. **Partial indexes** לסינון נתונים

### Partitioning:
```sql
-- חלוקת טבלת הזמנות לפי שנה
ALTER TABLE purchase_orders 
PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

---

## 📝 הערות חשובות

1. **Normalization**: המודל בנוי לפי 3NF למניעת כפילויות
2. **Soft Delete**: שימוש ב-is_deleted במקום מחיקה פיזית
3. **Audit Trail**: שמירת created_by ו-modified_by בכל טבלה
4. **Data Types**: שימוש ב-DECIMAL למספרים כספיים
5. **Constraints**: הגדרת CHECK constraints לולידציה

---

תאריך יצירה: ינואר 2025 | גרסת DB: 1.0
