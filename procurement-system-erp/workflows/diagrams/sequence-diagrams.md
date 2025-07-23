# תרשימי רצף - Sequence Diagrams

## 🔄 תרשים רצף - תהליך התחברות למערכת

```mermaid
sequenceDiagram
    participant U as משתמש
    participant B as דפדפן
    participant F as Frontend
    participant A as Auth Server
    participant D as Database
    participant S as Session Store
    
    U->>B: הזנת שם משתמש וסיסמה
    B->>F: שליחת פרטי התחברות
    F->>F: ולידציה בסיסית
    F->>A: בקשת אימות (HTTPS)
    A->>D: בדיקת פרטי משתמש
    D-->>A: תוצאת בדיקה
    
    alt אימות מוצלח
        A->>S: יצירת Session
        A->>A: יצירת JWT Token
        A-->>F: החזרת Token + פרטי משתמש
        F->>B: שמירת Token בלקוח
        F-->>U: הפניה לדשבורד
    else אימות נכשל
        A-->>F: שגיאת אימות
        F-->>U: הודעת שגיאה
    end
    
    Note over U,S: כל התקשורת מוצפנת ב-HTTPS
```

## 📋 תרשים רצף - יצירת הזמנת רכש

```mermaid
sequenceDiagram
    participant R as רוכש
    participant UI as ממשק משתמש
    participant API as API Server
    participant BL as Business Logic
    participant DB as Database
    participant WF as Workflow Engine
    participant N as Notification Service
    participant M as מנהל
    
    R->>UI: יצירת הזמנה חדשה
    UI->>API: POST /api/orders/create
    API->>BL: validateOrder()
    BL->>DB: checkBudget()
    DB-->>BL: יתרת תקציב
    
    alt תקציב זמין
        BL->>DB: createOrder()
        DB-->>BL: Order ID
        BL->>WF: startApprovalWorkflow()
        WF->>DB: getApprovalRules()
        DB-->>WF: כללי אישור
        WF->>N: sendApprovalRequest()
        N->>M: התראת אישור
        BL-->>API: הזמנה נוצרה
        API-->>UI: מספר הזמנה
        UI-->>R: אישור יצירה
    else תקציב לא מספיק
        BL-->>API: שגיאת תקציב
        API-->>UI: הודעת שגיאה
        UI-->>R: תקציב לא מספיק
    end
    
    Note over R,M: תהליך אישורים ממשיך במקביל
```

## 🔍 תרשים רצף - תהליך RFQ מלא

```mermaid
sequenceDiagram
    participant U as משתמש
    participant S as מערכת
    participant SP1 as ספק 1
    participant SP2 as ספק 2
    participant SP3 as ספק 3
    participant E as Email Service
    participant D as Database
    
    U->>S: יצירת RFQ חדש
    S->>D: שמירת פרטי RFQ
    D-->>S: RFQ ID
    
    U->>S: בחירת ספקים
    S->>D: שליפת פרטי ספקים
    D-->>S: רשימת ספקים
    
    U->>S: שליחת RFQ
    
    par שליחה לספקים
        S->>E: הכנת מייל לספק 1
        E->>SP1: RFQ Email
    and
        S->>E: הכנת מייל לספק 2
        E->>SP2: RFQ Email
    and
        S->>E: הכנת מייל לספק 3
        E->>SP3: RFQ Email
    end
    
    S->>D: עדכון סטטוס "נשלח"
    
    Note over SP1,SP3: ספקים מכינים הצעות
    
    SP1->>S: הגשת הצעה
    S->>D: שמירת הצעה
    S->>U: התראה - הצעה התקבלה
    
    SP2->>S: הגשת הצעה
    S->>D: שמירת הצעה
    S->>U: התראה - הצעה התקבלה
    
    SP3->>S: בקשת הבהרה
    S->>U: העברת שאלה
    U->>S: תשובה
    S->>SP3: העברת תשובה
    SP3->>S: הגשת הצעה
    
    U->>S: צפייה בהשוואת הצעות
    S->>D: שליפת כל ההצעות
    D-->>S: נתוני הצעות
    S->>S: חישוב השוואה
    S-->>U: טבלת השוואה
    
    U->>S: בחירת ספק זוכה
    S->>D: עדכון זוכה
    
    par הודעות לספקים
        S->>SP1: הודעת דחייה
    and
        S->>SP2: הודעת זכייה
    and
        S->>SP3: הודעת דחייה
    end
```

## 📦 תרשים רצף - קליטת סחורה

