# מדריך פיתוח מערכת ניהול רכש וספקים - Bootstrap 5 RTL

## 🎯 מטרת המסמך
מסמך זה מהווה מדריך מלא למתכנת לפיתוח מערכת ניהול רכש וספקים מקיפה. המערכת תבנה כ-Single Page Application עם HTML5, Bootstrap 5 RTL, ותומך מלא בעברית.

## 📋 סקירה כללית

### ליבת המערכת - מודולים מרכזיים:
1. **ניהול ספקים** - כרטיסי ספק, דירוגים, מסמכים
2. **תהליכי רכש** - מבקשת הצעת מחיר ועד הזמנת רכש
3. **קליטת סחורה** - קליטה, בדיקה, ואישור משלוחים
4. **ניתוחים ודוחות** - BI ומעקב ביצועים

### הרחבות עתידיות (לא לפיתוח כעת):
- פורטל ספקים עצמאי
- מכרזים אלקטרוניים
- ניהול חוזים מתקדם
- AI וניתוחים חזויים
- אינטגרציות ERP

## 🏗️ מבנה הפרויקט

```
procurement-system/
├── index.html                    # דף ראשי עם ניווט
├── assets/
│   ├── css/
│   │   ├── main.css             # עיצוב ראשי + RTL
│   │   └── components.css       # רכיבים משותפים
│   ├── js/
│   │   ├── app.js              # לוגיקה ראשית
│   │   ├── components.js        # רכיבים משותפים
│   │   └── validators.js        # ולידציות
│   └── img/                     # תמונות ואייקונים
├── modules/
│   ├── dashboard/               # דשבורד ראשי
│   ├── suppliers/               # ניהול ספקים
│   ├── purchasing/              # רכש והזמנות
│   ├── receiving/               # קליטת סחורה
│   └── reports/                 # דוחות
└── docs/
    └── database-schema.sql      # סכמת DB
```

## 🎨 עקרונות עיצוב מהטמפלייט

### צבעים ראשיים:
```css
:root {
    --primary-color: #00bf63a5;
    --primary-dark: #00A555;
    --secondary-color: #011939;
    --accent-gradient: linear-gradient(135deg, #00BF63 0%, #00D26A 100%);
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #0dcaf0;
}
```

### מבנה דף בסיסי:
```html
<body>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-dark" style="background: var(--secondary-color);">
        <!-- תפריט ראשי -->
    </nav>
    
    <!-- Sidebar -->
    <div class="sidebar-container">
        <div class="sidebar">
            <!-- תפריט צד -->
        </div>
    </div>
    
    <!-- Main Content -->
    <div class="container-fluid">
        <div class="main-content">
            <!-- תוכן הדף -->
        </div>
    </div>
</body>
```

## 📱 רשימת מסכים לפיתוח - לפי סדר עדיפות

### שלב 1: תשתית ודשבורד
1. **index.html** - דף ראשי עם ניווט
2. **dashboard.html** - דשבורד רכש וספקים

### שלב 2: ניהול ספקים (ליבת המערכת)
3. **suppliers-list.html** - רשימת ספקים
4. **supplier-view.html** - כרטיס ספק מפורט
5. **supplier-form.html** - הוספה/עריכת ספק

### שלב 3: תהליכי רכש
6. **rfq-list.html** - רשימת בקשות להצעת מחיר
7. **rfq-create.html** - יצירת בקשה חדשה
8. **rfq-compare.html** - השוואת הצעות
9. **purchase-orders-list.html** - רשימת הזמנות רכש
10. **purchase-order-form.html** - יצירת הזמנה

### שלב 4: קליטה ומעקב
11. **receiving-pending.html** - משלוחים ממתינים
12. **receiving-process.html** - תהליך קליטה

### שלב 5: דוחות
13. **reports-purchasing.html** - דוחות רכש
14. **reports-suppliers.html** - דוחות ספקים

---

## 📄 מפרט מסכים מפורט

### 1. דף ראשי - index.html

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>מערכת ניהול רכש וספקים - ERP</title>
    
    <!-- Bootstrap 5 RTL -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <!-- Google Fonts - Rubik -->
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <!-- Top Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background: #011939;">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="#">
                <i class="bi bi-box-seam me-2"></i>
                מערכת רכש ERP
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarMain">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#dashboard">
                            <i class="bi bi-speedometer2 me-1"></i>
                            דשבורד
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                            <i class="bi bi-people me-1"></i>
                            ספקים
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#suppliers/list">רשימת ספקים</a></li>
                            <li><a class="dropdown-item" href="#suppliers/add">הוסף ספק</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#suppliers/categories">קטגוריות</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                            <i class="bi bi-cart me-1"></i>
                            רכש
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#rfq/list">בקשות הצעת מחיר</a></li>
                            <li><a class="dropdown-item" href="#po/list">הזמנות רכש</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#receiving/pending">קליטת סחורה</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#reports">
                            <i class="bi bi-graph-up me-1"></i>
                            דוחות
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#notifications">
                            <i class="bi bi-bell"></i>
                            <span class="badge bg-danger rounded-pill">3</span>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle me-1"></i>
                            משתמש
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#profile">פרופיל</a></li>
                            <li><a class="dropdown-item" href="#settings">הגדרות</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#logout">יציאה</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <!-- Main Container -->
    <div class="main-container">
        <!-- Dynamic Content Area -->
        <div id="app-content">
            <!-- תוכן דינמי נטען כאן -->
        </div>
    </div>
    
    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>
