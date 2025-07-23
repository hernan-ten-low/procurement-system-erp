# דיאגרמת זרימת נתונים - Data Flow Diagram (DFD)

## 🔄 DFD רמה 0 - Context Diagram

```mermaid
graph TB
    subgraph "גורמים חיצוניים"
        SUP[ספקים]
        USR[משתמשי מערכת]
        FIN[מערכת פיננסית]
        INV[מערכת מלאי]
    end
    
    subgraph "מערכת רכש"
        SYS((מערכת ניהול<br/>רכש וספקים))
    end
    
    USR -->|בקשות רכש| SYS
    USR -->|נתוני ספקים| SYS
    SYS -->|הזמנות רכש| SUP
    SUP -->|הצעות מחיר| SYS
    SUP -->|חשבוניות| SYS
    SYS -->|עדכוני מלאי| INV
    SYS -->|נתוני תשלום| FIN
    FIN -->|אישורי תשלום| SYS
    INV -->|מצב מלאי| SYS
    
    style SYS fill:#667eea,stroke:#333,stroke-width:3px,color:#fff
```

## 📊 DFD רמה 1 - תהליכים ראשיים

```mermaid
graph TB
    subgraph "External Entities"
        E1[משתמשים]
        E2[ספקים]
        E3[מערכות חיצוניות]
    end
    
    subgraph "Main Processes"
        P1((1.0<br/>ניהול ספקים))
        P2((2.0<br/>ניהול RFQ))
        P3((3.0<br/>ניהול הזמנות))
        P4((4.0<br/>קליטת סחורה))
        P5((5.0<br/>דוחות))
    end
    
    subgraph "Data Stores"
        D1[(ספקים)]
        D2[(הצעות מחיר)]
        D3[(הזמנות)]
        D4[(מלאי)]
        D5[(היסטוריה)]
    end
    
    E1 -->|פרטי ספק| P1
    P1 -->|נתוני ספק| D1
    
    E1 -->|בקשת הצעה| P2
    P2 -->|שליחת RFQ| E2
    E2 -->|הצעות| P2
    P2 -->|שמירת הצעות| D2
    
    D2 -->|הצעה נבחרת| P3
    P3 -->|יצירת הזמנה| D3
    P3 -->|הזמנה| E2
    
    E2 -->|משלוח| P4
    P4 -->|עדכון| D4
    P4 -->|אישור קבלה| E2
    
    D1 --> P5
    D2 --> P5
    D3 --> P5
    D4 --> P5
    P5 -->|דוחות| E1
    
    D5 -.->|היסטוריה| P5
    P1 -.->|לוג| D5
    P2 -.->|לוג| D5
    P3 -.->|לוג| D5
    P4 -.->|לוג| D5
```

## 🔍 DFD רמה 2 - פירוט תהליך RFQ

```mermaid
graph TB
    subgraph "תהליך 2.0 - ניהול RFQ"
        P21((2.1<br/>יצירת RFQ))
        P22((2.2<br/>בחירת ספקים))
        P23((2.3<br/>שליחת בקשות))
        P24((2.4<br/>קבלת הצעות))
        P25((2.5<br/>השוואת הצעות))
        P26((2.6<br/>בחירת זוכה))
    end
    
    subgraph "נתונים"
        D21[(טמפלטים)]
        D22[(רשימת ספקים)]
        D23[(הצעות פעילות)]
        D24[(היסטוריית מחירים)]
    end
    
    subgraph "כניסות/יציאות"
        IN1[דרישת רכש]
        OUT1[הזמנת רכש]
        SUPP[ספקים]
    end
    
    IN1 --> P21
    D21 --> P21
    P21 --> P22
    D22 --> P22
    P22 --> P23
    P23 -->|RFQ| SUPP
    SUPP -->|הצעות| P24
    P24 --> D23
    D23 --> P25
    D24 --> P25
    P25 --> P26
    P26 --> OUT1
```

## 💾 זרימת נתונים במסד הנתונים

