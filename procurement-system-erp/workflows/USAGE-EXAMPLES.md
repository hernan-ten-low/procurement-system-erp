# 📘 מדריך שימוש ודוגמאות קוד - תהליכי עבודה

## 🎯 מבוא

מסמך זה מכיל דוגמאות קוד ומדריך שימוש בתהליכי העבודה של מערכת ניהול הרכש והספקים.

## 📁 שילוב הקבצים בפרויקט

### 1. הוספת קבצי CSS ו-JavaScript

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <!-- Bootstrap 5 RTL -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css">
    
    <!-- Workflow Styles -->
    <link rel="stylesheet" href="assets/workflow-styles.css">
</head>
<body>
    <!-- תוכן הדף -->
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Workflow JS -->
    <script src="assets/workflow.js"></script>
</body>
</html>
```

## 🔧 דוגמאות קוד

### 1. יצירת תהליך צעד אחר צעד

```html
<!-- HTML Structure -->
<div class="workflow-container">
    <!-- Progress Bar -->
    <div class="progress-workflow mb-4">
        <div class="progress-bar-workflow" style="width: 0%">0%</div>
    </div>
    
    <!-- Steps Navigation -->
    <div class="steps-nav d-flex justify-content-between mb-4">
        <div class="process-step active" data-step="1">
            <div class="step-number">1</div>
            <div class="step-title">פרטים בסיסיים</div>
        </div>
        <div class="process-step" data-step="2">
            <div class="step-number">2</div>
            <div class="step-title">מסמכים</div>
        </div>
        <div class="process-step" data-step="3">
            <div class="step-number">3</div>
            <div class="step-title">אישור</div>
        </div>
    </div>
    
    <!-- Step Contents -->
    <div class="step-content active" data-step="1">
        <h3>שלב 1: פרטים בסיסיים</h3>
        <form class="workflow-form">
            <div class="mb-3">
                <label class="form-label">שם חברה</label>
                <input type="text" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">המשך</button>
        </form>
    </div>
    
    <div class="step-content" data-step="2" style="display: none;">
        <h3>שלב 2: העלאת מסמכים</h3>
        <!-- תוכן שלב 2 -->
    </div>
    
    <div class="step-content" data-step="3" style="display: none;">
        <h3>שלב 3: אישור וסיום</h3>
        <!-- תוכן שלב 3 -->
    </div>
</div>

<script>
// אתחול התהליך
document.addEventListener('DOMContentLoaded', function() {
    // הפעלת WorkflowJS
    WorkflowJS.init();
});
</script>
```

### 2. טיפול בטפסים עם ולידציה

```javascript
// ולידציה מותאמת אישית
function validateSupplierForm(form) {
    let isValid = true;
    
    // בדיקת ח.פ
    const businessNumber = form.querySelector('[name="businessNumber"]');
    if (businessNumber && !isValidBusinessNumber(businessNumber.value)) {
        showFieldError(businessNumber, 'מספר ח.פ לא תקין');
        isValid = false;
    }
    
    // בדיקת טלפון
    const phone = form.querySelector('[name="phone"]');
    if (phone && !WorkflowJS.isValidPhone(phone.value)) {
        showFieldError(phone, 'מספר טלפון לא תקין');
        isValid = false;
    }
    
    return isValid;
}

// בדיקת ח.פ ישראלי
function isValidBusinessNumber(number) {
    return /^\d{9}$/.test(number);
}