```

### 2. דשבורד - dashboard.html

```html
<div class="container-fluid p-4">
    <!-- Page Header -->
    <div class="row mb-4">
        <div class="col">
            <h1 class="h3 mb-0 text-gray-800">דשבורד רכש וספקים</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">בית</a></li>
                    <li class="breadcrumb-item active">דשבורד</li>
                </ol>
            </nav>
        </div>
    </div>
    
    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
        <!-- כרטיס ספקים פעילים -->
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">
                            <div class="text-xs fw-bold text-primary text-uppercase mb-1">
                                ספקים פעילים
                            </div>
                            <div class="h5 mb-0 fw-bold text-gray-800">124</div>
                            <div class="text-muted small">
                                <i class="bi bi-arrow-up text-success"></i> 
                                +5 החודש
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="icon-circle bg-primary bg-gradient">
                                <i class="bi bi-people-fill text-white fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- כרטיס הזמנות פתוחות -->
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">
                            <div class="text-xs fw-bold text-success text-uppercase mb-1">
                                הזמנות פתוחות
                            </div>
                            <div class="h5 mb-0 fw-bold text-gray-800">47</div>
                            <div class="text-muted small">
                                בשווי ₪485,320
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="icon-circle bg-success bg-gradient">
                                <i class="bi bi-cart-check text-white fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- כרטיס משלוחים צפויים -->
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">
                            <div class="text-xs fw-bold text-info text-uppercase mb-1">
                                משלוחים היום
                            </div>
                            <div class="h5 mb-0 fw-bold text-gray-800">12</div>
                            <div class="text-muted small">
                                3 באיחור
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="icon-circle bg-info bg-gradient">
                                <i class="bi bi-truck text-white fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- כרטיס התראות -->
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col">
                            <div class="text-xs fw-bold text-warning text-uppercase mb-1">
                                התראות פעילות
                            </div>
                            <div class="h5 mb-0 fw-bold text-gray-800">8</div>
                            <div class="text-muted small">
                                5 דחופות
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="icon-circle bg-warning bg-gradient">
                                <i class="bi bi-exclamation-triangle text-white fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Charts Row -->
    <div class="row g-3 mb-4">
        <!-- גרף התפלגות רכש -->
        <div class="col-xl-8">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3">
                    <h6 class="m-0 fw-bold text-primary">התפלגות רכש חודשית</h6>
                </div>
                <div class="card-body">
                    <canvas id="purchaseChart" height="100"></canvas>
                </div>
            </div>
        </div>
        
        <!-- גרף עוגה - ספקים מובילים -->
        <div class="col-xl-4">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3">
                    <h6 class="m-0 fw-bold text-primary">5 ספקים מובילים</h6>
                </div>
                <div class="card-body">
                    <canvas id="suppliersChart" height="200"></canvas>
                    <div class="mt-3">
                        <div class="small text-muted">
                            <i class="bi bi-circle-fill text-primary me-1"></i> אלקטרוניקה בע"מ - 28%<br>
                            <i class="bi bi-circle-fill text-success me-1"></i> טכנולוגיות מתקדמות - 22%<br>
                            <i class="bi bi-circle-fill text-info me-1"></i> רכיבים ומחשבים - 18%<br>
                            <i class="bi bi-circle-fill text-warning me-1"></i> סמארט טק - 15%<br>
                            <i class="bi bi-circle-fill text-danger me-1"></i> אחרים - 17%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Tables Row -->
    <div class="row g-3">
        <!-- הזמנות אחרונות -->
        <div class="col-xl-6">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 fw-bold text-primary">הזמנות אחרונות</h6>
                    <a href="#po/list" class="btn btn-sm btn-primary">
                        ראה הכל <i class="bi bi-arrow-left ms-1"></i>
                    </a>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>מספר</th>
                                    <th>ספק</th>
                                    <th>סכום</th>
                                    <th>סטטוס</th>
                                    <th>תאריך</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#PO-2024-0125</td>
                                    <td>אלקטרוניקה בע"מ</td>
                                    <td>₪12,540</td>
                                    <td><span class="badge bg-warning">ממתין</span></td>
                                    <td>היום</td>
                                </tr>
                                <tr>
                                    <td>#PO-2024-0124</td>
                                    <td>טכנולוגיות מתקדמות</td>
                                    <td>₪8,320</td>
                                    <td><span class="badge bg-success">אושר</span></td>
                                    <td>אתמול</td>
                                </tr>
                                <!-- שורות נוספות -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- התראות ומשימות -->
        <div class="col-xl-6">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 class="m-0 fw-bold text-primary">התראות ומשימות</h6>
                    <a href="#alerts" class="btn btn-sm btn-primary">
                        ראה הכל <i class="bi bi-arrow-left ms-1"></i>
                    </a>
                </div>
                <div class="card-body">
                    <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>
                            <strong>מלאי נמוך:</strong> 5 פריטים מתחת למינימום
                        </div>
                    </div>
                    <div class="alert alert-info d-flex align-items-center" role="alert">
                        <i class="bi bi-clock-fill me-2"></i>
                        <div>
                            <strong>אישור נדרש:</strong> 3 הזמנות ממתינות לאישור
                        </div>
                    </div>
                    <div class="alert alert-danger d-flex align-items-center" role="alert">
                        <i class="bi bi-calendar-x-fill me-2"></i>
                        <div>
                            <strong>חוזה פג תוקף:</strong> חוזה עם "רכיבים בע"מ" פג ב-15/12
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Dashboard CSS additions -->
<style>
.icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-xs {
    font-size: 0.875rem;
}