```mermaid
sequenceDiagram
    participant D as נהג משלוחים
    participant W as מחסנאי
    participant M as מערכת ניידת
    participant S as שרת
    participant DB as Database
    participant I as מערכת מלאי
    participant F as מערכת פיננסית
    
    D->>W: הגעת משלוח
    W->>M: פתיחת תהליך קליטה
    M->>S: GET /api/pending-deliveries
    S->>DB: שליפת משלוחים צפויים
    DB-->>S: רשימת הזמנות
    S-->>M: הצגת הזמנות
    
    W->>M: סריקת תעודת משלוח
    M->>S: validateDelivery()
    S->>DB: אימות מול הזמנה
    DB-->>S: פרטי הזמנה
    
    loop לכל פריט
        W->>M: סריקת ברקוד
        M->>S: checkItem()
        S-->>M: פרטי פריט
        W->>M: הזנת כמות שהתקבלה
        
        alt פריט תקין
            M->>M: סימון תקין
        else פריט פגום
            W->>M: דיווח על בעיה
            M->>M: צילום + הערה
        end
    end
    
    W->>M: סיום קליטה
    M->>S: submitReceipt()
    
    S->>DB: עדכון קליטה
    S->>I: updateInventory()
    I-->>S: אישור עדכון
    
    alt קליטה מלאה
        S->>F: releasePayment()
        F-->>S: אישור לתשלום
    else קליטה חלקית
        S->>S: createDiscrepancyReport()
        S->>DB: שמירת דוח חריגות
    end
    
    S-->>M: אישור קליטה
    M-->>W: הצגת סיכום
    W->>D: חתימה דיגיטלית
```

## 🏆 תרשים רצף - הערכת ספק

```mermaid
sequenceDiagram
    participant T as טיימר מערכת
    participant S as Scheduler
    participant E as Evaluation Engine
    participant DB as Database
    participant C as Calculation Service
    participant N as Notification Service
    participant M as מנהל רכש
    participant SUP as ספק
    
    T->>S: טריגר רבעוני
    S->>DB: getSuppliersDueForEvaluation()
    DB-->>S: רשימת ספקים
    
    loop לכל ספק
        S->>E: startEvaluation(supplierId)
        E->>DB: getSupplierMetrics()
        DB-->>E: נתוני ביצוע
        
        par חישובים מקבילים
            E->>C: calculateQualityScore()
        and
            E->>C: calculateDeliveryScore()
        and
            E->>C: calculatePriceScore()
        and
            E->>C: calculateServiceScore()
        end
        
        C-->>E: ציונים מחושבים
        E->>E: calculateOverallScore()
        E->>DB: saveEvaluationResults()
        
        alt ציון נמוך מ-3
            E->>N: sendLowScoreAlert()
            N->>M: התראה דחופה
        else ציון 3-4
            E->>N: sendImprovementNotice()
            N->>SUP: הודעת שיפור
        else ציון מעל 4
            E->>N: sendAppreciation()
            N->>SUP: מכתב הערכה
        end
    end
    
    S->>E: generateSummaryReport()
    E->>DB: aggregateResults()
    DB-->>E: סיכום תוצאות
    E->>N: sendManagementReport()
    N->>M: דוח מנהלים
```

## 💰 תרשים רצף - תהליך תשלום

```mermaid
sequenceDiagram
    participant S as מערכת רכש
    participant V as Validation Service
    participant F as מערכת פיננסית
    participant B as בנק/תשלומים
    participant SUP as ספק
    participant A as רואה חשבון
    
    S->>V: validateInvoice()
    V->>V: בדיקת התאמה להזמנה
    V->>V: בדיקת קליטת סחורה
    
    alt חשבונית תקינה
        V-->>S: אישור תקינות
        S->>F: createPaymentRequest()
        F->>F: checkBudgetAvailability()
        F->>A: requestApproval()
        A-->>F: אישור תשלום
        
        F->>B: initiatePayment()
        B->>B: processTransaction()
        B-->>F: transactionId
        B->>SUP: העברה בנקאית
        
        F->>S: updatePaymentStatus()
        S->>SUP: הודעת תשלום
        
    else חשבונית לא תקינה
        V-->>S: רשימת בעיות
        S->>SUP: בקשת תיקון
        Note over S,SUP: ממתין לחשבונית מתוקנת
    end
```

## 🔔 תרשים רצף - מערכת התראות

```mermaid
sequenceDiagram
    participant E as Event Source
    participant Q as Message Queue
    participant P as Processor
    participant R as Rules Engine
    participant DB as Database
    participant N as Notification Channels
    participant U as Users
    
    E->>Q: publishEvent()
    Note right of E: אירועים:<br/>- הזמנה חדשה<br/>- איחור במשלוח<br/>- חריגת תקציב
    
    Q->>P: consumeEvent()
    P->>R: evaluateRules(event)
    R->>DB: getRulesForEventType()
    DB-->>R: רשימת כללים
    
    R->>R: checkConditions()
    
    alt תנאים מתקיימים
        R->>DB: getSubscribers()
        DB-->>R: רשימת נמענים
        
        par שליחת התראות
            R->>N: sendEmail()
            N->>U: מייל
        and
            R->>N: sendSMS()
            N->>U: SMS
        and
            R->>N: pushNotification()
            N->>U: התראת אפליקציה
        and
            R->>N: systemAlert()
            N->>U: התראת מערכת
        end
        
        R->>DB: logNotifications()
    else תנאים לא מתקיימים
        R->>DB: logSkipped()
    end
```

