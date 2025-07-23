# דיאגרמת סקירה כללית של המערכת

## 🏗️ ארכיטקטורת המערכת

```mermaid
graph TB
    subgraph "ממשק משתמש"
        UI[דפדפן - Bootstrap 5 RTL]
    end
    
    subgraph "שכבת לוגיקה"
        API[API Server]
        BL[Business Logic]
    end
    
    subgraph "מסד נתונים"
        DB[(MySQL Database)]
    end
    
    subgraph "מודולים ראשיים"
        M1[ניהול ספקים]
        M2[בקשות הצעת מחיר]
        M3[הזמנות רכש]
        M4[קליטת סחורה]
        M5[דוחות וניתוחים]
    end
    
    UI --> API
    API --> BL
    BL --> DB
    
    BL --> M1
    BL --> M2
    BL --> M3
    BL --> M4
    BL --> M5
    
    style UI fill:#00bf63,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#011939,stroke:#333,stroke-width:2px,color:#fff
```

## 🔄 תהליך עבודה ראשי

```mermaid
flowchart LR
    A[דרישת רכש] --> B{בדיקת מלאי}
    B -->|חסר| C[יצירת RFQ]
    B -->|קיים| Z[סיום]
    
    C --> D[שליחה לספקים]
    D --> E[קבלת הצעות]
    E --> F[השוואה ובחירה]
    F --> G[יצירת הזמנה]
    G --> H[אישורים]
    H --> I[שליחה לספק]
    I --> J[קליטת סחורה]
    J --> K[עדכון מלאי]
    K --> L[תשלום]
    L --> Z
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style Z fill:#9f9,stroke:#333,stroke-width:2px
```

## 📊 היררכיית משתמשים והרשאות

```mermaid
graph TD
    Admin[מנהל מערכת]
    PM[מנהל רכש]
    PU[רוכש]
    WM[מחסנאי]
    ACC[הנהלת חשבונות]
    
    Admin --> PM
    Admin --> ACC
    PM --> PU
    PM --> WM
    
    Admin -.-> |ניהול משתמשים| Users[(משתמשים)]
    PM -.-> |ניהול ספקים| Suppliers[(ספקים)]
    PU -.-> |יצירת הזמנות| Orders[(הזמנות)]
    WM -.-> |קליטת סחורה| Inventory[(מלאי)]
    ACC -.-> |תשלומים| Payments[(תשלומים)]
```

## 🔗 אינטגרציות חיצוניות

```mermaid
graph LR
    subgraph "מערכת רכש"
        PROC[מערכת רכש]
    end
    
    subgraph "מערכות חיצוניות"
        ERP[ERP ראשי]
        INV[מערכת מלאי]
        FIN[מערכת פיננסית]
        EMAIL[שרת דוא"ל]
        SMS[שירות SMS]
    end
    
    PROC <--> ERP
    PROC --> INV
    PROC <--> FIN
    PROC --> EMAIL
    PROC --> SMS
    
    style PROC fill:#667eea,stroke:#333,stroke-width:4px,color:#fff
```

## 🎯 KPIs ומדדי ביצוע

```mermaid
pie title התפלגות הזמנות לפי סטטוס
    "הושלמו" : 65
    "בתהליך" : 20
    "ממתינות לאישור" : 10
    "בוטלו" : 5
```

## 🔐 אבטחת מידע

```mermaid
flowchart TD
    U[משתמש] --> AUTH{אימות}
    AUTH -->|הצלחה| ROLE[בדיקת הרשאות]
    AUTH -->|כישלון| DENY[גישה נדחתה]
    
    ROLE --> |מורשה| ACCESS[גישה למודול]
    ROLE --> |לא מורשה| DENY
    
    ACCESS --> LOG[רישום פעולה]
    LOG --> ACTION[ביצוע פעולה]
    
    style DENY fill:#f66,stroke:#333,stroke-width:2px
    style ACCESS fill:#6f6,stroke:#333,stroke-width:2px
```

## 📈 מחזור חיי ספק