```mermaid
flowchart LR
    subgraph "Input Layer"
        UI[ממשק משתמש]
        API[API Endpoints]
    end
    
    subgraph "Processing Layer"
        VAL{ולידציה}
        BL[לוגיקה עסקית]
        TRANS[טרנזקציות]
    end
    
    subgraph "Data Layer"
        CACHE[(זיכרון מטמון)]
        DB[(מסד נתונים)]
        BACKUP[(גיבויים)]
    end
    
    UI --> API
    API --> VAL
    VAL -->|תקין| BL
    VAL -->|שגוי| UI
    BL --> TRANS
    TRANS --> DB
    DB --> CACHE
    CACHE --> BL
    DB --> BACKUP
    
    style VAL fill:#ffa,stroke:#333,stroke-width:2px
    style DB fill:#aaf,stroke:#333,stroke-width:2px
```

## 🔐 זרימת אבטחת מידע

```mermaid
sequenceDiagram
    participant U as משתמש
    participant F as Frontend
    participant A as Auth Server
    participant B as Backend
    participant D as Database
    
    U->>F: כניסה למערכת
    F->>A: בקשת אימות
    A->>A: בדיקת פרטים
    A-->>F: JWT Token
    F->>B: בקשת נתונים + Token
    B->>B: אימות Token
    B->>B: בדיקת הרשאות
    B->>D: שאילתת נתונים
    D-->>B: תוצאות
    B-->>F: נתונים מוצפנים
    F-->>U: הצגת מידע
    
    Note over U,D: כל התקשורת מוצפנת HTTPS
```

## 📈 זרימת נתונים סטטיסטיים

```mermaid
graph LR
    subgraph "איסוף נתונים"
        T1[תנועות מלאי]
        T2[הזמנות רכש]
        T3[ביצועי ספקים]
        T4[נתוני כספים]
    end
    
    subgraph "עיבוד"
        AGG[צבירת נתונים]
        CALC[חישובים]
        TREND[ניתוח מגמות]
    end
    
    subgraph "הצגה"
        DASH[דשבורד]
        REP[דוחות]
        ALERT[התראות]
    end
    
    T1 --> AGG
    T2 --> AGG
    T3 --> AGG
    T4 --> AGG
    
    AGG --> CALC
    CALC --> TREND
    
    TREND --> DASH
    TREND --> REP
    TREND --> ALERT
    
    style AGG fill:#f9f,stroke:#333,stroke-width:2px
    style TREND fill:#9ff,stroke:#333,stroke-width:2px
```

## 🔄 תהליך סנכרון נתונים

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Checking: טיימר/טריגר
    Checking --> Syncing: יש שינויים
    Checking --> Idle: אין שינויים
    Syncing --> Validating: העברת נתונים
    Validating --> Success: תקין
    Validating --> Error: שגיאה
    Success --> Idle: סיום
    Error --> Retry: ניסיון חוזר
    Retry --> Syncing: ניסיון נוסף
    Retry --> Failed: כישלון
    Failed --> Alert: התראה
    Alert --> Idle: טיפול ידני
```

## 🌐 זרימת נתונים בין מודולים

```mermaid
graph TB
    subgraph "Frontend Modules"
        F1[ניהול ספקים]
        F2[הזמנות רכש]
        F3[קליטת סחורה]
        F4[דוחות]
    end
    
    subgraph "Shared Services"
        AUTH[אימות והרשאות]
        NOTIF[התראות]
        LOG[לוגים]
        CACHE[מטמון]
    end
    
    subgraph "Backend Services"
        B1[Supplier Service]
        B2[Order Service]
        B3[Inventory Service]
        B4[Report Service]
    end
    
    F1 <--> B1
    F2 <--> B2
    F3 <--> B3
    F4 <--> B4
    
    B1 --> CACHE
    B2 --> CACHE
    B3 --> CACHE
    B4 --> CACHE
    
    AUTH --> B1
    AUTH --> B2
    AUTH --> B3
    AUTH --> B4
    
    B1 --> LOG
    B2 --> LOG
    B3 --> LOG
    B4 --> LOG
    
    B1 --> NOTIF
    B2 --> NOTIF
    B3 --> NOTIF
    
    style AUTH fill:#faa,stroke:#333,stroke-width:2px
    style CACHE fill:#afa,stroke:#333,stroke-width:2px