.text-gray-800 {
    color: #5a5c69;
}
</style>
```

### 3. רשימת ספקים - suppliers-list.html

```html
<div class="container-fluid p-4">
    <!-- Page Header -->
    <div class="row mb-4">
        <div class="col">
            <h1 class="h3 mb-0">ניהול ספקים</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">בית</a></li>
                    <li class="breadcrumb-item active">ספקים</li>
                </ol>
            </nav>
        </div>
        <div class="col-auto">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSupplierModal">
                <i class="bi bi-plus-circle me-2"></i>
                הוסף ספק חדש
            </button>
            <button class="btn btn-outline-secondary">
                <i class="bi bi-upload me-2"></i>
                ייבוא מ-CSV
            </button>
        </div>
    </div>
    
    <!-- Filters Card -->
    <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
            <div class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">חיפוש חופשי</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" placeholder="חפש לפי שם, ח.פ, טלפון...">
                    </div>
                </div>
                <div class="col-md-2">
                    <label class="form-label">סטטוס</label>
                    <select class="form-select">
                        <option value="">הכל</option>
                        <option value="active">פעיל</option>
                        <option value="inactive">לא פעיל</option>
                        <option value="pending">ממתין לאישור</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">קטגוריה</label>
                    <select class="form-select">
                        <option value="">הכל</option>
                        <option value="electronics">אלקטרוניקה</option>
                        <option value="computers">מחשבים</option>
                        <option value="accessories">אביזרים</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">דירוג</label>
                    <select class="form-select">
                        <option value="">הכל</option>
                        <option value="5">5 כוכבים</option>
                        <option value="4">4+ כוכבים</option>
                        <option value="3">3+ כוכבים</option>
                    </select>
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button class="btn btn-primary w-100">
                        <i class="bi bi-funnel me-2"></i>
                        סנן
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Suppliers Table -->
    <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3">
            <div class="row align-items-center">
                <div class="col">
                    <h6 class="m-0 fw-bold text-primary">רשימת ספקים (124)</h6>
                </div>
                <div class="col-auto">
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-secondary active">
                            <i class="bi bi-list-ul"></i>
                        </button>
                        <button type="button" class="btn btn-outline-secondary">
                            <i class="bi bi-grid-3x3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th width="40">
                                <input class="form-check-input" type="checkbox" id="selectAll">
                            </th>
                            <th>שם ספק</th>
                            <th>ח.פ / ע.מ</th>
                            <th>איש קשר</th>
                            <th>טלפון</th>
                            <th>קטגוריות</th>
                            <th>דירוג</th>
                            <th>סטטוס</th>
                            <th width="120">פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input class="form-check-input" type="checkbox">
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="avatar-sm me-3">
                                        <div class="avatar-circle bg-primary text-white">
                                            א
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fw-bold">אלקטרוניקה מתקדמת בע"מ</div>
                                        <div class="text-muted small">ספק ראשי</div>
                                    </div>
                                </div>
                            </td>
                            <td>514123456</td>
                            <td>
                                <div>יוסי כהן</div>
                                <div class="text-muted small">מנהל מכירות</div>
                            </td>
                            <td>
                                <a href="tel:052-1234567">052-1234567</a>
                            </td>
                            <td>
                                <span class="badge bg-light text-dark me-1">אלקטרוניקה</span>
                                <span class="badge bg-light text-dark">מחשבים</span>
                            </td>
                            <td>
                                <div class="rating">
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star text-warning"></i>
                                    <span class="ms-1 text-muted">4.2</span>
                                </div>
                            </td>
                            <td>
                                <span class="badge bg-success">פעיל</span>
                            </td>
                            <td>
                                <div class="btn-group btn-group-sm" role="group">
                                    <button type="button" class="btn btn-outline-primary" title="צפייה">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary" title="עריכה">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-danger" title="מחיקה">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <!-- More rows... -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer bg-white">
            <div class="row align-items-center">
                <div class="col">
                    <div class="text-muted">
                        מציג 1-10 מתוך 124 רשומות
                    </div>
                </div>
                <div class="col-auto">
                    <nav>
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#">קודם</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">הבא</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Additional CSS -->
<style>
.avatar-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
</style>
```

### 4. כרטיס ספק - supplier-view.html

```html
<div class="container-fluid p-4">
    <!-- Page Header -->
    <div class="row mb-4">
        <div class="col">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">בית</a></li>
                    <li class="breadcrumb-item"><a href="#suppliers/list">ספקים</a></li>
                    <li class="breadcrumb-item active">אלקטרוניקה מתקדמת בע"מ</li>
                </ol>
            </nav>
        </div>
    </div>
    
    <!-- Supplier Header -->
    <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-auto">
                    <div class="avatar-lg bg-primary text-white">
                        א
                    </div>
                </div>
                <div class="col">
                    <h2 class="h3 mb-1">אלקטרוניקה מתקדמת בע"מ</h2>
                    <div class="text-muted mb-2">
                        <i class="bi bi-building me-2"></i>ח.פ: 514123456
                        <span class="mx-2">|</span>
                        <i class="bi bi-calendar me-2"></i>לקוח מאז: 01/2020
                    </div>
                    <div>
                        <span class="badge bg-success me-2">פעיל</span>
                        <span class="badge bg-primary">ספק ראשי</span>
                        <div class="rating d-inline-block ms-3">
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star text-warning"></i>
                            <span class="ms-1">4.2</span>
                        </div>
                    </div>
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary">
                        <i class="bi bi-pencil me-2"></i>ערוך
                    </button>
                    <button class="btn btn-outline-secondary">
                        <i class="bi bi-printer me-2"></i>הדפס
                    </button>
                    <button class="btn btn-outline-secondary">
                        <i class="bi bi-envelope me-2"></i>שלח הודעה
                    </button>
                    <div class="btn-group">
                        <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">צור בקשת הצעת מחיר</a></li>
                            <li><a class="dropdown-item" href="#">צור הזמנת רכש</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#">השבת ספק</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Tabs Navigation -->
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#general">
                <i class="bi bi-info-circle me-2"></i>פרטים כלליים
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#contacts">
                <i class="bi bi-people me-2"></i>אנשי קשר
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#products">
                <i class="bi bi-box-seam me-2"></i>מוצרים וקטגוריות
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#terms">
                <i class="bi bi-cash-stack me-2"></i>תנאי סחר
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#documents">
                <i class="bi bi-file-earmark me-2"></i>מסמכים
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#history">
                <i class="bi bi-clock-history me-2"></i>היסטוריה
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#performance">
                <i class="bi bi-graph-up me-2"></i>ביצועים
            </a>
        </li>
    </ul>
    
    <!-- Tab Content -->
    <div class="tab-content">
        <!-- פרטים כלליים -->
        <div class="tab-pane fade show active" id="general">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <h5 class="fw-bold mb-3">פרטי חברה</h5>
                            <table class="table table-borderless">
                                <tr>
                                    <td class="text-muted">שם חברה:</td>
                                    <td class="fw-bold">אלקטרוניקה מתקדמת בע"מ</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">ח.פ / ע.מ:</td>
                                    <td>514123456</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">סוג עסק:</td>
                                    <td>חברה בע"מ</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">כתובת:</td>
                                    <td>האורנים 15, אזור התעשייה, תל אביב</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">טלפון ראשי:</td>
                                    <td><a href="tel:03-1234567">03-1234567</a></td>
                                </tr>
                                <tr>
                                    <td class="text-muted">פקס:</td>
                                    <td>03-1234568</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">דוא"ל:</td>
                                    <td><a href="mailto:info@electronics.co.il">info@electronics.co.il</a></td>
                                </tr>
                                <tr>
                                    <td class="text-muted">אתר אינטרנט:</td>
                                    <td><a href="#" target="_blank">www.electronics.co.il</a></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <h5 class="fw-bold mb-3">מידע נוסף</h5>
                            <table class="table table-borderless">
                                <tr>
                                    <td class="text-muted">אזור פעילות:</td>
                                    <td>כל הארץ</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">שעות פעילות:</td>
                                    <td>א'-ה' 08:00-17:00</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">שנות פעילות:</td>
                                    <td>25 שנים</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">מספר עובדים:</td>
                                    <td>50-100</td>
                                </tr>
                                <tr>
                                    <td class="text-muted">מחזור שנתי:</td>
                                    <td>10-50 מיליון ₪</td>
                                </tr>
                            </table>
                            
                            <h5 class="fw-bold mb-3 mt-4">הערות</h5>
                            <p class="text-muted">
                                ספק אמין עם היסטוריה ארוכה של שיתוף פעולה. 
                                מתמחה במוצרי אלקטרוניקה מתקדמים ורכיבים למחשבים.
                                זמני אספקה מהירים ושירות מעולה.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- אנשי קשר -->
        <div class="tab-pane fade" id="contacts">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3">
                    <div class="row align-items-center">
                        <div class="col">
                            <h5 class="mb-0">אנשי קשר</h5>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-sm btn-primary">
                                <i class="bi bi-plus-circle me-2"></i>הוסף איש קשר
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>שם</th>
                                    <th>תפקיד</th>
                                    <th>טלפון</th>
                                    <th>נייד</th>
                                    <th>דוא"ל</th>
                                    <th>ראשי</th>
                                    <th>פעולות</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="avatar-sm bg-primary text-white me-2">
                                                יכ
                                            </div>
                                            יוסי כהן
                                        </div>
                                    </td>
                                    <td>מנהל מכירות</td>
                                    <td><a href="tel:03-1234567">03-1234567 שלוחה 102</a></td>
                                    <td><a href="tel:052-1234567">052-1234567</a></td>
                                    <td><a href="mailto:yossi@electronics.co.il">yossi@electronics.co.il</a></td>
                                    <td><i class="bi bi-star-fill text-warning"></i></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <!-- More contacts... -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- מוצרים וקטגוריות -->
        <div class="tab-pane fade" id="products">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="fw-bold mb-4">קטגוריות ראשיות</h5>
                    <div class="row g-3 mb-4">
                        <div class="col-md-3">
                            <div class="category-card text-center p-3 border rounded">
                                <i class="bi bi-cpu fs-1 text-primary mb-2"></i>
                                <h6>רכיבי מחשב</h6>
                                <small class="text-muted">145 מוצרים</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="category-card text-center p-3 border rounded">
                                <i class="bi bi-phone fs-1 text-primary mb-2"></i>
                                <h6>סלולר ואביזרים</h6>
                                <small class="text-muted">89 מוצרים</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="category-card text-center p-3 border rounded">
                                <i class="bi bi-headphones fs-1 text-primary mb-2"></i>
                                <h6>אודיו</h6>
                                <small class="text-muted">67 מוצרים</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="category-card text-center p-3 border rounded">
                                <i class="bi bi-camera fs-1 text-primary mb-2"></i>
                                <h6>צילום</h6>
                                <small class="text-muted">34 מוצרים</small>
                            </div>
                        </div>
                    </div>
                    
                    <h5 class="fw-bold mb-3">מותגים</h5>
                    <div class="mb-4">
                        <span class="badge bg-light text-dark me-2 mb-2">Samsung</span>
                        <span class="badge bg-light text-dark me-2 mb-2">Apple</span>
                        <span class="badge bg-light text-dark me-2 mb-2">LG</span>
                        <span class="badge bg-light text-dark me-2 mb-2">Sony</span>
                        <span class="badge bg-light text-dark me-2 mb-2">HP</span>
                        <span class="badge bg-light text-dark me-2 mb-2">Dell</span>
                        <span class="badge bg-light text-dark me-2 mb-2">Lenovo</span>
                        <span class="badge bg-light text-dark me-2 mb-2">ASUS</span>
                    </div>
                    
                    <h5 class="fw-bold mb-3">מוצרים פופולריים</h5>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>מק"ט</th>
                                    <th>שם מוצר</th>
                                    <th>קטגוריה</th>
                                    <th>מחיר</th>
                                    <th>זמן אספקה</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>EL-1234</td>
                                    <td>כרטיס גרפי RTX 4090</td>
                                    <td>רכיבי מחשב</td>
                                    <td>₪7,500</td>
                                    <td>3-5 ימים</td>
                                </tr>
                                <!-- More products... -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- תנאי סחר -->
        <div class="tab-pane fade" id="terms">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <h5 class="fw-bold mb-3">תנאי תשלום</h5>
                            <div class="mb-3">
                                <label class="text-muted">תנאי תשלום סטנדרטיים:</label>
                                <p class="fw-bold">שוטף + 60</p>
                            </div>
                            <div class="mb-3">
                                <label class="text-muted">הנחת מזומן:</label>
                                <p class="fw-bold">2% בתשלום תוך 10 ימים</p>
                            </div>
                            <div class="mb-3">
                                <label class="text-muted">מסגרת אשראי:</label>
                                <p class="fw-bold">₪500,000</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h5 class="fw-bold mb-3">תנאי אספקה</h5>
                            <div class="mb-3">
                                <label class="text-muted">זמן אספקה סטנדרטי:</label>
                                <p class="fw-bold">3-5 ימי עסקים</p>
                            </div>
                            <div class="mb-3">
                                <label class="text-muted">מינימום הזמנה:</label>
                                <p class="fw-bold">₪1,000</p>
                            </div>
                            <div class="mb-3">
                                <label class="text-muted">עלות משלוח:</label>
                                <p class="fw-bold">חינם מעל ₪2,500</p>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="my-4">
                    
                    <h5 class="fw-bold mb-3">הנחות כמות</h5>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>כמות</th>
                                    <th>אחוז הנחה</th>
                                    <th>הערות</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>10-50 יחידות</td>
                                    <td>5%</td>
                                    <td>על מוצרים נבחרים</td>
                                </tr>
                                <tr>
                                    <td>51-100 יחידות</td>
                                    <td>10%</td>
                                    <td>על מוצרים נבחרים</td>
                                </tr>
                                <tr>
                                    <td>100+ יחידות</td>
                                    <td>לפי הסכם</td>
                                    <td>יש לפנות למחלקת מכירות</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- מסמכים -->
        <div class="tab-pane fade" id="documents">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3">
                    <div class="row align-items-center">
                        <div class="col">
                            <h5 class="mb-0">מסמכים</h5>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-sm btn-primary">
                                <i class="bi bi-upload me-2"></i>העלה מסמך
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>סוג מסמך</th>
                                    <th>שם קובץ</th>
                                    <th>תאריך העלאה</th>
                                    <th>תוקף עד</th>
                                    <th>סטטוס</th>
                                    <th>פעולות</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><i class="bi bi-file-earmark-text text-primary me-2"></i>אישור ניהול ספרים</td>
                                    <td>nisul_sfarim_2024.pdf</td>
                                    <td>01/01/2024</td>
                                    <td>31/12/2024</td>
                                    <td><span class="badge bg-success">בתוקף</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-download"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><i class="bi bi-file-earmark-text text-primary me-2"></i>אישור ניכוי מס במקור</td>
                                    <td>nikui_mas_2024.pdf</td>
                                    <td>01/01/2024</td>
                                    <td>31/12/2024</td>
                                    <td><span class="badge bg-success">בתוקף</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-download"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><i class="bi bi-file-earmark-text text-warning me-2"></i>תעודת עוסק מורשה</td>
                                    <td>osek_morsheh.pdf</td>
                                    <td>15/06/2023</td>
                                    <td>15/06/2024</td>
                                    <td><span class="badge bg-warning">קרוב לפוג</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-download"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- היסטוריה -->
        <div class="tab-pane fade" id="history">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                    <h5 class="fw-bold mb-4">סיכום פעילות</h5>
                    <div class="row g-3 text-center">
                        <div class="col-md-3">
                            <div class="stat-box">
                                <h3 class="text-primary">₪2.5M</h3>
                                <p class="text-muted mb-0">סה"כ רכש</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-box">
                                <h3 class="text-success">324</h3>
                                <p class="text-muted mb-0">הזמנות</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-box">
                                <h3 class="text-info">₪7,716</h3>
                                <p class="text-muted mb-0">ממוצע הזמנה</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-box">
                                <h3 class="text-warning">45</h3>
                                <p class="text-muted mb-0">ימי אשראי ממוצע</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3">
                    <h5 class="mb-0">הזמנות אחרונות</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>מספר הזמנה</th>
                                    <th>תאריך</th>
                                    <th>סכום</th>
                                    <th>סטטוס</th>
                                    <th>פעולות</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#PO-2024-0125</td>
                                    <td>15/01/2024</td>
                                    <td>₪12,540</td>
                                    <td><span class="badge bg-success">סופק</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">צפה</button>
                                    </td>
                                </tr>
                                <!-- More orders... -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ביצועים -->
        <div class="tab-pane fade" id="performance">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="fw-bold mb-4">דירוג ביצועים</h5>
                    
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="performance-metric mb-4">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>איכות מוצרים</span>
                                    <span class="fw-bold">4.5/5</span>
                                </div>
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar bg-success" style="width: 90%"></div>
                                </div>
                            </div>
                            
                            <div class="performance-metric mb-4">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>זמני אספקה</span>
                                    <span class="fw-bold">4.2/5</span>
                                </div>
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar bg-success" style="width: 84%"></div>
                                </div>
                            </div>
                            
                            <div class="performance-metric mb-4">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>שירות לקוחות</span>
                                    <span class="fw-bold">4.8/5</span>
                                </div>
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar bg-success" style="width: 96%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="performance-metric mb-4">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>מחירים תחרותיים</span>
                                    <span class="fw-bold">3.8/5</span>
                                </div>
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar bg-warning" style="width: 76%"></div>
                                </div>
                            </div>
                            
                            <div class="performance-metric mb-4">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>גמישות</span>
                                    <span class="fw-bold">4.0/5</span>
                                </div>
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar bg-success" style="width: 80%"></div>
                                </div>
                            </div>
                            
                            <div class="performance-metric mb-4">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>תיעוד ודיוק</span>
                                    <span class="fw-bold">4.6/5</span>
                                </div>
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar bg-success" style="width: 92%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="my-4">
                    
                    <h5 class="fw-bold mb-3">אירועים משמעותיים</h5>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-marker bg-success"></div>
                            <div class="timeline-content">
                                <h6 class="fw-bold">חידוש חוזה שנתי</h6>
                                <p class="text-muted mb-0">01/01/2024 - חודש החוזה השנתי עם תנאים משופרים</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-marker bg-warning"></div>
                            <div class="timeline-content">
                                <h6 class="fw-bold">איחור באספקה</h6>
                                <p class="text-muted mb-0">15/11/2023 - איחור של 5 ימים בהזמנה #PO-2023-0892</p>
                            </div>
                        </div>
                        <!-- More events... -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Additional CSS for supplier view -->
