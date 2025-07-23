# מבנה טבלאות - מערכת ניהול רכש וספקים

## טבלאות מתוך המסמך

### subs_AlertsTracking - מעקב התראות
- ActionTaken (nvarchar) - פעולה שננקטה
- AlertID (int) - מזהה התראה (PK)
- AlertType (varchar) - סוג התראה
- AssignedTo (nvarchar) - מוקצה ל
- ClosedDate (date) - תאריך סגירה
- CompanyId (int) - מזהה חברה (FK)
- CreatedBy (int) - נוצר על ידי
- CreatedDate (datetime) - תאריך יצירה
- Description (nvarchar) - תיאור
- IsActive (bit) - פעיל
- IsDeleted (bit) - נמחק
- ModifiedBy (int) - עודכן על ידי
- ModifiedDate (datetime) - תאריך עדכון
- Notes (nvarchar) - הערות
- ProductID (int) - מזהה מוצר (FK)
- Severity (varchar) - חומרה
- Status (varchar) - סטטוס
- Subject (nvarchar) - נושא
- SupplierID (int) - מזהה ספק (FK)
- TargetDate (date) - תאריך יעד

### subs_AuditLog - יומן ביקורת
- Action (nvarchar) - פעולה
- CompanyId (int) - מזהה חברה
- CreatedDate (datetime) - תאריך יצירה
- Description (nvarchar) - תיאור
- LogID (int) - מזהה לוג (PK)
- NewValue (nvarchar) - ערך חדש
- OldValue (nvarchar) - ערך ישן
- RecordId (int) - מזהה רשומה
- TableName (nvarchar) - שם טבלה
- UserId (int) - מזהה משתמש

### subs_Products - מוצרים
- ProductID (int) - מזהה מוצר (PK)
- AlternativeBarcodes (nvarchar) - ברקודים חלופיים
- AutoRenewal (bit) - חידוש אוטומטי
- Brand (nvarchar) - מותג
- CategoryID (int) - מזהה קטגוריה (FK)
- CompanyId (int) - מזהה חברה (FK)
- EnglishName (nvarchar) - שם באנגלית
- FullDescription (nvarchar) - תיאור מלא
- HebrewName (nvarchar) - שם בעברית
- InternalSKU (varchar) - מקט פנימי
- IsActive (bit) - פעיל
- IsDeleted (bit) - נמחק
- MainCategory (nvarchar) - קטגוריה ראשית
- Manufacturer (nvarchar) - יצרן
- MasterSKU (varchar) - מקט ראשי
- ModelNumber (nvarchar) - מספר דגם
- PrimaryBarcode (varchar) - ברקוד ראשי
- ProductStatus (varchar) - סטטוס מוצר
- ProductType (varchar) - סוג מוצר
- ShortDescription (nvarchar) - תיאור קצר
- StorageType (varchar) - סוג אחסון
- SubCategory (nvarchar) - תת קטגוריה
- Tags (nvarchar) - תגיות

### subs_Suppliers - ספקים
- SupplierID (int) - מזהה ספק (PK)
- ActiveContract (bit) - חוזה פעיל
- Address (nvarchar) - כתובת
- Certifications (nvarchar) - הסמכות
- CompanyId (int) - מזהה חברה (FK)
- CreditLimit (decimal) - מסגרת אשראי
- Email (nvarchar) - דוא"ל
- IsActive (bit) - פעיל
- IsDeleted (bit) - נמחק
- LeadTime (int) - זמן אספקה
- MinOrderValue (decimal) - הזמנה מינימלית
- Notes (nvarchar) - הערות
- OrderEmail (nvarchar) - דוא"ל להזמנות
- PaymentTerms (nvarchar) - תנאי תשלום
- Phone (nvarchar) - טלפון
- PrimaryContact (nvarchar) - איש קשר ראשי
- PrimaryCurrency (varchar) - מטבע ראשי
- ProductCategories (nvarchar) - קטגוריות מוצרים
- Status (varchar) - סטטוס
- SupplierName (nvarchar) - שם ספק
- SupplierRating (varchar) - דירוג ספק
- SupplierType (varchar) - סוג ספק
- TaxID (nvarchar) - מספר עוסק
- Website (nvarchar) - אתר אינטרנט

### subs_PurchaseOrders - הזמנות רכש
- OrderID (int) - מזהה הזמנה (PK)
- CompanyId (int) - מזהה חברה (FK)
- ContactPerson (nvarchar) - איש קשר
- Currency (varchar) - מטבע
- DeliveryDate (date) - תאריך אספקה
- Documents (nvarchar) - מסמכים
- ExchangeRate (decimal) - שער חליפין
- InvoiceDate (date) - תאריך חשבונית
- InvoiceNumber (nvarchar) - מספר חשבונית
- IsActive (bit) - פעיל
- IsDeleted (bit) - נמחק
- Notes (nvarchar) - הערות
- OrderDate (datetime) - תאריך הזמנה
- OrderNumber (nvarchar) - מספר הזמנה
- PaymentTerms (nvarchar) - תנאי תשלום
- ShippingAddress (nvarchar) - כתובת משלוח
- ShippingCost (decimal) - עלות משלוח
- ShippingMethod (nvarchar) - שיטת משלוח
- Status (varchar) - סטטוס
- SubTotal (decimal) - סכום ביניים
- SupplierConfirmation (nvarchar) - אישור ספק
- SupplierID (int) - מזהה ספק (FK)
- TotalAmount (decimal) - סכום כולל
- VAT (decimal) - מע"מ