```

## 📊 מחזור חיי נתונים

```mermaid
journey
    title מסע של רשומת הזמנה
    section יצירה
      נתונים ראשוניים: 5: משתמש
      ולידציה: 3: מערכת
      שמירה ב-DB: 5: מערכת
    section עיבוד
      חישובים: 4: מערכת
      עדכונים: 4: משתמש
      אישורים: 3: מנהלים
    section שימוש
      הצגה בדוחות: 5: משתמשים
      ניתוחים: 4: מערכת
      החלטות: 5: מנהלים
    section ארכיון
      גיבוי: 5: מערכת
      דחיסה: 4: מערכת
      שמירה לטווח ארוך: 5: מערכת
```

## 🔍 פירוט זרימת קליטת סחורה

```mermaid
flowchart TD
    START([משלוח מגיע])
    
    SCAN[סריקת תעודת משלוח]
    VERIFY{אימות מול הזמנה}
    
    CHECK[בדיקה פיזית]
    ISSUES{יש בעיות?}
    
    REPORT[דיווח בעיות]
    UPDATE_PARTIAL[עדכון קליטה חלקית]
    
    UPDATE_FULL[עדכון קליטה מלאה]
    
    QUALITY[בדיקת איכות]
    QUALITY_OK{איכות תקינה?}
    
    REJECT[דחיית פריטים]
    ACCEPT[אישור סופי]
    
    UPDATE_INV[עדכון מלאי]
    NOTIFY[שליחת התראות]
    
    END([סיום תהליך])
    
    START --> SCAN
    SCAN --> VERIFY
    VERIFY -->|לא תואם| REPORT
    VERIFY -->|תואם| CHECK
    CHECK --> ISSUES
    ISSUES -->|כן| REPORT
    ISSUES -->|לא| UPDATE_FULL
    REPORT --> UPDATE_PARTIAL
    UPDATE_PARTIAL --> QUALITY
    UPDATE_FULL --> QUALITY
    QUALITY --> QUALITY_OK
    QUALITY_OK -->|לא| REJECT
    QUALITY_OK -->|כן| ACCEPT
    REJECT --> UPDATE_INV
    ACCEPT --> UPDATE_INV
    UPDATE_INV --> NOTIFY
    NOTIFY --> END
    
    style START fill:#9f9,stroke:#333,stroke-width:2px
    style END fill:#f99,stroke:#333,stroke-width:2px
    style ISSUES fill:#ff9,stroke:#333,stroke-width:2px
    style QUALITY_OK fill:#ff9,stroke:#333,stroke-width:2px
```

## 💡 המלצות לאופטימיזציה

```mermaid
mindmap
  root((אופטימיזציה))
    ביצועים
      אינדקסים
      קאשינג
      Lazy Loading
      CDN
    אבטחה
      הצפנה
      אימות דו-שלבי
      מניעת SQL Injection
      HTTPS
    ניטור
      לוגים
      מעקב שגיאות
      ניתוח ביצועים
      התראות
    גיבויים
      יומי
      שבועי
      חודשי
      DR Site
```

---

## 📝 הערות טכניות

1. **Caching Strategy**: שימוש ב-Redis לשמירת נתונים זמניים
2. **Message Queue**: RabbitMQ לתהליכים אסינכרוניים
3. **API Gateway**: ניהול מרכזי של כל ה-APIs
4. **Load Balancing**: חלוקת עומסים בין שרתים
5. **Monitoring**: שימוש ב-ELK Stack לניטור

---

תאריך עדכון: ינואר 2025 | גרסה: 1.0