## 🔄 תרשים רצף - סנכרון נתונים

```mermaid
sequenceDiagram
    participant PS as Procurement System
    participant Q as Queue Manager
    participant IS as Integration Service
    participant ERP as ERP System
    participant INV as Inventory System
    participant FIN as Financial System
    participant LOG as Log Service
    
    PS->>Q: publishDataChange()
    Note right of PS: שינויים:<br/>- הזמנה חדשה<br/>- עדכון ספק<br/>- קליטת סחורה
    
    Q->>IS: processMessage()
    IS->>IS: transformData()
    
    par סנכרון מקביל
        IS->>ERP: updateERP()
        ERP->>ERP: validateData()
        ERP-->>IS: acknowledgment
    and
        IS->>INV: updateInventory()
        INV->>INV: adjustStock()
        INV-->>IS: confirmation
    and
        IS->>FIN: updateFinancials()
        FIN->>FIN: postTransaction()
        FIN-->>IS: status
    end
    
    IS->>LOG: logSyncResults()
    
    alt כל המערכות סונכרנו בהצלחה
        IS->>PS: syncComplete()
        PS->>PS: updateSyncStatus()
    else כשל בסנכרון
        IS->>Q: retryMessage()
        IS->>LOG: logError()
        IS->>PS: syncFailed()
    end
```

## 🛡️ תרשים רצף - אבטחה והרשאות

```mermaid
sequenceDiagram
    participant C as Client
    participant G as API Gateway
    participant A as Auth Service
    participant P as Permission Service
    participant R as Resource Server
    participant L as Audit Log
    
    C->>G: API Request + JWT
    G->>A: validateToken()
    A->>A: checkExpiry()
    A->>A: verifySignature()
    
    alt Token תקף
        A-->>G: userId + roles
        G->>P: checkPermissions()
        P->>P: evaluateRoles()
        P->>P: checkResourceAccess()
        
        alt מורשה
            P-->>G: accessGranted
            G->>R: forwardRequest()
            R->>R: processRequest()
            R-->>G: response
            G-->>C: data
            G->>L: logAccess()
        else לא מורשה
            P-->>G: accessDenied
            G-->>C: 403 Forbidden
            G->>L: logUnauthorized()
        end
    else Token לא תקף
        A-->>G: invalidToken
        G-->>C: 401 Unauthorized
        G->>L: logInvalidToken()
    end
```

## 📊 תרשים רצף - יצירת דוח

```mermaid
sequenceDiagram
    participant U as משתמש
    participant UI as ממשק
    participant RS as Report Service
    participant QE as Query Engine
    participant DB as Database
    participant CS as Cache Service
    participant GS as Generation Service
    participant FS as File Storage
    
    U->>UI: בחירת סוג דוח
    UI->>UI: הגדרת פרמטרים
    UI->>RS: generateReport()
    
    RS->>CS: checkCache()
    
    alt דוח קיים במטמון
        CS-->>RS: cachedReport
        RS-->>UI: reportUrl
    else דוח לא קיים
        RS->>QE: buildQuery()
        QE->>DB: executeQuery()
        DB-->>QE: resultSet
        QE->>QE: aggregateData()
        QE-->>RS: processedData
        
        RS->>GS: createReport()
        
        par יצירת פורמטים
            GS->>GS: generatePDF()
        and
            GS->>GS: generateExcel()
        and
            GS->>GS: generateChart()
        end
        
        GS->>FS: saveReport()
        FS-->>GS: fileUrl
        GS-->>RS: reportUrl
        
        RS->>CS: cacheReport()
        RS-->>UI: reportUrl
    end
    
    UI-->>U: הצגת דוח
```

---

## 🔧 כללי תרשימי רצף

### סימונים:
- **Participant** - משתתף בתהליך
- **->** - קריאה סינכרונית
- **->>** - קריאה אסינכרונית  
- **-->>** - תגובה/החזרת ערך
- **alt/else** - תנאים
- **loop** - לולאה
- **par** - פעולות מקביליות
- **Note** - הערה

### עקרונות:
1. **בהירות** - שמות ברורים למשתתפים
2. **פשטות** - לא יותר מ-8 משתתפים
3. **רצף לוגי** - מלמעלה למטה
4. **טיפול בשגיאות** - הצגת מקרי קצה

---

תאריך יצירה: ינואר 2025 | גרסה: 1.0