<style>
.avatar-lg {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
}

.stat-box {
    padding: 20px;
    border: 1px solid #e3e6f0;
    border-radius: 10px;
}

.timeline {
    position: relative;
    padding-left: 30px;
}

.timeline-item {
    position: relative;
    padding-bottom: 20px;
}

.timeline-marker {
    position: absolute;
    left: -30px;
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.category-card:hover {
    background-color: #f8f9fa;
    cursor: pointer;
}
</style>
```

### 5. טופס הוספה/עריכת ספק - supplier-form.html

```html
<div class="container-fluid p-4">
    <!-- Page Header -->
    <div class="row mb-4">
        <div class="col">
            <h1 class="h3 mb-0">הוספת ספק חדש</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">בית</a></li>
                    <li class="breadcrumb-item"><a href="#suppliers/list">ספקים</a></li>
                    <li class="breadcrumb-item active">ספק חדש</li>
                </ol>
            </nav>
        </div>
    </div>
    
    <!-- Form Wizard -->
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <!-- Progress Steps -->
            <div class="wizard-steps mb-5">
                <div class="row">
                    <div class="col text-center">
                        <div class="step active" data-step="1">
                            <div class="step-icon">
                                <i class="bi bi-building"></i>
                            </div>
                            <div class="step-title">פרטי חברה</div>
                        </div>
                    </div>
                    <div class="col text-center">
                        <div class="step" data-step="2">
                            <div class="step-icon">
                                <i class="bi bi-people"></i>
                            </div>
                            <div class="step-title">אנשי קשר</div>
                        </div>
                    </div>
                    <div class="col text-center">
                        <div class="step" data-step="3">
                            <div class="step-icon">
                                <i class="bi bi-box-seam"></i>
                            </div>
                            <div class="step-title">תחומי פעילות</div>
                        </div>
                    </div>
                    <div class="col text-center">
                        <div class="step" data-step="4">
                            <div class="step-icon">
                                <i class="bi bi-cash-stack"></i>
                            </div>
                            <div class="step-title">תנאי סחר</div>
                        </div>
                    </div>
                    <div class="col text-center">
                        <div class="step" data-step="5">
                            <div class="step-icon">
                                <i class="bi bi-file-earmark"></i>
                            </div>
                            <div class="step-title">מסמכים</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Form Steps Content -->
            <form id="supplierForm">
                <!-- Step 1: Company Details -->
                <div class="step-content active" data-step="1">
                    <h4 class="mb-4">פרטי חברה</h4>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label required">שם ספק/חברה</label>
                            <input type="text" class="form-control" required>
                            <div class="form-text">הזן את שם החברה המלא כפי שמופיע ברשם החברות</div>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label required">סוג עסק</label>
                            <select class="form-select" required>
                                <option value="">בחר...</option>
                                <option>חברה בע"מ</option>
                                <option>עוסק מורשה</option>
                                <option>עוסק פטור</option>
                                <option>עמותה</option>
                                <option>אחר</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label required">מספר עוסק/ח.פ</label>
                            <input type="text" class="form-control" pattern="[0-9]{9}" required>
                            <div class="form-text">9 ספרות</div>
                        </div>
                        
                        <div class="col-12">
                            <h5 class="mt-3 mb-3">כתובת</h5>
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label required">רחוב ומספר</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label required">עיר</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">מיקוד</label>
                            <input type="text" class="form-control" pattern="[0-9]{7}">
                        </div>
                        
                        <div class="col-12">
                            <h5 class="mt-3 mb-3">פרטי התקשרות</h5>
                        </div>
                        
                        <div class="col-md-3">
                            <label class="form-label required">טלפון ראשי</label>
                            <input type="tel" class="form-control" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">פקס</label>
                            <input type="tel" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">דוא"ל</label>
                            <input type="email" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">אתר אינטרנט</label>
                            <input type="url" class="form-control" placeholder="https://">
                        </div>
                        
                        <div class="col-12">
                            <h5 class="mt-3 mb-3">מידע נוסף</h5>
                        </div>
                        
                        <div class="col-md-4">
                            <label class="form-label">אזור פעילות</label>
                            <select class="form-select">
                                <option>כל הארץ</option>
                                <option>צפון</option>
                                <option>מרכז</option>
                                <option>דרום</option>
                                <option>ירושלים והסביבה</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">שעות פעילות</label>
                            <input type="text" class="form-control" placeholder="לדוגמה: א'-ה' 08:00-17:00">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">מספר עובדים</label>
                            <select class="form-select">
                                <option>1-10</option>
                                <option>11-50</option>
                                <option>51-100</option>
                                <option>101-500</option>
                                <option>500+</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Contacts -->
                <div class="step-content" data-step="2">
                    <h4 class="mb-4">אנשי קשר</h4>
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        יש להוסיף לפחות איש קשר אחד. ניתן לסמן איש קשר אחד כאיש קשר ראשי.
                    </div>
                    
                    <div id="contactsList">
                        <!-- Contact Template -->
                        <div class="contact-item border rounded p-3 mb-3">
                            <div class="row g-3">
                                <div class="col-md-3">
                                    <label class="form-label required">שם מלא</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">תפקיד</label>
                                    <input type="text" class="form-control" placeholder="מנהל מכירות">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label required">טלפון</label>
                                    <input type="tel" class="form-control" required>
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">נייד</label>
                                    <input type="tel" class="form-control">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">דוא"ל</label>
                                    <input type="email" class="form-control">
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="primaryContact" value="1">
                                        <label class="form-check-label">
                                            איש קשר ראשי
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-sm btn-outline-danger mt-2">
                                <i class="bi bi-trash me-1"></i>הסר
                            </button>
                        </div>
                    </div>
                    
                    <button type="button" class="btn btn-outline-primary" id="addContact">
                        <i class="bi bi-plus-circle me-2"></i>הוסף איש קשר
                    </button>
                </div>
                
                <!-- Step 3: Business Areas -->
                <div class="step-content" data-step="3">
                    <h4 class="mb-4">תחומי פעילות</h4>
                    
                    <h5 class="mb-3">קטגוריות ראשיות</h5>
                    <div class="row g-3 mb-4">
                        <div class="col-md-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="cat1">
                                <label class="form-check-label" for="cat1">
                                    אלקטרוניקה
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="cat2">
                                <label class="form-check-label" for="cat2">
                                    מחשבים ורכיבים
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="cat3">
                                <label class="form-check-label" for="cat3">
                                    סלולר ואביזרים
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="cat4">
                                <label class="form-check-label" for="cat4">
                                    אודיו ווידאו
                                </label>
                            </div>
                        </div>
                        <!-- More categories... -->
                    </div>
                    
                    <h5 class="mb-3">מותגים</h5>
                    <div class="mb-4">
                        <label class="form-label">הזן מותגים (הפרד בפסיקים)</label>
                        <input type="text" class="form-control" placeholder="Samsung, Apple, LG, Sony...">
                        <div class="form-text">רשימת המותגים העיקריים שהספק עובד איתם</div>
                    </div>
                    
                    <h5 class="mb-3">מוצרים ספציפיים</h5>
                    <div class="mb-4">
                        <label class="form-label">חיפוש והוספת מוצרים</label>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="חפש מוצר...">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="selected-products">
                        <!-- Selected products will appear here -->
                    </div>
                </div>
                
                <!-- Step 4: Trade Terms -->
                <div class="step-content" data-step="4">
                    <h4 class="mb-4">תנאי סחר</h4>
                    
                    <div class="row g-3">
                        <div class="col-12">
                            <h5 class="mb-3">תנאי תשלום</h5>
                        </div>
                        
                        <div class="col-md-4">
                            <label class="form-label">תנאי תשלום</label>
                            <select class="form-select">
                                <option>מזומן</option>
                                <option>שוטף + 30</option>
                                <option selected>שוטף + 60</option>
                                <option>שוטף + 90</option>
                                <option>אחר</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">הנחת מזומן (%)</label>
                            <input type="number" class="form-control" min="0" max="100" step="0.1">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">מסגרת אשראי (₪)</label>
                            <input type="number" class="form-control" min="0">
                        </div>
                        
                        <div class="col-12 mt-4">
                            <h5 class="mb-3">תנאי אספקה</h5>
                        </div>
                        
                        <div class="col-md-4">
                            <label class="form-label">זמן אספקה (ימי עסקים)</label>
                            <input type="number" class="form-control" min="1" value="3">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">מינימום הזמנה (₪)</label>
                            <input type="number" class="form-control" min="0">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">חברת שילוח מועדפת</label>
                            <input type="text" class="form-control">
                        </div>
                        
                        <div class="col-12 mt-4">
                            <h5 class="mb-3">הנחות כמות</h5>
                        </div>
                        
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>מכמות</th>
                                            <th>עד כמות</th>
                                            <th>אחוז הנחה</th>
                                            <th>הערות</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="discountTiers">
                                        <tr>
                                            <td><input type="number" class="form-control" min="1"></td>
                                            <td><input type="number" class="form-control" min="1"></td>
                                            <td><input type="number" class="form-control" min="0" max="100"></td>
                                            <td><input type="text" class="form-control"></td>
                                            <td>
                                                <button type="button" class="btn btn-sm btn-outline-danger">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button type="button" class="btn btn-sm btn-outline-primary">
                                    <i class="bi bi-plus-circle me-2"></i>הוסף שורה
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 5: Documents -->
                <div class="step-content" data-step="5">
                    <h4 class="mb-4">מסמכים</h4>
                    
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        ניתן להעלות מסמכים כעת או להוסיף אותם מאוחר יותר בכרטיס הספק.
                    </div>
                    
                    <!-- Drag & Drop Area -->
                    <div class="upload-area border-dashed rounded p-5 text-center mb-4">
                        <i class="bi bi-cloud-upload fs-1 text-muted mb-3"></i>
                        <h5>גרור קבצים לכאן או לחץ לבחירה</h5>
                        <p class="text-muted">PDF, JPG, PNG עד 10MB</p>
                        <input type="file" class="d-none" multiple accept=".pdf,.jpg,.jpeg,.png">
                    </div>
                    
                    <!-- Uploaded Files List -->
                    <div class="uploaded-files">
                        <h5 class="mb-3">קבצים שהועלו</h5>
                        <div class="list-group">
                            <!-- Files will be listed here -->
                        </div>
                    </div>
                    
                    <!-- Document Types -->
                    <div class="mt-4">
                        <h5 class="mb-3">סוגי מסמכים מומלצים</h5>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <ul class="list-unstyled">
                                    <li><i class="bi bi-check-circle text-success me-2"></i>אישור ניהול ספרים</li>
                                    <li><i class="bi bi-check-circle text-success me-2"></i>אישור ניכוי מס במקור</li>
                                    <li><i class="bi bi-check-circle text-success me-2"></i>תעודת עוסק מורשה</li>
                                    <li><i class="bi bi-check-circle text-success me-2"></i>רישיון עסק</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="list-unstyled">
                                    <li><i class="bi bi-check-circle text-success me-2"></i>ביטוחים</li>
                                    <li><i class="bi bi-check-circle text-success me-2"></i>חוזה/הסכם</li>
                                    <li><i class="bi bi-check-circle text-success me-2"></i>קטלוג מוצרים</li>
                                    <li><i class="bi bi-check-circle text-success me-2"></i>מחירון</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation Buttons -->
                <div class="row mt-5">
                    <div class="col">
                        <button type="button" class="btn btn-secondary" id="prevStep">
                            <i class="bi bi-arrow-right me-2"></i>חזור
                        </button>
                    </div>
                    <div class="col text-center">
                        <button type="button" class="btn btn-outline-primary">
                            <i class="bi bi-save me-2"></i>שמור כטיוטה
                        </button>
                    </div>
                    <div class="col text-end">
                        <button type="button" class="btn btn-primary" id="nextStep">
                            הבא<i class="bi bi-arrow-left ms-2"></i>
                        </button>
                        <button type="submit" class="btn btn-success d-none" id="submitForm">
                            <i class="bi bi-check-circle me-2"></i>סיים ושמור
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Wizard CSS -->
<style>
.wizard-steps {
    position: relative;
}

.wizard-steps::before {
    content: '';
    position: absolute;
    top: 25px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: #e9ecef;
    z-index: 0;
}

.step {
    position: relative;
    z-index: 1;
}

.step-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #e9ecef;
    color: #6c757d;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    font-size: 1.5rem;
    transition: all 0.3s;
}

