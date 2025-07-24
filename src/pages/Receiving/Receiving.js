import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Receiving.css';

// Alert Component
const AlertComponent = React.memo(({ alert, progress, onMouseEnter, onMouseLeave, onClose }) => {
  if (!alert) return null;
  
  return (
    <div className="custom-alert-overlay">
      <div 
        className={`custom-alert custom-alert-${alert.type}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="alert-header">
          <div className="alert-icon">
            <i className={alert.icon} />
          </div>
          <div className="alert-title">
            <h4>{alert.title}</h4>
            <span className="alert-timestamp">{alert.timestamp}</span>
          </div>
          <button className="alert-close" onClick={onClose}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="alert-content">
          <pre>{alert.message}</pre>
        </div>
        <div className="alert-progress-bar">
          <div 
            className="alert-progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
});

// Confirmation Dialog Component
const DialogComponent = React.memo(({ dialog }) => {
  const handleConfirm = React.useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dialog?.onConfirm?.();
  }, [dialog]);

  const handleCancel = React.useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dialog?.onCancel?.();
  }, [dialog]);

  const handleOverlayClick = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  React.useEffect(() => {
    if (!dialog) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCancel(e);
      if (e.key === 'Enter') handleConfirm(e);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dialog, handleCancel, handleConfirm]);

  if (!dialog) return null;

  return (
    <div 
      className="confirm-overlay" 
      onClick={handleOverlayClick}
      style={{ 
        position: 'fixed',
        isolation: 'isolate',
        contain: 'strict'
      }}
    >
      <div 
        className="confirm-dialog"
        style={{ 
          position: 'relative',
          isolation: 'isolate',
          contain: 'content'
        }}
      >
        <div className="confirm-header">
          <div className="confirm-icon">
            <i className="fas fa-question-circle" />
          </div>
          <h4>{dialog.title}</h4>
        </div>
        <div className="confirm-content">
          <pre>{dialog.message}</pre>
        </div>
        <div className="confirm-actions">
          <button 
            className="btn btn-secondary no-flash"
            onClick={handleCancel}
            type="button"
          >
            <i className="fas fa-times me-2" />
            {dialog.cancelText}
          </button>
          <button 
            className="btn btn-primary no-flash"
            onClick={handleConfirm}
            type="button"
          >
            <i className="fas fa-check me-2" />
            {dialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
});

function Receiving() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [receivingData, setReceivingData] = useState({});
  const [customAlert, setCustomAlert] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [alertProgress, setAlertProgress] = useState(100);
  const [alertTimer, setAlertTimer] = useState(null);
  const [progressInterval, setProgressInterval] = useState(null);
  
  // Use refs for values that don't need to trigger re-renders
  const isProcessing = React.useRef(false);

  useEffect(() => {
    // Mock data - in real app this would be API calls
    setReceivingData({
      dashboard: {
        stats: [
          { 
            title: 'ממתין לקבלה', 
            value: 23, 
            icon: 'fas fa-clock', 
            color: '#ffc107',
            change: '+3 מאתמול'
          },
          { 
            title: 'התקבל היום', 
            value: 8, 
            icon: 'fas fa-check-circle', 
            color: '#28a745',
            change: '+5 מאתמול'
          },
          { 
            title: 'בבדיקה', 
            value: 12, 
            icon: 'fas fa-search', 
            color: '#17a2b8',
            change: '-2 מאתמול'
          },
          { 
            title: 'דרוש טיפול', 
            value: 4, 
            icon: 'fas fa-exclamation-triangle', 
            color: '#dc3545',
            change: '+1 מאתמול'
          }
        ],
        urgentDeliveries: [
          {
            id: 'RCV-2025-001',
            poNumber: 'PO-2024-445',
            supplier: 'טכנולוגיות מתקדמות בע"מ',
            items: 'מחשבים ניידים Dell (15 יח\')',
            expectedDate: '2025-01-25',
            status: 'urgent',
            daysOverdue: 2
          },
          {
            id: 'RCV-2025-002',
            poNumber: 'PO-2024-456',
            supplier: 'סמארט טק פתרונות',
            items: 'מדפסות HP LaserJet (3 יח\')',
            expectedDate: '2025-01-24',
            status: 'pending',
            daysOverdue: 0
          },
          {
            id: 'RCV-2025-003',
            poNumber: 'PO-2024-467',
            supplier: 'רכיבים ומערכות בע"מ',
            items: 'כבלי רשת ואביזרים',
            expectedDate: '2025-01-26',
            status: 'partial',
            receivedQty: '60%'
          }
        ]
      },
      receivingList: [
        {
          id: 'RCV-2025-001',
          poNumber: 'PO-2024-445',
          supplier: 'טכנולוגיות מתקדמות בע"מ',
          supplierContact: 'אליעזר כהן',
          phone: '03-1234567',
          items: [
            { name: 'מחשב נישא Dell Latitude 5520', ordered: 15, received: 0, pending: 15 },
            { name: 'תיק למחשב נישא', ordered: 15, received: 0, pending: 15 }
          ],
          expectedDate: '2025-01-25',
          actualDate: null,
          status: 'pending',
          priority: 'high',
          trackingNumber: 'DHL789456123',
          totalValue: 67500,
          notes: 'משלוח דחוף - נדרש לקבלה עד סוף השבוע'
        },
        {
          id: 'RCV-2025-002',
          poNumber: 'PO-2024-456',
          supplier: 'סמארט טק פתרונות',
          supplierContact: 'שרה לוי',
          phone: '02-9876543',
          items: [
            { name: 'מדפסת HP LaserJet P1102', ordered: 3, received: 0, pending: 3 },
            { name: 'טונר HP 85A', ordered: 9, received: 0, pending: 9 }
          ],
          expectedDate: '2025-01-24',
          actualDate: null,
          status: 'in_transit',
          priority: 'medium', 
          trackingNumber: 'UPS123789456',
          totalValue: 8900,
          notes: ''
        },
        {
          id: 'RCV-2025-003',
          poNumber: 'PO-2024-467',
          supplier: 'רכיבים ומערכות בע"מ',
          supplierContact: 'דוד אברהם',
          phone: '09-5555444',
          items: [
            { name: 'כבל רשת Cat6 (100m)', ordered: 10, received: 6, pending: 4 },
            { name: 'מחברי RJ45', ordered: 100, received: 100, pending: 0 },
            { name: 'מתג רשת 24 פורט', ordered: 2, received: 1, pending: 1 }
          ],
          expectedDate: '2025-01-23',
          actualDate: '2025-01-23',
          status: 'partial',
          priority: 'low',
          trackingNumber: 'FDX456123789',
          totalValue: 12300,
          notes: 'התקבל משלוח חלקי - חסרים 4 כבלי רשת ומתג אחד'
        },
        {
          id: 'RCV-2025-004',
          poNumber: 'PO-2024-478',
          supplier: 'דיגיטל סולושנס',
          supplierContact: 'מיכאל רוזן',
          phone: '08-7777888',
          items: [
            { name: 'רישיון Windows 11 Pro', ordered: 20, received: 20, pending: 0 },
            { name: 'רישיון Office 365', ordered: 20, received: 20, pending: 0 }
          ],
          expectedDate: '2025-01-22',
          actualDate: '2025-01-22',
          status: 'completed',
          priority: 'medium',
          trackingNumber: 'EMAIL-LICENSE',
          totalValue: 24000,
          notes: 'רישיונות התקבלו באימייל - הועברו למחלקת IT'
        }
      ]
    });
  }, []);

  // Custom Alert Functions
  const showAlert = (type, title, message, icon = null, autoHideDelay = null) => {
    // Clear any existing timers first
    if (alertTimer) {
      clearTimeout(alertTimer);
      setAlertTimer(null);
    }
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }

    setCustomAlert({
      type,
      title,
      message,
      icon: icon || getAlertIcon(type),
      timestamp: new Date().toLocaleString('he-IL')
    });
    
    // Determine auto-hide delay based on alert type or custom duration
    let delay = autoHideDelay;
    if (delay === null) {
      switch (type) {
        case 'info':
        case 'tracking':
          delay = 15000; // 15 seconds for detailed information
          break;
        case 'success':
          delay = 7000;  // 7 seconds for success messages
          break;
        case 'error':
        case 'warning':
          delay = 10000; // 10 seconds for errors/warnings
          break;
        default:
          delay = 5000;  // 5 seconds for other types
      }
    }
    
    // Auto-hide after specified delay, or disable auto-hide if delay is 0
    if (delay > 0) {
      setAlertProgress(100);
      
      // Progress bar animation
      const newProgressInterval = setInterval(() => {
        setAlertProgress(prev => {
          const newProgress = prev - (100 / (delay / 100));
          if (newProgress <= 0) {
            return 0;
          }
          return newProgress;
        });
      }, 100);
      setProgressInterval(newProgressInterval);
      
      // Auto-hide alert
      const newTimer = setTimeout(() => {
        setCustomAlert(null);
        setAlertProgress(100);
        if (newProgressInterval) {
          clearInterval(newProgressInterval);
          setProgressInterval(null);
        }
        setAlertTimer(null);
      }, delay);
      setAlertTimer(newTimer);
    }
  };

  const showConfirm = (title, message, onConfirm, confirmText = 'אישור', cancelText = 'ביטול') => {
    setConfirmDialog({
      title,
      message,
      onConfirm: () => {
        setConfirmDialog(null);
        requestAnimationFrame(() => {
          onConfirm();
        });
      },
      onCancel: () => setConfirmDialog(null),
      confirmText,
      cancelText
    });
  };

  const getAlertIcon = (type) => {
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-triangle',
      warning: 'fas fa-exclamation-circle',
      info: 'fas fa-info-circle',
      tracking: 'fas fa-truck',
      receiving: 'fas fa-inbox',
      filter: 'fas fa-filter'
    };
    return icons[type] || 'fas fa-info-circle';
  };

  const handleAlertMouseEnter = () => {
    // Pause timers when hovering
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
    if (alertTimer) {
      clearTimeout(alertTimer);
      setAlertTimer(null);
    }
  };

  const handleAlertMouseLeave = () => {
    // Resume timers when not hovering - but only if there was an original auto-hide delay
    if (customAlert && alertProgress > 0) {
      // If the alert was created with auto-hide disabled (delay = 0), don't restart timers
      const isAutoHide = customAlert.type !== 'info' || alertProgress < 100;
      
      if (isAutoHide) {
        const remainingTime = (alertProgress / 100) * (
          customAlert.type === 'info' || customAlert.type === 'tracking' ? 15000 : 
          customAlert.type === 'success' ? 7000 : 10000
        );
        
        if (remainingTime > 0) {
          const newProgressInterval = setInterval(() => {
            setAlertProgress(prev => {
              const newProgress = prev - (100 / (remainingTime / 100));
              if (newProgress <= 0) {
                clearInterval(newProgressInterval);
                return 0;
              }
              return newProgress;
            });
          }, 100);
          setProgressInterval(newProgressInterval);
          
          const newTimer = setTimeout(() => {
            setCustomAlert(null);
            clearInterval(newProgressInterval);
            setAlertProgress(100);
          }, remainingTime);
          setAlertTimer(newTimer);
        }
      }
    }
  };

  const handleExportToExcel = () => {
    try {
      // Create CSV content
      const csvContent = [
        'מספר קבלה,מספר הזמנה,ספק,תאריך צפוי,סטטוס,שווי,הערות',
        ...receivingData.receivingList?.map(item => 
          `${item.id},${item.poNumber},${item.supplier},${item.expectedDate},${getStatusText(item.status)},₪${item.totalValue.toLocaleString()},"${item.notes}"`
        ) || []
      ].join('\n');

      // Create and download file
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      const fileName = `receiving-report-${new Date().toISOString().split('T')[0]}.csv`;
      link.download = fileName;
      link.click();

      showAlert(
        'success',
        'הייצוא הושלם בהצלחה',
        `הקובץ ${fileName} הורד למחשב שלך. הדוח כולל ${receivingData.receivingList?.length || 0} משלוחים.`,
        'fas fa-download'
      );
    } catch (error) {
      showAlert(
        'error',
        'שגיאה בייצוא',
        'אירעה שגיאה במהלך ייצוא הנתונים. אנא נסה שוב.',
        'fas fa-exclamation-triangle'
      );
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'ממתין לקבלה',
      'in_transit': 'בדרך',
      'partial': 'התקבל חלקית',
      'completed': 'הושלם',
      'urgent': 'דחוף'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const classMap = {
      'pending': 'warning',
      'in_transit': 'info',
      'partial': 'primary',
      'completed': 'success',
      'urgent': 'danger'
    };
    return classMap[status] || 'secondary';
  };

  const getPriorityClass = (priority) => {
    const classMap = {
      'high': 'danger',
      'medium': 'warning',
      'low': 'success'
    };
    return classMap[priority] || 'secondary';
  };

  const getPriorityText = (priority) => {
    const priorityMap = {
      'high': 'גבוהה',
      'medium': 'בינונית',
      'low': 'נמוכה'
    };
    return priorityMap[priority] || priority;
  };

  const handleReceiveItem = useCallback((receivingId) => {
    if (confirmDialog) return;
    
    const item = receivingData.receivingList?.find(item => item.id === receivingId);
    if (!item) return;

    // Batch state updates to prevent multiple rerenders
    const cleanup = () => {
      setCustomAlert(null);
      if (alertTimer) {
        clearTimeout(alertTimer);
        setAlertTimer(null);
      }
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    };

    // Use requestAnimationFrame to ensure smooth UI updates
    requestAnimationFrame(cleanup);

    const itemsList = item.items.map(subItem => 
      `• ${subItem.name} - כמות: ${subItem.pending} יחידות`
    ).join('\n');

    showConfirm(
      'אישור קבלת משלוח',
      `האם אתה בטוח שברצונך לקבל את המשלוח ${receivingId}?\n\nספק: ${item.supplier}\nהזמנה: ${item.poNumber}\n\nפריטים לקבלה:\n${itemsList}\n\nהפעולה תעדכן את סטטוס המשלוח ותרשום את הפריטים במלאי.`,
      () => {
        // Clear the confirmation dialog first
        setConfirmDialog(null);

        // Wait a brief moment before updating the data and showing the success message
        setTimeout(() => {
          // Simulate receiving process
          setReceivingData(prev => ({
            ...prev,
            receivingList: prev.receivingList.map(listItem => 
              listItem.id === receivingId 
                ? { 
                    ...listItem, 
                    status: 'completed', 
                    actualDate: new Date().toISOString().split('T')[0],
                    items: listItem.items.map(subItem => ({
                      ...subItem,
                      received: subItem.ordered,
                      pending: 0
                    }))
                  }
                : listItem
            )
          }));
          
          // Show success message with longer display time
          showAlert(
            'success',
            'משלוח התקבל בהצלחה!',
            `משלוח ${receivingId} עובד בהצלחה.\n\n• הפריטים נרשמו במלאי המחסן\n• נשלח אישור אוטומטי לספק ${item.supplier}\n• סטטוס המשלוח עודכן להושלם\n• התאריך בפועל: ${new Date().toLocaleDateString('he-IL')}`,
            'fas fa-check-circle',
            10000 // Show success message for 10 seconds
          );
        }, 100);
      },
      'קבל משלוח',
      'ביטול'
    );
  }, [confirmDialog, receivingData.receivingList, showConfirm]);

  const handleTrackShipment = (trackingNumber) => {
    // Simulate tracking information
    const trackingInfo = {
      'DHL789456123': {
        carrier: 'DHL',
        status: 'בדרך',
        location: 'מרכז חלוקה תל אביב',
        estimatedDelivery: '25/01/2025',
        updates: [
          { date: '23/01/2025 14:30', status: 'נאסף מהספק', location: 'רמת גן' },
          { date: '24/01/2025 08:15', status: 'הגיע למרכז חלוקה', location: 'תל אביב' },
          { date: '24/01/2025 16:45', status: 'יצא למשלוח', location: 'תל אביב' }
        ]
      },
      'UPS123789456': {
        carrier: 'UPS',
        status: 'הוכן למשלוח',
        location: 'מחסן הספק',
        estimatedDelivery: '24/01/2025',
        updates: [
          { date: '22/01/2025 11:20', status: 'הזמן התקבל', location: 'ירושלים' },
          { date: '23/01/2025 09:00', status: 'נאסף מהספק', location: 'ירושלים' }
        ]
      },
      'FDX456123789': {
        carrier: 'FedEx',
        status: 'נמסר',
        location: 'נמסר בקבלה',
        estimatedDelivery: '23/01/2025',
        updates: [
          { date: '22/01/2025 10:00', status: 'יצא מהספק', location: 'פתח תקווה' },
          { date: '23/01/2025 14:20', status: 'נמסר', location: 'המשרד' }
        ]
      }
    };

    const info = trackingInfo[trackingNumber] || {
      carrier: 'לא זוהה',
      status: 'מידע לא זמין',
      location: 'N/A',
      estimatedDelivery: 'N/A',
      updates: []
    };

    const updatesText = info.updates.length > 0 
      ? info.updates.map(update => `• ${update.date} - ${update.status} (${update.location})`).join('\n')
      : 'אין עדכונים זמינים';

    showAlert(
      'tracking',
      `מעקב משלוח: ${trackingNumber}`,
      `חברת המשלוח: ${info.carrier}\nמיקום נוכחי: ${info.location}\nסטטוס: ${info.status}\nאספקה צפויה: ${info.estimatedDelivery}\n\nעדכונים אחרונים:\n${updatesText}\n\n💡 המידע מתעדכן ישירות ממערכת חברת המשלוח`,
      'fas fa-truck'
    );
  };

  const handleViewDetails = (receivingId) => {
    const item = receivingData.receivingList?.find(item => item.id === receivingId);
    if (!item) return;

    const itemsDetails = item.items.map(subItem => 
      `• ${subItem.name}: ${subItem.received}/${subItem.ordered} (ממתין: ${subItem.pending})`
    ).join('\n');

    const details = `
📦 פרטי משלוח מלאים
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆔 מספר קבלה: ${item.id}
📋 מספר הזמנה: ${item.poNumber}
🏢 ספק: ${item.supplier}
👤 איש קשר: ${item.supplierContact}
📞 טלפון: ${item.phone}

📅 תאריכים:
• תאריך צפוי: ${item.expectedDate}
${item.actualDate ? `• תאריך בפועל: ${item.actualDate}` : '• טרם התקבל'}

📦 סטטוス: ${getStatusText(item.status)}
⚡ עדיפות: ${getPriorityText(item.priority)}
🚚 מעקב: ${item.trackingNumber}
💰 שווי כולל: ₪${item.totalValue.toLocaleString()}

📋 פריטים:
${itemsDetails}

📝 הערות:
${item.notes || 'אין הערות'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    const dateInfo = item.actualDate 
      ? `תאריך צפוי: ${item.expectedDate}\nתאריך בפועל: ${item.actualDate}`
      : `תאריך צפוי: ${item.expectedDate}\nטרם התקבל`;

    showAlert(
      'info',
      `פרטי משלוח: ${item.id}`,
      `מספר הזמנה: ${item.poNumber}\nספק: ${item.supplier}\nאיש קשר: ${item.supplierContact}\nטלפון: ${item.phone}\n\n${dateInfo}\n\nסטטוס: ${getStatusText(item.status)}\nעדיפות: ${getPriorityText(item.priority)}\nמעקב: ${item.trackingNumber}\nשווי כולל: ₪${item.totalValue.toLocaleString()}\n\nפריטים:\n${itemsDetails}\n\nהערות:\n${item.notes || 'אין הערות'}`,
      'fas fa-info-circle',
      0  // Set autoHideDelay to 0 to disable auto-hide
    );
  };

  const handleNewReceiving = () => {
    showConfirm(
      'רישום קבלה חדשה',
      'האם ברצונך לרשום קבלת משלוח חדשה?\n\nהטופס יכלול:\n• פרטי הספק והמשלוח\n• רשימת פריטים\n• בדיקת איכות\n• רישום במלאי\n\nהמשלוח יתווסף לרשימת ההמתנה לקבלה.',
      () => {
        // Simulate new receiving registration
        const newReceiving = {
          id: `RCV-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          poNumber: `PO-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          supplier: 'ספק חדש',
          supplierContact: 'איש קשר',
          phone: '03-1234567',
          items: [
            { name: 'פריט חדש', ordered: 1, received: 0, pending: 1 }
          ],
          expectedDate: new Date().toISOString().split('T')[0],
          actualDate: null,
          status: 'pending',
          priority: 'medium',
          trackingNumber: `TRK${Math.floor(Math.random() * 1000000)}`,
          totalValue: 1000,
          notes: 'רישום קבלה חדש'
        };

        setReceivingData(prev => ({
          ...prev,
          receivingList: [newReceiving, ...prev.receivingList]
        }));

        setConfirmDialog(null);

        showAlert(
          'success',
          'קבלה חדשה נרשמה!',
          `נרשמה קבלה חדשה: ${newReceiving.id}\n\n• ההזמנה: ${newReceiving.poNumber}\n• המשלוח נוסף לרשימת ההמתנה\n• ניתן לעקוב אחר הסטטוס ברשימת המשלוחים`,
          'fas fa-plus-circle'
        );
      },
      'רשום קבלה',
      'ביטול'
    );
  };

  const handleStatCardClick = (statType) => {
    const statusMapping = {
      'ממתין לקבלה': 'pending',
      'התקבל היום': 'completed',
      'בבדיקה': 'partial',
      'דרוש טיפול': 'urgent'
    };
    
    const targetStatus = statusMapping[statType];
    if (targetStatus) {
      setStatusFilter(targetStatus);
      setActiveTab('list');
      
      const itemCount = receivingData.receivingList?.filter(item => item.status === targetStatus).length || 0;
      showAlert(
        'filter',
        'סינון הופעל',
        `מעבר לרשימת המשלוחים\n\nמסנן עבור: ${statType}\nנמצאו ${itemCount} פריטים תואמים`,
        'fas fa-filter'
      );
    }
  };

  const filteredReceivingList = receivingData.receivingList?.filter(item => {
    const matchesSearch = item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplierContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.items.some(subItem => subItem.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateRange({ from: '', to: '' });
    // Removed showAlert for clearing filters
  };

  const handleQuickFilter = (filterType) => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filterType) {
      case 'today':
        setStatusFilter('all');
        setSearchTerm('');
        // Removed showAlert for quick filter
        break;
      case 'urgent':
        setStatusFilter('urgent');
        setSearchTerm('');
        // Removed showAlert for quick filter
        break;
      case 'overdue':
        setStatusFilter('pending');
        // Removed showAlert for quick filter
        break;
      case 'completed':
        setStatusFilter('completed');
        setSearchTerm('');
        // Removed showAlert for quick filter
        break;
      default:
        break;
    }
  };

  const renderDashboardTab = () => (
    <div className="dashboard-tab">
      <div className="dashboard-stats">
        <div className="stats-grid">
          {receivingData.dashboard?.stats?.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card clickable" 
              onClick={() => handleStatCardClick(stat.title)}
              style={{ cursor: 'pointer' }}
              title={`לחץ לסינון ${stat.title}`}
            >
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <h4>{stat.value}</h4>
                <p>{stat.title}</p>
                <div className="stat-change">{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="urgent-deliveries">
        <h5>משלוחים דחופים</h5>
        <div className="deliveries-list">
          {receivingData.dashboard?.urgentDeliveries?.map((delivery, index) => (
            <div key={index} className={`delivery-card ${delivery.status}`}>
              <div className="delivery-header">
                <div className="delivery-id">{delivery.id}</div>
                <div className={`status-badge ${getStatusClass(delivery.status)}`}>
                  {getStatusText(delivery.status)}
                </div>
              </div>
              <div className="delivery-info">
                <div className="delivery-row">
                  <strong>הזמנה:</strong> {delivery.poNumber}
                </div>
                <div className="delivery-row">
                  <strong>ספק:</strong> {delivery.supplier}
                </div>
                <div className="delivery-row">
                  <strong>פריטים:</strong> {delivery.items}
                </div>
                <div className="delivery-row">
                  <strong>תאריך צפוי:</strong> {delivery.expectedDate}
                </div>
                {delivery.daysOverdue > 0 && (
                  <div className="delivery-row overdue">
                    <strong>איחור:</strong> {delivery.daysOverdue} ימים
                  </div>
                )}
                {delivery.receivedQty && (
                  <div className="delivery-row partial">
                    <strong>התקבל:</strong> {delivery.receivedQty}
                  </div>
                )}
              </div>
              <div className="delivery-actions">
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => handleReceiveItem(delivery.id)}
                >
                  <i className="fas fa-inbox me-1"></i>
                  קבל משלוח
                </button>
                <button 
                  className="btn btn-sm btn-outline-info"
                  onClick={() => handleViewDetails(delivery.id)}
                >
                  <i className="fas fa-eye me-1"></i>
                  פרטים
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReceivingListTab = () => (
    <div className="receiving-list-tab">
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <label>חיפוש:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חפש לפי ספק, הזמנה, מספר קבלה או פריט..."
              className="form-control"
            />
          </div>
          <div className="filter-group">
            <label>סטטוס:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
            >
              <option value="all">כל הסטטוסים</option>
              <option value="pending">ממתין לקבלה</option>
              <option value="in_transit">בדרך</option>
              <option value="partial">התקבל חלקית</option>
              <option value="completed">הושלם</option>
              <option value="urgent">דחוף</option>
            </select>
          </div>
        </div>
        
        <div className="quick-filters">
          <label>סינון מהיר:</label>
          <div className="quick-filter-buttons">
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleQuickFilter('today')}
            >
              <i className="fas fa-calendar-day me-1"></i>
              היום
            </button>
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleQuickFilter('urgent')}
            >
              <i className="fas fa-exclamation-triangle me-1"></i>
              דחוף
            </button>
            <button 
              className="btn btn-sm btn-outline-warning"
              onClick={() => handleQuickFilter('overdue')}
            >
              <i className="fas fa-clock me-1"></i>
              באיחור
            </button>
            <button 
              className="btn btn-sm btn-outline-success"
              onClick={() => handleQuickFilter('completed')}
            >
              <i className="fas fa-check me-1"></i>
              הושלם
            </button>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={handleClearFilters}
            >
              <i className="fas fa-times me-1"></i>
              נקה
            </button>
          </div>
        </div>
        
        <div className="results-summary">
          <span>מוצגים {filteredReceivingList.length} משלוחים מתוך {receivingData.receivingList?.length || 0}</span>
        </div>
      </div>

      <div className="receiving-table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">מספר קבלה</div>
            <div className="table-cell">הזמנה</div>
            <div className="table-cell">ספק</div>
            <div className="table-cell">פריטים</div>
            <div className="table-cell">תאריך צפוי</div>
            <div className="table-cell">סטטוס</div>
            <div className="table-cell">עדיפות</div>
            <div className="table-cell">פעולות</div>
          </div>
        </div>
        <div className="table-body">
          {filteredReceivingList.map((item, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">
                <div className="receiving-id">{item.id}</div>
                {item.trackingNumber && (
                  <div className="tracking-number">
                    <i className="fas fa-truck me-1"></i>
                    {item.trackingNumber}
                  </div>
                )}
              </div>
              <div className="table-cell">
                <div className="po-number">{item.poNumber}</div>
              </div>
              <div className="table-cell">
                <div className="supplier-info">
                  <div className="supplier-name">{item.supplier}</div>
                  <div className="supplier-contact">
                    <i className="fas fa-user me-1"></i>
                    {item.supplierContact}
                  </div>
                  <div className="supplier-phone">
                    <i className="fas fa-phone me-1"></i>
                    {item.phone}
                  </div>
                </div>
              </div>
              <div className="table-cell">
                <div className="items-summary">
                  {item.items.map((subItem, idx) => (
                    <div key={idx} className="item-row">
                      <span className="item-name">{subItem.name}</span>
                      <span className="item-quantity">
                        {subItem.received}/{subItem.ordered}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="table-cell">
                <div className="expected-date">{item.expectedDate}</div>
                {item.actualDate && (
                  <div className="actual-date">
                    <i className="fas fa-check me-1"></i>
                    {item.actualDate}
                  </div>
                )}
              </div>
              <div className="table-cell">
                <span className={`status-badge ${getStatusClass(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
              <div className="table-cell">
                <span className={`priority-badge ${getPriorityClass(item.priority)}`}>
                  {getPriorityText(item.priority)}
                </span>
              </div>
              <div className="table-cell">
                <div className="action-buttons">
                  <button
                    className="btn btn-sm btn-primary no-flash"
                    onClick={() => handleReceiveItem(item.id)}
                    disabled={item.status === 'completed'}
                    style={{
                      contain: 'content',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      perspective: '1000px'
                    }}
                  >
                    <i className="fas fa-inbox"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-info no-flash"
                    onClick={() => handleTrackShipment(item.trackingNumber)}
                    style={{
                      contain: 'content',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      perspective: '1000px'
                    }}
                  >
                    <i className="fas fa-truck"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary no-flash"
                    onClick={() => handleViewDetails(item.id)}
                    style={{
                      contain: 'content',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      perspective: '1000px'
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="receiving-container">
      <AlertComponent 
        alert={customAlert}
        progress={alertProgress}
        onMouseEnter={handleAlertMouseEnter}
        onMouseLeave={handleAlertMouseLeave}
        onClose={() => setCustomAlert(null)}
      />
      
      <DialogComponent dialog={confirmDialog} />

      <div className="receiving-header">
        <div className="header-content">
          <div className="page-title">
            <h2>ניהול קבלת סחורה</h2>
            <nav className="breadcrumb">
              <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">קבלת סחורה</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleExportToExcel}>
              <i className="fas fa-download me-2"></i>
              ייצא לאקסל
            </button>
            <button className="btn btn-primary" onClick={handleNewReceiving}>
              <i className="fas fa-plus me-2"></i>
              רשום קבלה חדשה
            </button>
          </div>
        </div>
      </div>

      <div className="receiving-content">
        <div className="receiving-tabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <i className="fas fa-tachometer-alt me-2"></i>
                סקירה כללית
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
              >
                <i className="fas fa-list me-2"></i>
                רשימת משלוחים
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'list' && renderReceivingListTab()}
        </div>
      </div>
    </div>
  );
}

// Export the component
export default Receiving;