### subs_ProductInventory - מלאי מוצרים
- ProductInventoryID (int) - מזהה מלאי (PK)
- ActiveLocations (nvarchar) - מיקומים פעילים
- AutoUpdateFromPool (bit) - עדכון אוטומטי
- AvailableStock (int) - מלאי זמין
- AverageLeadTime (int) - זמן אספקה ממוצע
- AverageStockCost (decimal) - עלות מלאי ממוצעת
- CompanyId (int) - מזהה חברה (FK)
- ConsoleID (int) - מזהה קונסולה (FK)
- DamagedStock (int) - מלאי פגום
- InTransitStock (int) - מלאי בדרך
- InventoryType (varchar) - סוג מלאי
- IsActive (bit) - פעיל
- IsDeleted (bit) - נמחק
- LastCountDate (date) - תאריך ספירה אחרונה
- MaxStock (int) - מלאי מקסימלי
- MinStock (int) - מלאי מינימלי
- OptimalOrderQty (int) - כמות הזמנה אופטימלית
- PrimaryWarehouse (nvarchar) - מחסן ראשי
- ProductID (int) - מזהה מוצר (FK)
- ReorderPoint (int) - נקודת הזמנה מחדש
- ReservedStock (int) - מלאי שמור
- SafetyStock (int) - מלאי בטיחות
- TotalStock (int) - סך מלאי
- TurnoverRate (decimal) - קצב מחזור

### subs_StockMovements - תנועות מלאי
- MovementID (int) - מזהה תנועה (PK)
- ApprovedBy (nvarchar) - אושר על ידי
- BatchNumber (nvarchar) - מספר אצווה
- CompanyId (int) - מזהה חברה (FK)
- DocumentNumber (nvarchar) - מספר מסמך
- ExpiryDate (date) - תאריך תפוגה
- IsActive (bit) - פעיל
- IsDeleted (bit) - נמחק
- MovementDate (datetime) - תאריך תנועה
- MovementType (varchar) - סוג תנועה
- Notes (nvarchar) - הערות
- PerformedBy (nvarchar) - בוצע על ידי
- ProductID (int) - מזהה מוצר (FK)
- Quantity (decimal) - כמות
- ReasonCode (nvarchar) - קוד סיבה
- SerialNumber (nvarchar) - מספר סידורי
- SourceDocument (nvarchar) - מסמך מקור
- SourceLocation (int) - מיקום מקור (FK)
- SourceWarehouse (int) - מחסן מקור (FK)
- Status (varchar) - סטטוס
- TargetLocation (int) - מיקום יעד (FK)
- TargetWarehouse (int) - מחסן יעד (FK)
- TotalValue (decimal) - ערך כולל
- UnitCost (decimal) - עלות יחידה

### subs_Warehouses - מחסנים
- WarehouseID (int) - מזהה מחסן (PK)
- Address (nvarchar) - כתובת
- AvailableCapacity (decimal) - קיבולת פנויה
- ClimateControlled (bit) - בקרת אקלים
- CompanyId (int) - מזהה חברה (FK)
- ContactPerson (nvarchar) - איש קשר
- Email (nvarchar) - דוא"ל
- GPSCoordinates (nvarchar) - קואורדינטות GPS
- Insurance (nvarchar) - ביטוח
- IsActive (bit) - פעיל
- IsDeleted (bit) - נמחק
- OpeningDate (date) - תאריך פתיחה
- OperatingHours (nvarchar) - שעות פעילות
- Phone (nvarchar) - טלפון
- SecurityLevel (nvarchar) - רמת אבטחה
- SpecialEquipment (nvarchar) - ציוד מיוחד
- Status (varchar) - סטטוס
- StorageCost (decimal) - עלות אחסון
- StorageZones (nvarchar) - אזורי אחסון
- TotalCapacity (decimal) - קיבולת כוללת
- WarehouseName (nvarchar) - שם מחסן
- WarehouseType (varchar) - סוג מחסן

## טבלאות נוספות במערכת

### subs_BillingCycles - מחזורי חיוב
### subs_CompanySizes - גדלי חברות
### subs_Consoles - קונסולות ניהול
### subs_Currencies - מטבעות
### subs_Customers - לקוחות
### subs_CustomerTypes - סוגי לקוחות
### subs_Languages - שפות
### subs_LicensePool - מאגר רישיונות
### subs_Licenses - רישיונות
### subs_LicenseStatuses - סטטוסי רישיון
### subs_PriceHistory - היסטוריית מחירים
### subs_Priorities - עדיפויות
### subs_ProductCategories - קטגוריות מוצרים
### subs_ProductConsoleMapping - מיפוי מוצרים-קונסולות
### subs_ProductFiles - קבצי מוצרים
### subs_ProductInstallationFiles - קבצי התקנה
### subs_ProductLicenseTypes - סוגי רישיונות מוצר
### subs_ProductPhysical - מאפיינים פיזיים
### subs_PurchaseRequestItems - פריטי בקשת רכש
### subs_PurchaseRequests - בקשות רכש
### subs_StorageLocations - מיקומי אחסון
### subs_SupplierProducts - מוצרי ספקים
