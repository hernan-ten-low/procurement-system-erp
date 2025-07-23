# מפת תהליכים - Process Map

## 🗺️ מפת תהליכים כללית של מערכת הרכש

```mermaid
flowchart TB
    subgraph "תהליכים ראשיים"
        Start([התחלה])
        
        subgraph "1. ניהול ספקים"
            S1[רישום ספק חדש]
            S2[עדכון פרטי ספק]
            S3[הערכת ספק]
            S4[השעיה/הפעלה]
        end
        
        subgraph "2. תהליכי רכש"
            P1[זיהוי צורך]
            P2[יצירת RFQ]
            P3[קבלת הצעות]
            P4[השוואה ובחירה]
            P5[יצירת הזמנה]
            P6[אישורים]
        end
        
        subgraph "3. קליטה ומלאי"
            R1[קבלת משלוח]
            R2[בדיקת התאמה]
            R3[בדיקת איכות]
            R4[עדכון מלאי]
            R5[אישור חשבונית]
        end
        
        subgraph "4. ניתוח ודיווח"
            A1[דוחות ביצוע]
            A2[ניתוח מגמות]
            A3[התראות]
            A4[המלצות]
        end
        
        End([סיום])
    end
    
    Start --> P1
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> P5
    P5 --> P6
    P6 --> R1
    R1 --> R2
    R2 --> R3
    R3 --> R4
    R4 --> R5
    R5 --> A1
    A1 --> End
    
    S1 -.-> P2
    S3 -.-> A1
    A4 -.-> S3
    
    style Start fill:#9f9,stroke:#333,stroke-width:3px
    style End fill:#f99,stroke:#333,stroke-width:3px
```

## 📋 תהליך מפורט - רישום ספק

```mermaid
flowchart TD
    Start([משתמש מתחיל רישום])
    
    Input[הזנת פרטי ספק]
    Validate{ולידציה}
    
    CheckDup{בדיקת כפילות}
    Exists[ספק קיים במערכת]
    
    AddContacts[הוספת אנשי קשר]
    AddProducts[הוספת מוצרים/שירותים]
    AddTerms[הגדרת תנאי סחר]
    UploadDocs[העלאת מסמכים]
    
    Review{סקירה ואישור}
    
    Approve[אישור מנהל רכש]
    FinanceCheck[בדיקת כספים]
    
    Activate[הפעלת ספק]
    Notify[שליחת הודעות]
    
    End([ספק פעיל במערכת])
    
    Start --> Input
    Input --> Validate
    Validate -->|לא תקין| Input
    Validate -->|תקין| CheckDup
    CheckDup -->|קיים| Exists
    CheckDup -->|חדש| AddContacts
    AddContacts --> AddProducts
    AddProducts --> AddTerms
    AddTerms --> UploadDocs
    UploadDocs --> Review
    Review -->|תיקונים| Input
    Review -->|אישור| Approve
    Approve --> FinanceCheck
    FinanceCheck --> Activate
    Activate --> Notify
    Notify --> End
    
    style Start fill:#9f9,stroke:#333,stroke-width:2px
    style End fill:#9f9,stroke:#333,stroke-width:2px
    style Exists fill:#f99,stroke:#333,stroke-width:2px
```

## 🔄 תהליך RFQ מלא

```mermaid
flowchart LR
    subgraph "שלב 1: יצירה"
        A1[יצירת בקשה]
        A2[הגדרת פריטים]
        A3[קביעת קריטריונים]
    end
    
    subgraph "שלב 2: הפצה"
        B1[בחירת ספקים]
        B2[שליחת בקשות]
        B3[מעקב תגובות]
    end
    
    subgraph "שלב 3: ניתוח"
        C1[איסוף הצעות]
        C2[טבלת השוואה]
        C3[ניקוד משוקלל]
    end
    
    subgraph "שלב 4: החלטה"
        D1[המלצת מערכת]
        D2[אישור מנהל]
        D3[הודעה לזוכה]
    end
    
    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> D1
    D1 --> D2
    D2 --> D3
    
    style A1 fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style D3 fill:#c8e6c9,stroke:#1b5e20,stroke-width:2px
```

## 🏭 תהליך קליטת סחורה