.step.active .step-icon {
    background: var(--primary-color);
    color: white;
}

.step.completed .step-icon {
    background: var(--success-color);
    color: white;
}

.step-title {
    font-size: 0.875rem;
    color: #6c757d;
}

.step.active .step-title {
    color: var(--primary-color);
    font-weight: bold;
}

.step-content {
    display: none;
}

.step-content.active {
    display: block;
}

.required::after {
    content: " *";
    color: var(--danger-color);
}

.upload-area {
    border: 2px dashed #dee2e6;
    cursor: pointer;
    transition: all 0.3s;
}

.upload-area:hover {
    border-color: var(--primary-color);
    background-color: #f8f9fa;
}

.border-dashed {
    border-style: dashed !important;
}
</style>
```

---

## 🗄️ סכמת בסיס הנתונים

### טבלאות ליבה

```sql
-- ==========================================
-- 1. טבלת ספקים (suppliers)
-- ==========================================
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    business_type ENUM('בעמ', 'עוסק מורשה', 'עוסק פטור', 'עמותה', 'אחר'),
    business_number VARCHAR(20) UNIQUE NOT NULL,
    status ENUM('פעיל', 'לא פעיל', 'ממתין לאישור', 'מושעה') DEFAULT 'ממתין לאישור',
    rating DECIMAL(2,1) DEFAULT 0,
    
    -- כתובת
    street_address VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(10),
    region VARCHAR(50),
    
    -- יצירת קשר
    phone VARCHAR(20),
    fax VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    
    -- מידע נוסף
    operating_hours VARCHAR(100),
    business_area VARCHAR(50),
    employee_count VARCHAR(20),
    annual_revenue VARCHAR(50),
    notes TEXT,
    
    -- מטא דאטה
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    modified_date DATETIME ON UPDATE CURRENT_TIMESTAMP,
    modified_by INT,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    INDEX idx_status (status),
    INDEX idx_rating (rating),
    INDEX idx_business_number (business_number)
);