```mermaid
stateDiagram-v2
    [*] --> פוטנציאלי
    פוטנציאלי --> בבדיקה
    בבדיקה --> ממתין_לאישור
    ממתין_לאישור --> פעיל
    ממתין_לאישור --> נדחה
    
    פעיל --> מושעה
    מושעה --> פעיל
    
    פעיל --> לא_פעיל
    מושעה --> לא_פעיל
    נדחה --> [*]
    לא_פעיל --> [*]
    
    note right of פעיל : ספק פעיל יכול לקבל הזמנות
    note right of מושעה : השעיה זמנית עקב בעיות
```

## 🔄 מחזור חיי הזמנה

```mermaid
journey
    title מסע הזמנת רכש
    section יצירה
      יצירת טיוטה: 5: רוכש
      הוספת פריטים: 4: רוכש
      בחירת ספק: 5: רוכש
    section אישורים
      אישור מנהל: 3: מנהל
      אישור כספים: 2: כספים
      אישור סופי: 4: מנהל רכש
    section ביצוע
      שליחה לספק: 5: מערכת
      אישור ספק: 4: ספק
      משלוח: 3: ספק
    section סיום
      קליטת סחורה: 4: מחסנאי
      אישור חשבונית: 4: כספים
      תשלום: 5: כספים
```

## 🏢 מבנה ארגוני

```mermaid
graph TD
    CEO[מנכ"ל]
    CFO[סמנכ"ל כספים]
    COO[סמנכ"ל תפעול]
    
    CEO --> CFO
    CEO --> COO
    
    CFO --> ACC[מחלקת חשבונות]
    CFO --> BUD[מחלקת תקציב]
    
    COO --> PROC[מחלקת רכש]
    COO --> LOG[מחלקת לוגיסטיקה]
    
    PROC --> PM[מנהל רכש]
    PROC --> PU1[רוכש 1]
    PROC --> PU2[רוכש 2]
    
    LOG --> WM[מנהל מחסן]
    LOG --> WK1[מחסנאי 1]
    LOG --> WK2[מחסנאי 2]
    
    style CEO fill:#f96,stroke:#333,stroke-width:2px
    style PROC fill:#96f,stroke:#333,stroke-width:2px
```

## 📊 Dashboard נתונים

```mermaid
graph LR
    subgraph "נתונים בזמן אמת"
        RT1[הזמנות פתוחות: 47]
        RT2[ספקים פעילים: 124]
        RT3[משלוחים היום: 12]
        RT4[התראות: 8]
    end
    
    subgraph "ניתוחים"
        AN1[חיסכון חודשי: 15%]
        AN2[זמן ממוצע: 3.2 ימים]
        AN3[דירוג ספקים: 4.2]
    end
    
    subgraph "תחזיות"
        FC1[צפי הוצאות: 500K]
        FC2[מגמת מחירים: ↑5%]
        FC3[עומס צפוי: גבוה]
    end
```

## 🚀 Roadmap פיתוח

```mermaid
gantt
    title תוכנית פיתוח מערכת רכש
    dateFormat  YYYY-MM-DD
    section Phase 1
    תשתית ו-DB     :done, des1, 2024-01-01, 7d
    ניהול ספקים    :done, des2, after des1, 14d
    section Phase 2
    תהליכי רכש      :active, des3, after des2, 14d
    קליטת סחורה    :des4, after des3, 7d
    section Phase 3
    דוחות          :des5, after des4, 7d
    אינטגרציות     :des6, after des5, 14d
    section Phase 4
    פורטל ספקים    :des7, after des6, 21d
    AI וחיזוי       :des8, after des7, 14d
```

---

## 🛠️ הוראות שימוש

### להצגת דיאגרמות Mermaid:

1. **GitHub** - מציג אוטומטית
2. **VS Code** - התקן תוסף Mermaid Preview
3. **Online** - השתמש ב- [mermaid.live](https://mermaid.live)
4. **Export** - ייצוא כ-PNG/SVG

### עדכון דיאגרמות:

```bash
# Clone the repo
git clone [repo-url]

# Edit diagrams
cd workflows/diagrams
edit system-overview.md

# Preview changes
# Use VS Code with Mermaid extension
```

---

צור על ידי: מערכת ניהול רכש ERP | תאריך: ינואר 2025