```mermaid
flowchart TD
    subgraph "קליטה ראשונית"
        REC1[הגעת משלוח]
        REC2[סריקת תעודת משלוח]
        REC3[אימות מול הזמנה]
    end
    
    subgraph "בדיקה פיזית"
        CHK1{ספירת פריטים}
        CHK2{בדיקת נזקים}
        CHK3{התאמת מפרט}
    end
    
    subgraph "טיפול בחריגות"
        EXC1[דיווח חוסרים]
        EXC2[דיווח נזקים]
        EXC3[החזרת פריטים]
    end
    
    subgraph "אישור וסיום"
        FIN1[עדכון מערכת]
        FIN2[חתימה דיגיטלית]
        FIN3[הודעה לגורמים]
    end
    
    REC1 --> REC2
    REC2 --> REC3
    REC3 --> CHK1
    
    CHK1 -->|תקין| CHK2
    CHK1 -->|חסר| EXC1
    
    CHK2 -->|תקין| CHK3
    CHK2 -->|פגום| EXC2
    
    CHK3 -->|תואם| FIN1
    CHK3 -->|לא תואם| EXC3
    
    EXC1 --> FIN1
    EXC2 --> FIN1
    EXC3 --> FIN1
    
    FIN1 --> FIN2
    FIN2 --> FIN3
```

## 📊 מפת החלטות - בחירת ספק

```mermaid
flowchart TD
    Start([הצעות התקבלו])
    
    Criteria{קריטריונים<br/>להחלטה}
    
    Price[מחיר<br/>משקל: 40%]
    Quality[איכות<br/>משקל: 30%]
    Delivery[זמן אספקה<br/>משקל: 20%]
    Terms[תנאי תשלום<br/>משקל: 10%]
    
    Score[חישוב ציון משוקלל]
    
    Compare{השוואת<br/>ציונים}
    
    Best[ספק מוביל]
    Close{הפרש<br/>< 5%?}
    
    Negotiate[משא ומתן<br/>נוסף]
    Direct[בחירה ישירה]
    
    Decision{החלטה<br/>סופית}
    
    Select[בחירת ספק]
    Notify[הודעה לכל הספקים]
    
    End([יצירת הזמנה])
    
    Start --> Criteria
    Criteria --> Price
    Criteria --> Quality
    Criteria --> Delivery
    Criteria --> Terms
    
    Price --> Score
    Quality --> Score
    Delivery --> Score
    Terms --> Score
    
    Score --> Compare
    Compare --> Best
    Best --> Close
    
    Close -->|כן| Negotiate
    Close -->|לא| Direct
    
    Negotiate --> Decision
    Direct --> Decision
    
    Decision --> Select
    Select --> Notify
    Notify --> End
    
    style Start fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style End fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

## 🔍 תהליך הערכת ביצועים

```mermaid
flowchart LR
    subgraph "איסוף נתונים"
        D1[זמני אספקה]
        D2[איכות מוצרים]
        D3[שירות לקוחות]
        D4[מחירים]
        D5[תיעוד]
    end
    
    subgraph "ניתוח"
        A1[חישוב ממוצעים]
        A2[השוואה לתקופות קודמות]
        A3[השוואה לספקים אחרים]
    end
    
    subgraph "הערכה"
        E1[ציון כולל]
        E2[נקודות חוזק]
        E3[נקודות לשיפור]
    end
    
    subgraph "החלטות"
        DEC1[המשך עבודה]
        DEC2[תוכנית שיפור]
        DEC3[החלפת ספק]
    end
    
    D1 --> A1
    D2 --> A1
    D3 --> A1
    D4 --> A1
    D5 --> A1
    
    A1 --> A2
    A1 --> A3
    
    A2 --> E1
    A3 --> E1
    
    E1 --> E2
    E1 --> E3
    
    E2 --> DEC1
    E3 --> DEC2
    E3 --> DEC3