-- ==========================================
-- 2. טבלת אנשי קשר (supplier_contacts)
-- ==========================================
CREATE TABLE supplier_contacts (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    phone VARCHAR(20),
    mobile VARCHAR(20),
    email VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    INDEX idx_supplier (supplier_id)
);

-- ==========================================
-- 3. טבלת קטגוריות מוצרים (product_categories)
-- ==========================================
CREATE TABLE product_categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    parent_id INT,
    category_name VARCHAR(100) NOT NULL,
    category_code VARCHAR(20) UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (parent_id) REFERENCES product_categories(category_id),
    INDEX idx_parent (parent_id),
    INDEX idx_sort (sort_order)
);

-- ==========================================
-- 4. טבלת קשר ספק-קטגוריה (supplier_categories)
-- ==========================================
CREATE TABLE supplier_categories (
    supplier_id INT,
    category_id INT,
    is_primary BOOLEAN DEFAULT FALSE,
    
    PRIMARY KEY (supplier_id, category_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (category_id) REFERENCES product_categories(category_id)
);

-- ==========================================
-- 5. טבלת מוצרים (products)
-- ==========================================
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(50) UNIQUE NOT NULL,
    barcode VARCHAR(50),
    product_name VARCHAR(255) NOT NULL,
    category_id INT,
    brand VARCHAR(100),
    
    -- מלאי ומיקום
    quantity_in_stock INT DEFAULT 0,
    min_stock_level INT DEFAULT 0,
    location VARCHAR(100),
    
    -- מחירים
    cost_price DECIMAL(10,2),
    selling_price DECIMAL(10,2),
    special_price DECIMAL(10,2),
    
    -- מידע נוסף
    warranty_months INT,
    status ENUM('פעיל', 'לא פעיל', 'אזל', 'הופסק') DEFAULT 'פעיל',
    notes TEXT,
    
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_date DATETIME ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES product_categories(category_id),
    INDEX idx_sku (sku),
    INDEX idx_barcode (barcode),
    INDEX idx_status (status)
);

