/**
 * Workflow JavaScript Library
 * מערכת ניהול רכש וספקים - ספריית תהליכי עבודה
 * גרסה: 1.0
 * תאריך: ינואר 2025
 */

// ================================
// אתחול ראשי
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // אתחול רכיבים
    initializeWorkflowComponents();
    
    // אתחול אנימציות
    initializeAnimations();
    
    // אתחול אירועים
    initializeEventHandlers();
    
    // אתחול טולטיפים
    initializeTooltips();
    
    // בדיקת תמיכה בדפדפן
    checkBrowserSupport();
});

// ================================
// פונקציות אתחול
// ================================

function initializeWorkflowComponents() {
    // אתחול progress bars
    document.querySelectorAll('.progress-bar-animated').forEach(bar => {
        animateProgressBar(bar);
    });
    
    // אתחול טיימליין
    initializeTimeline();
    
    // אתחול כרטיסי תהליך
    initializeProcessCards();
    
    // אתחול מונים
    initializeCounters();
}

function initializeAnimations() {
    // Intersection Observer לאנימציות scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // צפייה באלמנטים לאנימציה
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initializeEventHandlers() {
    // טיפול בלחיצות על שלבי תהליך
    document.querySelectorAll('.process-step').forEach(step => {
        step.addEventListener('click', handleStepClick);
    });
    
    // טיפול בטפסים
    document.querySelectorAll('.workflow-form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // טיפול בכפתורי פעולה
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', handleActionClick);
    });
}

function initializeTooltips() {
    // Bootstrap tooltips
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// ================================
// פונקציות תהליך
// ================================

function handleStepClick(event) {
    const step = event.currentTarget;
    const stepNumber = step.dataset.step;
    
    // הסרת active מכל השלבים
    document.querySelectorAll('.process-step').forEach(s => {
        s.classList.remove('active');
    });
    
    // הוספת active לשלב הנבחר
    step.classList.add('active');
    
    // עדכון תוכן לפי השלב
    updateStepContent(stepNumber);
    
    // עדכון progress bar
    updateProgressBar(stepNumber);
    
    // שמירת מצב
    saveWorkflowState('currentStep', stepNumber);
}

function updateStepContent(stepNumber) {
    // הסתרת כל התוכן
    document.querySelectorAll('.step-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // הצגת התוכן הרלוונטי
    const targetContent = document.querySelector(`.step-content[data-step="${stepNumber}"]`);
    if (targetContent) {
        targetContent.style.display = 'block';
        // אנימציה
        fadeIn(targetContent);
    }
}

function updateProgressBar(currentStep) {
    const totalSteps = document.querySelectorAll('.process-step').length;
    const progress = (currentStep / totalSteps) * 100;
    
    const progressBar = document.querySelector('.workflow-progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
        progressBar.textContent = Math.round(progress) + '%';
    }
}

// ================================
// טיפול בטפסים
// ================================

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    
    // ולידציה
    if (!validateForm(form)) {
        showNotification('יש למלא את כל השדות החובה', 'error');
        return;
    }
    
    // איסוף נתונים
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // שמירת נתונים
    saveWorkflowData(data);
    
    // מעבר לשלב הבא
    goToNextStep();
    
    // הודעת הצלחה
    showNotification('הנתונים נשמרו בהצלחה', 'success');
}

function validateForm(form) {
    let isValid = true;
    
    // בדיקת שדות חובה
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    // ולידציות מיוחדות
    // אימייל
    form.querySelectorAll('[type="email"]').forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            field.classList.add('is-invalid');
            isValid = false;
        }
    });
    
    // טלפון
    form.querySelectorAll('[type="tel"]').forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
            field.classList.add('is-invalid');
            isValid = false;
        }
    });
    
    return isValid;
}

// ================================
// פונקציות עזר
// ================================

function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = progress;
            requestAnimationFrame(animate);
        } else {
            element.style.opacity = '1';
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300, callback) {
    const start = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = 1 - progress;
            requestAnimationFrame(animate);
        } else {
            element.style.opacity = '0';
            element.style.display = 'none';
            if (callback) callback();
        }
    }
    
    requestAnimationFrame(animate);
}