```

## 🚨 תהליך טיפול בחריגות

```mermaid
flowchart TD
    Alert([התראה על חריגה])
    
    Type{סוג חריגה}
    
    Delay[איחור באספקה]
    Quality[בעיית איכות]
    Price[חריגת מחיר]
    Docs[בעיית תיעוד]
    
    Severity{חומרה}
    
    Low[נמוכה]
    Medium[בינונית]
    High[גבוהה]
    Critical[קריטית]
    
    LowAction[תיעוד והמשך]
    MedAction[דיון עם ספק]
    HighAction[אזהרה רשמית]
    CritAction[השעיה מיידית]
    
    Monitor[מעקב]
    Escalate[הסלמה]
    Resolve[פתרון]
    
    Close([סגירת אירוע])
    
    Alert --> Type
    
    Type --> Delay
    Type --> Quality
    Type --> Price
    Type --> Docs
    
    Delay --> Severity
    Quality --> Severity
    Price --> Severity
    Docs --> Severity
    
    Severity --> Low
    Severity --> Medium
    Severity --> High
    Severity --> Critical
    
    Low --> LowAction
    Medium --> MedAction
    High --> HighAction
    Critical --> CritAction
    
    LowAction --> Monitor
    MedAction --> Monitor
    HighAction --> Monitor
    CritAction --> Escalate
    
    Monitor --> Resolve
    Escalate --> Resolve
    
    Resolve --> Close
    
    style Alert fill:#ffebee,stroke:#c62828,stroke-width:2px
    style Critical fill:#b71c1c,color:#fff,stroke:#333,stroke-width:2px
```

## 📈 מחזור שיפור מתמיד

```mermaid
flowchart TD
    subgraph "Plan"
        P1[זיהוי בעיות]
        P2[הגדרת יעדים]
        P3[תכנון פעולות]
    end
    
    subgraph "Do"
        D1[יישום שינויים]
        D2[הדרכות]
        D3[פיילוט]
    end
    
    subgraph "Check"
        C1[מדידת תוצאות]
        C2[השוואה ליעדים]
        C3[ניתוח פערים]
    end
    
    subgraph "Act"
        A1[תיקונים]
        A2[הטמעה]
        A3[תיעוד]
    end
    
    P1 --> P2
    P2 --> P3
    P3 --> D1
    D1 --> D2
    D2 --> D3
    D3 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> A1
    A1 --> A2
    A2 --> A3
    A3 --> P1
    
    style P1 fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px
    style A3 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
```

## 🎯 מפת KPIs

```mermaid
mindmap
  root((KPIs))
    ספקים
      מספר ספקים פעילים
      דירוג ממוצע
      זמן תגובה ממוצע
      אחוז עמידה בהתחייבויות
    רכש
      מספר הזמנות חודשי
      ערך הזמנות כולל
      זמן מחזור הזמנה
      אחוז חיסכון
    איכות
      אחוז פגמים
      מספר החזרות
      ציון שביעות רצון
      אחוז התאמה למפרט
    כספים
      ימי אשראי ממוצע
      אחוז הנחות
      עלות לעסקה
      ROI
```

## 🔗 אינטגרציה בין תהליכים

```mermaid
graph TB
    subgraph "קלט"
        IN1[דרישות מחלקות]
        IN2[תקציב מאושר]
        IN3[מפרטים טכניים]
    end
    
    subgraph "תהליך רכש"
        MAIN[תהליך רכש ראשי]
    end
    
    subgraph "תהליכים משיקים"
        SUB1[ניהול מלאי]
        SUB2[הנהלת חשבונות]
        SUB3[לוגיסטיקה]
        SUB4[בקרת איכות]
    end
    
    subgraph "פלט"
        OUT1[מוצרים/שירותים]
        OUT2[דוחות ביצוע]
        OUT3[חשבוניות מאושרות]
    end
    
    IN1 --> MAIN
    IN2 --> MAIN
    IN3 --> MAIN
    
    MAIN <--> SUB1
    MAIN <--> SUB2
    MAIN <--> SUB3
    MAIN <--> SUB4
    
    MAIN --> OUT1
    MAIN --> OUT2
    MAIN --> OUT3
```

---

## 📝 מקרא וסימונים

| סימון | משמעות |
|--------|---------|
| ⭕ | התחלה/סיום |
| ⬜ | פעולה |
| 🔶 | החלטה |
| ➡️ | זרימה רגילה |
| ⚡ | זרימה מותנית |
| 📄 | מסמך |
| 💾 | מסד נתונים |
| 👤 | גורם אנושי |
| 🤖 | תהליך אוטומטי |

---

תאריך עדכון: ינואר 2025 | גרסה: 1.0