// הצגת שגיאה בשדה
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    // יצירת או עדכון הודעת שגיאה
    let feedback = field.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        field.parentNode.insertBefore(feedback, field.nextSibling);
    }
    feedback.textContent = message;
}
```

### 3. יצירת Timeline דינמי

```javascript
// יצירת timeline מנתונים
function createDynamicTimeline(events) {
    const timelineContainer = document.querySelector('.timeline-workflow');
    
    events.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-dot ${event.status}"></div>
            <div class="timeline-content">
                <h6>${event.title}</h6>
                <p class="text-muted mb-0">${event.description}</p>
                <small class="text-muted">${formatDate(event.date)}</small>
            </div>
        `;
        
        // הוספת אנימציה
        timelineItem.style.animationDelay = `${index * 0.1}s`;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// נתוני דוגמה
const timelineEvents = [
    {
        title: 'הזמנה נוצרה',
        description: 'הזמנת רכש #PO-2024-0247',
        date: new Date('2024-01-15'),
        status: 'completed'
    },
    {
        title: 'אושרה על ידי מנהל',
        description: 'אישור מנהל מחלקה',
        date: new Date('2024-01-16'),
        status: 'completed'
    },
    {
        title: 'נשלחה לספק',
        description: 'ההזמנה נשלחה לספק',
        date: new Date('2024-01-17'),
        status: 'active'
    }
];

// הפעלה
createDynamicTimeline(timelineEvents);
```

### 4. טעינת נתונים דינמית

```javascript
// טעינת ספקים מ-API
async function loadSuppliers() {
    try {
        // הצגת מצב טעינה
        showLoadingState();
        
        // קריאה ל-API
        const response = await fetch('/api/suppliers');
        const suppliers = await response.json();
        
        // עיבוד והצגת הנתונים
        displaySuppliers(suppliers);
        
    } catch (error) {
        console.error('Error loading suppliers:', error);
        WorkflowJS.showNotification('שגיאה בטעינת ספקים', 'error');
    } finally {
        hideLoadingState();
    }
}

// הצגת מצב טעינה
function showLoadingState() {
    const container = document.querySelector('.suppliers-container');
    container.innerHTML = `
        <div class="text-center p-5">
            <div class="spinner-workflow mx-auto mb-3"></div>
            <p class="text-muted">טוען ספקים...</p>
        </div>
    `;
}

// הצגת ספקים
function displaySuppliers(suppliers) {
    const container = document.querySelector('.suppliers-container');
    container.innerHTML = '';
    
    suppliers.forEach(supplier => {
        const card = createSupplierCard(supplier);
        container.appendChild(card);
    });
}

// יצירת כרטיס ספק
function createSupplierCard(supplier) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-3';
    card.innerHTML = `
        <div class="workflow-card h-100">
            <div class="d-flex align-items-center mb-3">
                <div class="avatar-circle bg-primary text-white me-3">
                    ${supplier.name.charAt(0)}
                </div>
                <div>
                    <h5 class="mb-0">${supplier.name}</h5>
                    <small class="text-muted">${supplier.category}</small>
                </div>
            </div>
            <div class="mb-3">
                <div class="rating">
                    ${generateStars(supplier.rating)}
                    <span class="ms-1">${supplier.rating}/5</span>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-outline-primary" onclick="viewSupplier(${supplier.id})">
                    <i class="bi bi-eye me-1"></i>צפה
                </button>
                <button class="btn btn-sm btn-primary" onclick="createOrder(${supplier.id})">
                    <i class="bi bi-cart-plus me-1"></i>הזמן
                </button>
            </div>
        </div>
    `;
    return card;
}
```

### 5. יצירת גרפים ודוחות

```javascript
// יצירת גרף עם Chart.js
function createPurchaseChart() {
    const ctx = document.getElementById('purchaseChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני'],
            datasets: [{
                label: 'היקף רכש חודשי',
                data: [65000, 72000, 68000, 85000, 92000, 88000],
                borderColor: '#00bf63',
                backgroundColor: 'rgba(0, 191, 99, 0.1)',
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Rubik'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ₪' + 
                                   context.parsed.y.toLocaleString('he-IL');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₪' + value.toLocaleString('he-IL');
                        }
                    }
                }
            }
        }
    });
}
```

### 6. ניהול מצב גלובלי

```javascript
// State Manager פשוט
const WorkflowState = {
    data: {},
    
    // שמירת ערך
    set(key, value) {
        this.data[key] = value;
        this.persist();
        this.notify(key, value);
    },
    
    // קבלת ערך
    get(key, defaultValue = null) {
        return this.data[key] || defaultValue;
    },
    
    // מחיקת ערך
    remove(key) {
        delete this.data[key];
        this.persist();
    },
    
    // שמירה ב-localStorage
    persist() {
        localStorage.setItem('workflowState', JSON.stringify(this.data));
    },
    
    // טעינה מ-localStorage
    load() {
        const saved = localStorage.getItem('workflowState');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    },
    
    // מנגנון התראות
    listeners: {},
    
    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    },
    
    notify(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value));
        }
    }
};

// שימוש
WorkflowState.load();

// מעקב אחר שינויים
WorkflowState.subscribe('currentSupplier', (supplier) => {
    console.log('Supplier changed:', supplier);
    updateSupplierDisplay(supplier);
});

// עדכון נתונים
WorkflowState.set('currentSupplier', {
    id: 123,
    name: 'אלקטרוניקה בע"מ'
});
```

### 7. אינטגרציה עם API

```javascript
// API Client
class ProcurementAPI {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }
    
    // GET request
    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            headers: this.headers
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return response.json();
    }
    
    // POST request
    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return response.json();
    }
    
    // PUT request
    async put(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return response.json();
    }
    
    // DELETE request
    async delete(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: this.headers
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return response.ok;
    }
}

// שימוש
const api = new ProcurementAPI();

// טעינת ספקים
async function loadSuppliers() {
    try {
        const suppliers = await api.get('/suppliers');
        displaySuppliers(suppliers);
    } catch (error) {
        WorkflowJS.showNotification('שגיאה בטעינת ספקים', 'error');
    }
}

// יצירת הזמנה
async function createPurchaseOrder(orderData) {
    try {
        const order = await api.post('/purchase-orders', orderData);
        WorkflowJS.showNotification('הזמנה נוצרה בהצלחה', 'success');
        return order;
    } catch (error) {
        WorkflowJS.showNotification('שגיאה ביצירת הזמנה', 'error');
        throw error;
    }
}
```

### 8. טיפול בקבצים

```javascript
// Drag & Drop Upload
function initializeFileUpload() {
    const dropZone = document.querySelector('.upload-zone');
    const fileInput = document.querySelector('#fileInput');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
    
    // Handle file input change
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    e.target.classList.add('highlight');
}

function unhighlight(e) {
    e.target.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile);
}

async function uploadFile(file) {
    // בדיקת סוג קובץ
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        WorkflowJS.showNotification('סוג קובץ לא נתמך', 'error');
        return;
    }
    
    // בדיקת גודל קובץ (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        WorkflowJS.showNotification('הקובץ גדול מדי (מקסימום 10MB)', 'error');
        return;
    }
    
    // יצירת FormData
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        // הצגת progress
        showUploadProgress(file.name, 0);
        
        // העלאה לשרת
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                showUploadProgress(file.name, percentCompleted);
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            WorkflowJS.showNotification('הקובץ הועלה בהצלחה', 'success');
            addFileToList(result);
        } else {
            throw new Error('Upload failed');
        }
        
    } catch (error) {
        WorkflowJS.showNotification('שגיאה בהעלאת הקובץ', 'error');
    }
}
```

### 9. הדפסה וייצוא

```javascript
// הכנה להדפסה
function preparePrint() {
    // הסתרת אלמנטים לא רלוונטיים
    document.querySelectorAll('.no-print').forEach(el => {
        el.style.display = 'none';
    });
    
    // הוספת class להדפסה
    document.body.classList.add('printing');
    
    // חלון הדפסה
    window.print();
    
    // החזרת המצב הקודם
    document.body.classList.remove('printing');
    document.querySelectorAll('.no-print').forEach(el => {
        el.style.display = '';
    });
}

// ייצוא ל-PDF (עם jsPDF)
function exportToPDF() {
    if (typeof jsPDF === 'undefined') {
        WorkflowJS.showNotification('ספריית PDF לא נטענה', 'error');
        return;
    }
    
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // הוספת פונט עברית
    doc.addFont('Rubik-Regular.ttf', 'Rubik', 'normal');
    doc.setFont('Rubik');
    
    // כותרת
    doc.setFontSize(20);
    doc.text('דוח ספקים', 105, 20, { align: 'center' });
    
    // תוכן
    doc.setFontSize(12);
    let y = 40;
    
    suppliers.forEach(supplier => {
        doc.text(`${supplier.name} - דירוג: ${supplier.rating}/5`, 20, y);
        y += 10;
        
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });
    
    // שמירה
    doc.save('suppliers-report.pdf');
}
```

### 10. תבניות לשימוש חוזר

```javascript
// תבנית לכרטיס תהליך
const ProcessCardTemplate = {
    render(data) {
        return `
            <div class="process-card ${data.status}">
                <div class="card-header">
                    <h5>${data.title}</h5>
                    <span class="badge bg-${data.statusColor}">${data.statusText}</span>
                </div>
                <div class="card-body">
                    <p>${data.description}</p>
                    <div class="progress-workflow">
                        <div class="progress-bar-workflow" style="width: ${data.progress}%">
                            ${data.progress}%
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm" onclick="${data.action}">
                        ${data.actionText}
                    </button>
                </div>
            </div>
        `;
    }
};

// שימוש בתבנית
const cardData = {
    title: 'אישור הזמנה',
    status: 'pending',
    statusColor: 'warning',
    statusText: 'ממתין',
    description: 'ההזמנה ממתינה לאישור מנהל',
    progress: 75,
    action: 'approveOrder(123)',
    actionText: 'אשר הזמנה'
};

document.querySelector('.cards-container').innerHTML = 
    ProcessCardTemplate.render(cardData);
```

## 🎨 עיצוב מותאם אישית

### שינוי ערכת צבעים

```css
/* Override default colors */
:root {
    --primary-color: #007bff;  /* כחול במקום ירוק */
    --primary-dark: #0056b3;
    --accent-color: #6610f2;    /* סגול */
}
```

### הוספת אנימציות מותאמות

```css
/* אנימציה מותאמת לכרטיסים */
@keyframes cardEntry {
    from {
        opacity: 0;
        transform: translateY(30px) rotateX(-10deg);
    }
    to {
        opacity: 1;
        transform: translateY(0) rotateX(0);
    }
}

.custom-card {
    animation: cardEntry 0.6s ease-out;
    transform-style: preserve-3d;
}
```

## 🚀 טיפים לביצועים

1. **Lazy Loading** - טען רכיבים רק כשנדרש
2. **Debounce** - עבור פעולות חיפוש
3. **Virtual Scrolling** - לרשימות ארוכות
4. **Memoization** - לחישובים כבדים
5. **Web Workers** - לעיבוד ברקע

## 📱 תמיכה במובייל

```javascript
// זיהוי מכשיר נייד
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);
}

// התאמות למובייל
if (isMobile()) {
    document.body.classList.add('mobile-view');
    
    // החלפת hover ל-tap
    document.querySelectorAll('.hover-effect').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });
        
        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touched');
            }, 300);
        });
    });
}
```

## 🔒 אבטחה

### סניטציה של קלט משתמש

```javascript
// ניקוי HTML
function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}

// ולידציה של קלט
function validateInput(input, type) {
    switch (type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        
        case 'phone':
            return /^[\d-+().\s]+$/.test(input);
        
        case 'number':
            return !isNaN(input) && isFinite(input);
        
        case 'alphanumeric':
            return /^[a-zA-Z0-9\u0590-\u05FF\s]+$/.test(input);
        
        default:
            return true;
    }
}
```

## 📚 משאבים נוספים

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**עדכון אחרון**: ינואר 2025 | **גרסה**: 1.0