-- ==========================================
-- 6. טבלת מוצרי ספק (supplier_products)
-- ==========================================
CREATE TABLE supplier_products (
    supplier_id INT,
    product_id INT,
    supplier_sku VARCHAR(50),
    supplier_price DECIMAL(10,2),
    lead_time_days INT DEFAULT 0,
    min_order_quantity INT DEFAULT 1,
    is_primary_supplier BOOLEAN DEFAULT FALSE,
    last_purchase_date DATE,
    
    PRIMARY KEY (supplier_id, product_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- ==========================================
-- 7. טבלת תנאי סחר (supplier_terms)
-- ==========================================
CREATE TABLE supplier_terms (
    terms_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT UNIQUE NOT NULL,
    
    -- תנאי תשלום
    payment_terms ENUM('מזומן', 'שוטף+30', 'שוטף+60', 'שוטף+90', 'אחר'),
    payment_terms_other VARCHAR(100),
    cash_discount_percent DECIMAL(5,2),
    credit_limit DECIMAL(12,2),
    
    -- תנאי אספקה
    delivery_days INT DEFAULT 3,
    minimum_order DECIMAL(10,2),
    shipping_company VARCHAR(100),
    shipping_cost DECIMAL(10,2),
    free_shipping_minimum DECIMAL(10,2),
    
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_date DATETIME ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- ==========================================
-- 8. טבלת הנחות כמות (quantity_discounts)
-- ==========================================
CREATE TABLE quantity_discounts (
    discount_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    from_quantity INT NOT NULL,
    to_quantity INT,
    discount_percent DECIMAL(5,2) NOT NULL,
    notes VARCHAR(255),
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    INDEX idx_supplier (supplier_id)
);

-- ==========================================
-- 9. טבלת מסמכי ספק (supplier_documents)
-- ==========================================
CREATE TABLE supplier_documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    document_type VARCHAR(50),
    document_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INT,
    expiry_date DATE,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT,
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    INDEX idx_supplier (supplier_id),
    INDEX idx_expiry (expiry_date)
);

-- ==========================================
-- 10. טבלת בקשות להצעת מחיר (rfq_headers)
-- ==========================================
CREATE TABLE rfq_headers (
    rfq_id INT PRIMARY KEY AUTO_INCREMENT,
    rfq_number VARCHAR(20) UNIQUE NOT NULL,
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATE,
    status ENUM('טיוטה', 'נשלח', 'התקבלו הצעות', 'הושלם', 'בוטל') DEFAULT 'טיוטה',
    notes TEXT,
    created_by INT,
    
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
);

-- ==========================================
-- 11. טבלת פריטי בקשה להצעת מחיר (rfq_items)
-- ==========================================
CREATE TABLE rfq_items (
    rfq_item_id INT PRIMARY KEY AUTO_INCREMENT,
    rfq_id INT NOT NULL,
    product_id INT,
    product_description VARCHAR(500),
    quantity INT NOT NULL,
    notes TEXT,
    
    FOREIGN KEY (rfq_id) REFERENCES rfq_headers(rfq_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_rfq (rfq_id)
);

-- ==========================================
-- 12. טבלת ספקים לבקשת הצעת מחיר (rfq_suppliers)
-- ==========================================
CREATE TABLE rfq_suppliers (
    rfq_id INT,
    supplier_id INT,
    sent_date DATETIME,
    response_date DATETIME,
    status ENUM('ממתין', 'נענה', 'סירב', 'לא ענה') DEFAULT 'ממתין',
    
    PRIMARY KEY (rfq_id, supplier_id),
    FOREIGN KEY (rfq_id) REFERENCES rfq_headers(rfq_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- ==========================================
-- 13. טבלת תגובות להצעת מחיר (rfq_responses)
-- ==========================================
CREATE TABLE rfq_responses (
    response_id INT PRIMARY KEY AUTO_INCREMENT,
    rfq_id INT NOT NULL,
    supplier_id INT NOT NULL,
    rfq_item_id INT NOT NULL,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(12,2),
    lead_time_days INT,
    notes TEXT,
    
    FOREIGN KEY (rfq_id) REFERENCES rfq_headers(rfq_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (rfq_item_id) REFERENCES rfq_items(rfq_item_id),
    UNIQUE KEY unique_response (rfq_id, supplier_id, rfq_item_id)
);

-- ==========================================
-- 14. טבלת הזמנות רכש (purchase_orders)
-- ==========================================
CREATE TABLE purchase_orders (
    po_id INT PRIMARY KEY AUTO_INCREMENT,
    po_number VARCHAR(20) UNIQUE NOT NULL,
    supplier_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    expected_delivery DATE,
    
    -- סכומים
    subtotal DECIMAL(12,2),
    tax_amount DECIMAL(10,2),
    total_amount DECIMAL(12,2),
    
    -- סטטוס
    status ENUM('טיוטה', 'ממתין לאישור', 'אושר', 'נשלח', 'סופק חלקית', 'סופק', 'בוטל') DEFAULT 'טיוטה',
    
    -- מידע נוסף
    shipping_address TEXT,
    notes TEXT,
    created_by INT,
    approved_by INT,
    approved_date DATETIME,
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    INDEX idx_status (status),
    INDEX idx_order_date (order_date)
);

-- ==========================================
-- 15. טבלת פריטי הזמנת רכש (purchase_order_items)
-- ==========================================
CREATE TABLE purchase_order_items (
    po_item_id INT PRIMARY KEY AUTO_INCREMENT,
    po_id INT NOT NULL,
    product_id INT,
    product_description VARCHAR(500),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(12,2),
    
    -- קליטה
    received_quantity INT DEFAULT 0,
    received_date DATETIME,
    
    FOREIGN KEY (po_id) REFERENCES purchase_orders(po_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_po (po_id)
);

-- ==========================================
-- 16. טבלת קליטת סחורה (goods_receipts)
-- ==========================================
CREATE TABLE goods_receipts (
    receipt_id INT PRIMARY KEY AUTO_INCREMENT,
    receipt_number VARCHAR(20) UNIQUE NOT NULL,
    po_id INT,
    supplier_id INT NOT NULL,
    receipt_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- מסמכים
    invoice_number VARCHAR(50),
    delivery_note_number VARCHAR(50),
    
    -- סטטוס
    status ENUM('טיוטה', 'הושלם', 'עם בעיות', 'בוטל') DEFAULT 'טיוטה',
    
    notes TEXT,
    received_by INT,
    
    FOREIGN KEY (po_id) REFERENCES purchase_orders(po_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    INDEX idx_receipt_date (receipt_date)
);

-- ==========================================
-- 17. טבלת פריטי קליטה (goods_receipt_items)
-- ==========================================
CREATE TABLE goods_receipt_items (
    receipt_item_id INT PRIMARY KEY AUTO_INCREMENT,
    receipt_id INT NOT NULL,
    product_id INT,
    po_item_id INT,
    
    ordered_quantity INT,
    received_quantity INT,
    accepted_quantity INT,
    rejected_quantity INT DEFAULT 0,
    
    status ENUM('תקין', 'פגום', 'חסר', 'עודף') DEFAULT 'תקין',
    notes TEXT,
    
    FOREIGN KEY (receipt_id) REFERENCES goods_receipts(receipt_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (po_item_id) REFERENCES purchase_order_items(po_item_id),
    INDEX idx_receipt (receipt_id)
);

-- ==========================================
-- 18. טבלת הערכת ביצועי ספק (supplier_performance)
-- ==========================================
CREATE TABLE supplier_performance (
    performance_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    evaluation_date DATE NOT NULL,
    
    -- מדדי ביצוע (1-5)
    quality_rating DECIMAL(2,1),
    delivery_rating DECIMAL(2,1),
    service_rating DECIMAL(2,1),
    price_rating DECIMAL(2,1),
    flexibility_rating DECIMAL(2,1),
    documentation_rating DECIMAL(2,1),
    
    overall_rating DECIMAL(2,1),
    notes TEXT,
    evaluated_by INT,
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    INDEX idx_supplier (supplier_id),
    INDEX idx_date (evaluation_date)
);

-- ==========================================
-- 19. טבלת אירועי ספק (supplier_events)
-- ==========================================
CREATE TABLE supplier_events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    event_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    event_type VARCHAR(50),
    event_title VARCHAR(255),
    description TEXT,
    severity ENUM('נמוך', 'בינוני', 'גבוה', 'קריטי'),
    created_by INT,
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    INDEX idx_supplier (supplier_id),
    INDEX idx_date (event_date)
);

-- ==========================================
-- 20. טבלת התראות (alerts)
-- ==========================================
CREATE TABLE alerts (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    alert_type VARCHAR(50),
    entity_type VARCHAR(50),
    entity_id INT,
    title VARCHAR(255),
    description TEXT,
    severity ENUM('מידע', 'אזהרה', 'דחוף', 'קריטי'),
    status ENUM('פעיל', 'טופל', 'בוטל') DEFAULT 'פעיל',
    
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATE,
    assigned_to INT,
    resolved_date DATETIME,
    resolved_by INT,
    
    INDEX idx_status (status),
    INDEX idx_severity (severity),
    INDEX idx_due_date (due_date)
);

-- ==========================================
-- Views לדוחות וניתוחים
-- ==========================================

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
LEFT JOIN purchase_orders po ON s.supplier_id = po.supplier_id AND po.status = 'סופק'
LEFT JOIN supplier_products sp ON s.supplier_id = sp.supplier_id
WHERE s.is_deleted = FALSE
GROUP BY s.supplier_id;

-- View: התראות פעילות
CREATE VIEW v_active_alerts AS
SELECT 
    a.*,
    CASE 
        WHEN a.entity_type = 'supplier' THEN s.company_name
        WHEN a.entity_type = 'product' THEN p.product_name
        ELSE NULL
    END as entity_name
FROM alerts a
LEFT JOIN suppliers s ON a.entity_type = 'supplier' AND a.entity_id = s.supplier_id
LEFT JOIN products p ON a.entity_type = 'product' AND a.entity_id = p.product_id
WHERE a.status = 'פעיל';

-- ==========================================
-- Indexes נוספים לביצועים
-- ==========================================
CREATE INDEX idx_po_supplier_date ON purchase_orders(supplier_id, order_date);
CREATE INDEX idx_product_category_status ON products(category_id, status);
CREATE INDEX idx_supplier_created ON suppliers(created_date);
CREATE INDEX idx_gr_po ON goods_receipts(po_id);
```

---

## 🔧 הנחיות טכניות

### 1. ספריות JavaScript נדרשות:
```html
<!-- jQuery (אם נדרש) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Bootstrap 5 Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Select2 - Autocomplete -->
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<!-- DataTables -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css">
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Flatpickr - Date Picker -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://npmcdn.com/flatpickr/dist/l10n/he.js"></script>

<!-- SweetAlert2 - Alerts -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

### 2. קובץ CSS ראשי (main.css):
```css
/* RTL Support */
body {
    direction: rtl;
    text-align: right;
    font-family: 'Rubik', sans-serif;
}

/* Main Container with Sidebar space */
.main-container {
    margin-top: 56px; /* Navbar height */
    min-height: calc(100vh - 56px);
}

/* Sidebar Styles */
.sidebar {
    position: fixed;
    top: 56px;
    bottom: 0;
    right: 0;
    z-index: 100;
    width: 250px;
    background: #f8f9fa;
    border-left: 1px solid #dee2e6;
    overflow-y: auto;
}

/* Content with Sidebar */
.with-sidebar {
    margin-right: 250px;
}

/* Cards */
.card {
    border: none;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
    border-radius: 0.35rem;
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(100%);
    }
    .with-sidebar {
        margin-right: 0;
    }
}
```

### 3. JavaScript בסיסי (app.js):
```javascript
// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    
    // Initialize Select2 for Hebrew
    if ($.fn.select2) {
        $('.select2').select2({
            language: "he",
            dir: "rtl"
        });
    }
    
    // Initialize DataTables for Hebrew
    if ($.fn.DataTable) {
        $('.datatable').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/he.json',
            },
            responsive: true
        });
    }
    
    // Initialize Flatpickr
    if (typeof flatpickr !== 'undefined') {
        flatpickr(".datepicker", {
            locale: "he",
            dateFormat: "d/m/Y"
        });
    }
});

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    return true;
}

// Show Loading
function showLoading() {
    // Implementation
}

// Hide Loading
function hideLoading() {
    // Implementation
}

// Show Alert
function showAlert(type, message) {
    Swal.fire({
        icon: type,
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
}
```

### 4. רכיבים נוספים להוספה:

#### Loading Overlay:
```html
<div class="loading-overlay d-none">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">טוען...</span>
    </div>
</div>
```

#### Modal Template:
```html
<div class="modal fade" id="genericModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">כותרת</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <!-- Dynamic content -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ביטול</button>
                <button type="button" class="btn btn-primary">שמור</button>
            </div>
        </div>
    </div>
</div>
```

---

## 📊 חיבור למבנה הארגוני 360

### הקשרים למודולים אחרים:

1. **מודול מלאי**
   - עדכון אוטומטי בקליטת סחורה
   - התראות מלאי מינימלי
   - ניהול מלאי לפי ספק

2. **מודול פיננסי**
   - חיבור לחשבוניות
   - מעקב תשלומים
   - ניתוח עלויות

3. **מודול מכירות**
   - זמינות מלאי
   - מחירי עלות לרווחיות
   - ניהול מבצעים

4. **מודול דוחות**
   - דוחות רכש
   - ניתוחי ספקים
   - מגמות ותחזיות

### טבלאות קישור:
- `inventory_movements` - תנועות מלאי
- `invoices` - חשבוניות
- `payments` - תשלומים
- `users` - משתמשים והרשאות

---

## 🚀 סדר פיתוח מומלץ

### שלב 1 - תשתית (שבוע 1):
1. הקמת מבנה הפרויקט
2. יצירת index.html עם ניווט
3. הגדרת CSS ו-JS בסיסיים
4. יצירת סכמת DB

### שלב 2 - ניהול ספקים (שבוע 2-3):
1. מסך רשימת ספקים
2. כרטיס ספק מפורט
3. טופס הוספה/עריכה
4. חיבור ל-DB

### שלב 3 - תהליכי רכש (שבוע 4-5):
1. בקשות להצעת מחיר
2. השוואת הצעות
3. הזמנות רכש
4. תהליכי אישור

### שלב 4 - קליטה ודוחות (שבוע 6):
1. מסכי קליטת סחורה
2. דוחות בסיסיים
3. דשבורד מרכזי

### שלב 5 - אינטגרציה ובדיקות (שבוע 7-8):
1. חיבור למודולים אחרים
2. בדיקות מקיפות
3. תיקוני באגים
4. אופטימיזציה

---

## ✅ Checklist לכל מסך

- [ ] HTML5 תקני עם DOCTYPE
- [ ] Bootstrap 5.3 RTL
- [ ] רספונסיבי לכל המכשירים
- [ ] תמיכה מלאה בעברית
- [ ] נגישות WCAG 2.1
- [ ] ולידציות בצד הלקוח
- [ ] Loading states
- [ ] Error handling
- [ ] Success messages
- [ ] Breadcrumbs
- [ ] Print support
- [ ] Help tooltips

---

## 📝 הערות חשובות

1. **עקביות** - שמור על עיצוב ו-UX אחידים
2. **ביצועים** - מזער קריאות HTTP
3. **אבטחה** - ולידציות וסניטציה
4. **תיעוד** - הוסף הערות בקוד
5. **גמישות** - תכנן להרחבות עתידיות

המערכת תהווה בסיס איתן להרחבה לכיוון ERP מלא, עם אפשרויות לפורטל ספקים, מכרזים אלקטרוניים, ניהול חוזים מתקדם, ואינטגרציות נוספות.

בהצלחה! 🚀