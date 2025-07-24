import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RFQCreate.css';

const RFQCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'בינוני',
    category: '',
    dueDate: '',
    estimatedValue: '',
    products: [],
    suppliers: [],
    terms: {
      paymentTerms: '',
      deliveryTerms: '',
      warrantyRequirements: '',
      additionalNotes: ''
    },
    documents: [],
    requiresApproval: false,
    approvalNotes: ''
  });
  
  const [availableProducts, setAvailableProducts] = useState([]);
  const [availableSuppliers, setAvailableSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Mock data - in real app this would be API calls
    setAvailableProducts([
      { id: 'PROD001', name: 'מחשב נישא Dell Latitude 5520', category: 'מחשבים', unit: 'יחידה' },
      { id: 'PROD002', name: 'מסך Samsung 24"', category: 'אביזרים', unit: 'יחידה' },
      { id: 'PROD003', name: 'מקלדת אלחוטית Logitech', category: 'אביזרים', unit: 'יחידה' },
      { id: 'PROD004', name: 'עכבר אלחוטי Microsoft', category: 'אביזרים', unit: 'יחידה' },
      { id: 'PROD005', name: 'מדפסת HP LaserJet', category: 'ציוד משרדי', unit: 'יחידה' }
    ]);

    setAvailableSuppliers([
      { id: 'SUP001', name: 'טכנולוגיות מתקדמות בע"מ', email: 'info@techcompany.co.il', categories: ['מחשבים', 'אביזרים'] },
      { id: 'SUP002', name: 'רכיבים ומערכות בע"מ', email: 'sales@components.co.il', categories: ['אביזרים', 'רשתות'] },
      { id: 'SUP003', name: 'סמארט טק פתרונות', email: 'contact@smarttech.co.il', categories: ['מחשבים', 'ציוד משרדי'] },
      { id: 'SUP004', name: 'דיגיטל סולושנס', email: 'info@digitalsol.co.il', categories: ['רשתות', 'תוכנה'] }
    ]);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTermsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        [field]: value
      }
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { id: '', name: '', quantity: 1, unit: '', specifications: '' }]
    }));
  };

  const updateProduct = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map((product, i) => 
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  const removeProduct = (index) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const toggleSupplier = (supplierId) => {
    setFormData(prev => ({
      ...prev,
      suppliers: prev.suppliers.includes(supplierId)
        ? prev.suppliers.filter(id => id !== supplierId)
        : [...prev.suppliers, supplierId]
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      }))]
    }));
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'כותרת הבקשה חובה';
        if (!formData.description.trim()) newErrors.description = 'תיאור הבקשה חובה';
        if (!formData.category) newErrors.category = 'קטגוריה חובה';
        if (!formData.dueDate) newErrors.dueDate = 'תאריך יעד חובה';
        break;
      case 2:
        if (formData.products.length === 0) newErrors.products = 'יש להוסיף לפחות מוצר אחד';
        formData.products.forEach((product, index) => {
          if (!product.id) newErrors[`product_${index}_id`] = 'יש לבחור מוצר';
          if (!product.quantity || product.quantity <= 0) newErrors[`product_${index}_quantity`] = 'כמות חובה';
        });
        break;
      case 3:
        if (formData.suppliers.length === 0) newErrors.suppliers = 'יש לבחור לפחות ספק אחד';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Generate new RFQ ID
      const newRFQId = `RFQ-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      // In real app, this would be an API call
      console.log('Creating RFQ:', { id: newRFQId, ...formData });
      
      alert(`בקשת RFQ נוצרה בהצלחה!\nמספר בקשה: ${newRFQId}`);
      navigate('/rfq');
    }
  };

  const handleBackToList = () => {
    if (window.confirm('האם אתה בטוח שברצונך לצאת? הנתונים שהוזנו יאבדו.')) {
      navigate('/rfq');
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3, 4, 5].map(step => (
        <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
          <div className="step-number">
            {currentStep > step ? <i className="fas fa-check"></i> : step}
          </div>
          <div className="step-label">
            {step === 1 && 'פרטי בסיס'}
            {step === 2 && 'מוצרים'}
            {step === 3 && 'ספקים'}
            {step === 4 && 'תנאים'}
            {step === 5 && 'סיכום'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="form-step">
      <h4>פרטי הבקשה הבסיסיים</h4>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="title">כותרת הבקשה *</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="הזן כותרת תיאורית לבקשה"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="category">קטגוריה *</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={errors.category ? 'error' : ''}
          >
            <option value="">בחר קטגוריה</option>
            <option value="מחשבים">מחשבים</option>
            <option value="אביזרים">אביזרים</option>
            <option value="ציוד משרדי">ציוד משרדי</option>
            <option value="רשתות">רשתות</option>
            <option value="תוכנה">תוכנה</option>
            <option value="אחר">אחר</option>
          </select>
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="priority">עדיפות</label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
          >
            <option value="גבוה">גבוה</option>
            <option value="בינוני">בינוני</option>
            <option value="נמוך">נמוך</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">תאריך יעד *</label>
          <input
            type="date"
            id="dueDate"
            value={formData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={errors.dueDate ? 'error' : ''}
          />
          {errors.dueDate && <div className="error-message">{errors.dueDate}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="estimatedValue">שווי משוער (₪)</label>
          <input
            type="number"
            id="estimatedValue"
            value={formData.estimatedValue}
            onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">תיאור הבקשה *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="תאר את הבקשה בפירוט, כולל דרישות מיוחדות ומפרטים טכניים"
            rows="4"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h4>מוצרים ושירותים</h4>
      {errors.products && <div className="error-message">{errors.products}</div>}
      
      <div className="products-section">
        {formData.products.map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-header">
              <h6>מוצר #{index + 1}</h6>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeProduct(index)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
            
            <div className="product-form">
              <div className="form-group">
                <label>בחר מוצר *</label>
                <select
                  value={product.id}
                  onChange={(e) => {
                    const selectedProduct = availableProducts.find(p => p.id === e.target.value);
                    updateProduct(index, 'id', e.target.value);
                    updateProduct(index, 'name', selectedProduct ? selectedProduct.name : '');
                    updateProduct(index, 'unit', selectedProduct ? selectedProduct.unit : '');
                  }}
                  className={errors[`product_${index}_id`] ? 'error' : ''}
                >
                  <option value="">בחר מוצר</option>
                  {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {errors[`product_${index}_id`] && <div className="error-message">{errors[`product_${index}_id`]}</div>}
              </div>

              <div className="form-group">
                <label>כמות *</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 0)}
                  min="1"
                  className={errors[`product_${index}_quantity`] ? 'error' : ''}
                />
                {errors[`product_${index}_quantity`] && <div className="error-message">{errors[`product_${index}_quantity`]}</div>}
              </div>

              <div className="form-group">
                <label>יחידת מידה</label>
                <input
                  type="text"
                  value={product.unit}
                  onChange={(e) => updateProduct(index, 'unit', e.target.value)}
                  placeholder="יחידה"
                />
              </div>

              <div className="form-group full-width">
                <label>מפרטים נוספים</label>
                <textarea
                  value={product.specifications}
                  onChange={(e) => updateProduct(index, 'specifications', e.target.value)}
                  placeholder="תאר מפרטים טכניים או דרישות מיוחדות עבור מוצר זה"
                  rows="2"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          className="btn btn-outline-primary add-product-btn"
          onClick={addProduct}
        >
          <i className="fas fa-plus me-2"></i>
          הוסף מוצר
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h4>בחירת ספקים</h4>
      {errors.suppliers && <div className="error-message">{errors.suppliers}</div>}
      
      <div className="suppliers-section">
        <p className="instruction">בחר את הספקים אליהם תרצה לשלוח את הבקשה:</p>
        
        <div className="suppliers-grid">
          {availableSuppliers.map(supplier => (
            <div key={supplier.id} className={`supplier-card ${formData.suppliers.includes(supplier.id) ? 'selected' : ''}`}>
              <div className="supplier-checkbox">
                <input
                  type="checkbox"
                  id={`supplier_${supplier.id}`}
                  checked={formData.suppliers.includes(supplier.id)}
                  onChange={() => toggleSupplier(supplier.id)}
                />
                <label htmlFor={`supplier_${supplier.id}`}></label>
              </div>
              
              <div className="supplier-info" onClick={() => toggleSupplier(supplier.id)}>
                <h6>{supplier.name}</h6>
                <p className="supplier-email">{supplier.email}</p>
                <div className="supplier-categories">
                  {supplier.categories.map(category => (
                    <span key={category} className="category-tag">{category}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="selected-count">
          נבחרו {formData.suppliers.length} ספקים
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h4>תנאים ומסמכים</h4>
      
      <div className="terms-section">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="paymentTerms">תנאי תשלום</label>
            <select
              id="paymentTerms"
              value={formData.terms.paymentTerms}
              onChange={(e) => handleTermsChange('paymentTerms', e.target.value)}
            >
              <option value="">בחר תנאי תשלום</option>
              <option value="שוטף+30">שוטף + 30 יום</option>
              <option value="שוטף+60">שוטף + 60 יום</option>
              <option value="שוטף+90">שוטף + 90 יום</option>
              <option value="מיידי">תשלום מיידי</option>
              <option value="מקדמה">תשלום מקדמה</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="deliveryTerms">תנאי אספקה</label>
            <select
              id="deliveryTerms"
              value={formData.terms.deliveryTerms}
              onChange={(e) => handleTermsChange('deliveryTerms', e.target.value)}
            >
              <option value="">בחר תנאי אספקה</option>
              <option value="איסוף עצמי">איסוף עצמי</option>
              <option value="משלוח רגיל">משלוח רגיל</option>
              <option value="משלוח מהיר">משלוח מהיר</option>
              <option value="התקנה">משלוח והתקנה</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="warrantyRequirements">דרישות אחריות</label>
            <select
              id="warrantyRequirements"
              value={formData.terms.warrantyRequirements}
              onChange={(e) => handleTermsChange('warrantyRequirements', e.target.value)}
            >
              <option value="">בחר תקופת אחריות</option>
              <option value="6 חודשים">6 חודשים</option>
              <option value="שנה">שנה</option>
              <option value="שנתיים">שנתיים</option>
              <option value="3 שנים">3 שנים</option>
              <option value="אחריות יצרן">אחריות יצרן</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="additionalNotes">הערות נוספות</label>
          <textarea
            id="additionalNotes"
            value={formData.terms.additionalNotes}
            onChange={(e) => handleTermsChange('additionalNotes', e.target.value)}
            placeholder="הערות נוספות, דרישות מיוחדות או הבהרות לספקים"
            rows="3"
          />
        </div>
      </div>

      <div className="documents-section">
        <h5>מסמכים מצורפים</h5>
        
        <div className="file-upload">
          <input
            type="file"
            id="documents"
            multiple
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
          />
          <label htmlFor="documents" className="file-upload-label">
            <i className="fas fa-cloud-upload-alt me-2"></i>
            בחר קבצים או גרור לכאן
          </label>
          <p className="file-upload-hint">
            קבצי PDF, Word, Excel, תמונות (מקסימום 10MB לקובץ)
          </p>
        </div>

        {formData.documents.length > 0 && (
          <div className="uploaded-files">
            <h6>קבצים שהועלו:</h6>
            {formData.documents.map((doc, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <i className="fas fa-file-alt me-2"></i>
                  <span>{doc.name}</span>
                  <span className="file-size">({Math.round(doc.size / 1024)} KB)</span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeDocument(index)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="form-step">
      <h4>סיכום ואישור</h4>
      
      <div className="summary-section">
        <div className="summary-card">
          <h5>פרטי הבקשה</h5>
          <div className="summary-item">
            <strong>כותרת:</strong> {formData.title}
          </div>
          <div className="summary-item">
            <strong>קטגוריה:</strong> {formData.category}
          </div>
          <div className="summary-item">
            <strong>עדיפות:</strong> {formData.priority}
          </div>
          <div className="summary-item">
            <strong>תאריך יעד:</strong> {formData.dueDate}
          </div>
          {formData.estimatedValue && (
            <div className="summary-item">
              <strong>שווי משוער:</strong> ₪{parseInt(formData.estimatedValue).toLocaleString()}
            </div>
          )}
        </div>

        <div className="summary-card">
          <h5>מוצרים ({formData.products.length})</h5>
          {formData.products.map((product, index) => (
            <div key={index} className="summary-item">
              <strong>{product.name}</strong> - {product.quantity} {product.unit}
            </div>
          ))}
        </div>

        <div className="summary-card">
          <h5>ספקים נבחרים ({formData.suppliers.length})</h5>
          {formData.suppliers.map(supplierId => {
            const supplier = availableSuppliers.find(s => s.id === supplierId);
            return (
              <div key={supplierId} className="summary-item">
                {supplier?.name}
              </div>
            );
          })}
        </div>

        {formData.documents.length > 0 && (
          <div className="summary-card">
            <h5>מסמכים מצורפים ({formData.documents.length})</h5>
            {formData.documents.map((doc, index) => (
              <div key={index} className="summary-item">
                {doc.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="approval-section">
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.requiresApproval}
              onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
            />
            <span className="checkmark"></span>
            הבקשה דורשת אישור נוסף לפני שליחה
          </label>
        </div>

        {formData.requiresApproval && (
          <div className="form-group">
            <label htmlFor="approvalNotes">הערות לאישור</label>
            <textarea
              id="approvalNotes"
              value={formData.approvalNotes}
              onChange={(e) => handleInputChange('approvalNotes', e.target.value)}
              placeholder="הערות למאשר הבקשה"
              rows="3"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="rfq-create-container">
      <div className="rfq-create-header">
        <div className="header-content">
          <div className="page-title">
            <h2>יצירת בקשה להצעת מחיר חדשה</h2>
            <nav className="breadcrumb">
              <span>בית</span>
              <i className="fas fa-chevron-left"></i>
              <span onClick={() => navigate('/rfq')} style={{cursor: 'pointer'}}>בקשות להצעת מחיר</span>
              <i className="fas fa-chevron-left"></i>
              <span className="active">יצירת בקשה חדשה</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline-secondary" onClick={handleBackToList}>
              <i className="fas fa-arrow-right me-2"></i>
              חזרה לרשימה
            </button>
          </div>
        </div>
      </div>

      <div className="rfq-create-content">
        {renderStepIndicator()}
        
        <div className="form-container">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        <div className="form-navigation">
          {currentStep > 1 && (
            <button className="btn btn-outline-secondary" onClick={prevStep}>
              <i className="fas fa-arrow-right me-2"></i>
              שלב קודם
            </button>
          )}
          
          <div className="nav-spacer"></div>
          
          {currentStep < 5 ? (
            <button className="btn btn-primary" onClick={nextStep}>
              שלב הבא
              <i className="fas fa-arrow-left ms-2"></i>
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>
              <i className="fas fa-check me-2"></i>
              צור בקשת RFQ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RFQCreate;