function animateProgressBar(bar) {
    const targetWidth = bar.dataset.width || bar.style.width;
    bar.style.width = '0';
    
    setTimeout(() => {
        bar.style.transition = 'width 1s ease';
        bar.style.width = targetWidth;
    }, 100);
}

function animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * progress;
        element.textContent = Math.round(current).toLocaleString('he-IL');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// ================================
// התראות ומודלים
// ================================

function showNotification(message, type = 'info', duration = 3000) {
    // יצירת התראה
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification-toast`;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // הוספה לדף
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    container.appendChild(notification);
    
    // הסרה אוטומטית
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function showConfirmDialog(title, message, onConfirm, onCancel) {
    // שימוש ב-Bootstrap Modal או SweetAlert אם זמין
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'אישור',
            cancelButtonText: 'ביטול',
            confirmButtonColor: '#00bf63',
            cancelButtonColor: '#6c757d'
        }).then((result) => {
            if (result.isConfirmed) {
                if (onConfirm) onConfirm();
            } else {
                if (onCancel) onCancel();
            }
        });
    } else {
        // Fallback לדיאלוג רגיל
        if (confirm(`${title}\n\n${message}`)) {
            if (onConfirm) onConfirm();
        } else {
            if (onCancel) onCancel();
        }
    }
}

// ================================
// ניהול נתונים
// ================================

function saveWorkflowState(key, value) {
    try {
        const state = JSON.parse(localStorage.getItem('workflowState') || '{}');
        state[key] = value;
        localStorage.setItem('workflowState', JSON.stringify(state));
    } catch (e) {
        console.error('Error saving workflow state:', e);
    }
}

function getWorkflowState(key) {
    try {
        const state = JSON.parse(localStorage.getItem('workflowState') || '{}');
        return key ? state[key] : state;
    } catch (e) {
        console.error('Error getting workflow state:', e);
        return null;
    }
}

function saveWorkflowData(data) {
    try {
        const existingData = JSON.parse(localStorage.getItem('workflowData') || '[]');
        existingData.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('workflowData', JSON.stringify(existingData));
    } catch (e) {
        console.error('Error saving workflow data:', e);
    }
}

function clearWorkflowData() {
    if (confirm('האם אתה בטוח שברצונך למחוק את כל הנתונים?')) {
        localStorage.removeItem('workflowState');
        localStorage.removeItem('workflowData');
        showNotification('הנתונים נמחקו בהצלחה', 'success');
        location.reload();
    }
}

// ================================
// ולידציות
// ================================

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\d-+().\s]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

function isValidIsraeliID(id) {
    id = String(id).trim();
    if (id.length !== 9) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        const digit = Number(id[i]);
        const weight = (i % 2) + 1;
        const weighted = digit * weight;
        sum += weighted > 9 ? weighted - 9 : weighted;
    }
    
    return sum % 10 === 0;
}

// ================================
// ייצוא נתונים
// ================================

function exportWorkflowData(format = 'json') {
    const data = localStorage.getItem('workflowData') || '[]';
    
    switch (format) {
        case 'json':
            downloadFile('workflow-data.json', data, 'application/json');
            break;
        
        case 'csv':
            const jsonData = JSON.parse(data);
            const csv = jsonToCSV(jsonData);
            downloadFile('workflow-data.csv', csv, 'text/csv');
            break;
        
        case 'excel':
            // דורש ספריית SheetJS
            if (typeof XLSX !== 'undefined') {
                const jsonData = JSON.parse(data);
                const ws = XLSX.utils.json_to_sheet(jsonData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Workflow Data');
                XLSX.writeFile(wb, 'workflow-data.xlsx');
            } else {
                showNotification('ייצוא ל-Excel לא זמין', 'error');
            }
            break;
    }
}

function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function jsonToCSV(jsonData) {
    if (!jsonData || !jsonData.length) return '';
    
    const headers = Object.keys(jsonData[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = jsonData.map(row => {
        return headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') 
                ? `"${value}"` 
                : value;
        }).join(',');
    });
    
    return [csvHeaders, ...csvRows].join('\n');
}

// ================================
// תמיכה בדפדפנים
// ================================

function checkBrowserSupport() {
    const issues = [];
    
    // בדיקת localStorage
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (e) {
        issues.push('localStorage לא זמין');
    }
    
    // בדיקת JavaScript features
    if (!window.Promise) {
        issues.push('Promise API לא נתמך');
    }
    
    if (!window.IntersectionObserver) {
        issues.push('IntersectionObserver לא נתמך');
    }
    
    // הצגת אזהרות במידת הצורך
    if (issues.length > 0) {
        console.warn('בעיות תאימות דפדפן:', issues);
        showNotification('חלק מהתכונות עלולות לא לעבוד כראוי בדפדפן זה', 'warning');
    }
}

// ================================
// פונקציות ניווט
// ================================

function goToNextStep() {
    const currentStep = parseInt(getWorkflowState('currentStep') || 1);
    const totalSteps = document.querySelectorAll('.process-step').length;
    
    if (currentStep < totalSteps) {
        const nextStep = currentStep + 1;
        const nextStepElement = document.querySelector(`.process-step[data-step="${nextStep}"]`);
        if (nextStepElement) {
            nextStepElement.click();
        }
    } else {
        showNotification('זהו השלב האחרון בתהליך', 'info');
    }
}

function goToPreviousStep() {
    const currentStep = parseInt(getWorkflowState('currentStep') || 1);
    
    if (currentStep > 1) {
        const prevStep = currentStep - 1;
        const prevStepElement = document.querySelector(`.process-step[data-step="${prevStep}"]`);
        if (prevStepElement) {
            prevStepElement.click();
        }
    } else {
        showNotification('זהו השלב הראשון בתהליך', 'info');
    }
}

// ================================
// טיימליין
// ================================

function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // הוספת אנימציה מתעכבת
        item.style.animationDelay = `${index * 0.1}s`;
        
        // הוספת אירוע לחיצה
        item.addEventListener('click', function() {
            // הסרת active מכולם
            timelineItems.forEach(i => i.classList.remove('active'));
            // הוספת active לנבחר
            this.classList.add('active');
            
            // הצגת פרטים נוספים
            const details = this.dataset.details;
            if (details) {
                showTimelineDetails(details);
            }
        });
    });
}

function showTimelineDetails(details) {
    const detailsPanel = document.querySelector('.timeline-details');
    if (detailsPanel) {
        detailsPanel.innerHTML = details;
        fadeIn(detailsPanel);
    }
}

// ================================
// מונים ומספרים
// ================================

function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = parseInt(counter.dataset.duration) || 2000;
        
        // אנימציה כשהאלמנט נראה
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(counter, 0, target, duration);
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ================================
// כרטיסי תהליך
// ================================

function initializeProcessCards() {
    const cards = document.querySelectorAll('.process-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-icon')?.classList.add('animate-bounce');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-icon')?.classList.remove('animate-bounce');
        });
    });
}

// ================================
// ייצוא פונקציות גלובליות
// ================================

window.WorkflowJS = {
    // פונקציות ראשיות
    init: initializeWorkflowComponents,
    showNotification,
    showConfirmDialog,
    
    // ניווט
    goToNextStep,
    goToPreviousStep,
    
    // נתונים
    saveWorkflowState,
    getWorkflowState,
    saveWorkflowData,
    clearWorkflowData,
    exportWorkflowData,
    
    // ולידציות
    validateForm,
    isValidEmail,
    isValidPhone,
    isValidIsraeliID,
    
    // אנימציות
    fadeIn,
    fadeOut,
    animateNumber,
    animateProgressBar
};

// ================================
// סיום
// ================================

console.log('WorkflowJS loaded successfully! Version 1.0');
