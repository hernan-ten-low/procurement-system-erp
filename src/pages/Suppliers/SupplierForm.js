import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Nav, Tab } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SupplierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company details
    companyName: '',
    businessType: 'חברה בע"מ',
    businessNumber: '',
    street: '',
    city: '',
    postalCode: '',
    phone: '',
    fax: '',
    email: '',
    website: '',
    businessArea: 'כל הארץ',
    operatingHours: '',
    employeeCount: '1-10',
    
    // Contacts
    contacts: [
      {
        id: 1,
        name: '',
        position: '',
        phone: '',
        mobile: '',
        email: '',
        isPrimary: true
      }
    ],
    
    // Categories
    categories: [],
    brands: '',
    
    // Terms
    paymentTerms: 'שוטף+60',
    cashDiscount: '',
    creditLimit: '',
    deliveryTime: 3,
    minimumOrder: '',
    shippingCompany: '',
    
    // Status
    isActive: true
  });

  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (isEdit) {
      // Mock load existing supplier data
      const mockData = {
        companyName: 'אלקטרוניקה מתקדמת בע"מ',
        businessType: 'חברה בע"מ',
        businessNumber: '514123456',
        street: 'האורנים 15',
        city: 'תל אביב',
        postalCode: '6971010',
        phone: '03-1234567',
        fax: '03-1234568',
        email: 'info@electronics.co.il',
        website: 'www.electronics.co.il',
        businessArea: 'כל הארץ',
        operatingHours: 'א\'-ה\' 08:00-17:00',
        employeeCount: '50-100',
        contacts: [
          {
            id: 1,
            name: 'יוסי כהן',
            position: 'מנהל מכירות',
            phone: '03-1234567',
            mobile: '052-1234567',
            email: 'yossi@electronics.co.il',
            isPrimary: true
          }
        ],
        categories: ['אלקטרוניקה', 'מחשבים'],
        brands: 'Samsung, Apple, LG, Sony',
        paymentTerms: 'שוטף+60',
        cashDiscount: '2',
        creditLimit: '500000',
        deliveryTime: 5,
        minimumOrder: '1000',
        shippingCompany: 'משלוחים מהירים',
        isActive: true
      };
      
      setFormData(mockData);
    }
  }, [isEdit]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (contactIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, index) => 
        index === contactIndex 
          ? { ...contact, [field]: value }
          : contact
      )
    }));
  };

  const addContact = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [...prev.contacts, {
        id: Date.now(),
        name: '',
        position: '',
        phone: '',
        mobile: '',
        email: '',
        isPrimary: false
      }]
    }));
  };

  const removeContact = (contactIndex) => {
    if (formData.contacts.length > 1) {
      setFormData(prev => ({
        ...prev,
        contacts: prev.contacts.filter((_, index) => index !== contactIndex)
      }));
    }
  };

  const handleCategoryChange = (category, checked) => {
    setFormData(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(cat => cat !== category)
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.companyName && formData.businessNumber && formData.street && formData.city && formData.phone;
      case 2:
        return formData.contacts.some(contact => contact.name && contact.phone);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      showAlert('יש להשלים את כל השדות הנדרשים', 'warning');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAlert(
        isEdit ? 'הספק עודכן בהצלחה' : 'הספק נוסף בהצלחה',
        'success'
      );
      
      setTimeout(() => {
        navigate('/suppliers');
      }, 2000);
    } catch (error) {
      showAlert('אירעה שגיאה בשמירת הנתונים', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' });
    }, 5000);
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    // סינון כפילויות לפי שם וגודל
    const newFiles = files.filter(
      (file) => !uploadedFiles.some((f) => f.name === file.name && f.size === file.size)
    );
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const newFiles = files.filter(
      (file) => !uploadedFiles.some((f) => f.name === file.name && f.size === file.size)
    );
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadAreaClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const businessTypes = [
    'חברה בע"מ',
    'עוסק מורשה',
    'עוסק פטור',
    'עמותה',
    'אחר'
  ];

  const businessAreas = [
    'כל הארץ',
    'צפון',
    'מרכז',
    'דרום',
    'ירושלים והסביבה'
  ];

  const employeeCounts = [
    '1-10',
    '11-50',
    '51-100',
    '101-500',
    '500+'
  ];

  const paymentTermsOptions = [
    'מזומן',
    'שוטף+30',
    'שוטף+60',
    'שוטף+90',
    'אחר'
  ];

  const availableCategories = [
    'אלקטרוניקה',
    'מחשבים ורכיבים',
    'סלולר ואביזרים',
    'אודיו ווידאו',
    'רשתות ותקשורת',
    'ציוד משרד',
    'אביזרים'
  ];

  return (
    <Container fluid className="p-4">
      {alert.show && (
        <Alert variant={alert.variant} className="mb-4">
          {alert.message}
        </Alert>
      )}

      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">{isEdit ? 'עריכת ספק' : 'הוספת ספק חדש'}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">בית</a></li>
              <li className="breadcrumb-item"><a href="/suppliers">ספקים</a></li>
              <li className="breadcrumb-item active">{isEdit ? 'עריכה' : 'ספק חדש'}</li>
            </ol>
          </nav>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Card className="custom-card">
          <Card.Body>
            {/* Progress Steps */}
            <div className="wizard-steps mb-5">
              <Row>
                {[1, 2, 3, 4, 5].map(step => (
                  <Col key={step} className="text-center">
                    <div className={`step ${currentStep >= step ? 'active' : ''}`}>
                      <div className="step-icon">
                        {step === 1 && <i className="bi bi-building"></i>}
                        {step === 2 && <i className="bi bi-people"></i>}
                        {step === 3 && <i className="bi bi-box-seam"></i>}
                        {step === 4 && <i className="bi bi-cash-stack"></i>}
                        {step === 5 && <i className="bi bi-file-earmark"></i>}
                      </div>
                      <div className="step-title">
                        {step === 1 && 'פרטי חברה'}
                        {step === 2 && 'אנשי קשר'}
                        {step === 3 && 'תחומי פעילות'}
                        {step === 4 && 'תנאי סחר'}
                        {step === 5 && 'מסמכים'}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <div>
                <h4 className="mb-4">פרטי חברה</h4>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>שם ספק/חברה <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        required
                      />
                      <Form.Text className="text-muted">
                        הזן את שם החברה המלא כפי שמופיע ברשם החברות
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>סוג עסק <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        required
                      >
                        {businessTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>מספר עוסק/ח.פ <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]{9}"
                        value={formData.businessNumber}
                        onChange={(e) => handleInputChange('businessNumber', e.target.value)}
                        required
                      />
                      <Form.Text className="text-muted">9 ספרות</Form.Text>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <h5 className="mt-3 mb-3">כתובת</h5>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>רחוב ומספר <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>עיר <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>מיקוד</Form.Label>
                      <Form.Control
                        type="text"
                        pattern="[0-9]{7}"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <h5 className="mt-3 mb-3">פרטי התקשרות</h5>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>טלפון ראשי <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>פקס</Form.Label>
                      <Form.Control
                        type="tel"
                        value={formData.fax}
                        onChange={(e) => handleInputChange('fax', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>דוא"ל</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>אתר אינטרנט</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="www.example.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <h5 className="mt-3 mb-3">מידע נוסף</h5>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>אזור פעילות</Form.Label>
                      <Form.Select
                        value={formData.businessArea}
                        onChange={(e) => handleInputChange('businessArea', e.target.value)}
                      >
                        {businessAreas.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>שעות פעילות</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="לדוגמה: א'-ה' 08:00-17:00"
                        value={formData.operatingHours}
                        onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>מספר עובדים</Form.Label>
                      <Form.Select
                        value={formData.employeeCount}
                        onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      >
                        {employeeCounts.map(count => (
                          <option key={count} value={count}>{count}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h4 className="mb-4">אנשי קשר</h4>
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  יש להוסיף לפחות איש קשר אחד. ניתן לסמן איש קשר אחד כאיש קשר ראשי.
                </Alert>

                {formData.contacts.map((contact, index) => (
                  <div key={contact.id} className="border rounded p-3 mb-3">
                    <Row className="g-3">
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>שם מלא <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            value={contact.name}
                            onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>תפקיד</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="מנהל מכירות"
                            value={contact.position}
                            onChange={(e) => handleContactChange(index, 'position', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Form.Group>
                          <Form.Label>טלפון <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="tel"
                            value={contact.phone}
                            onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Form.Group>
                          <Form.Label>נייד</Form.Label>
                          <Form.Control
                            type="tel"
                            value={contact.mobile}
                            onChange={(e) => handleContactChange(index, 'mobile', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Form.Group>
                          <Form.Label>דוא"ל</Form.Label>
                          <Form.Control
                            type="email"
                            value={contact.email}
                            onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Check
                          type="radio"
                          name="primaryContact"
                          label="איש קשר ראשי"
                          checked={contact.isPrimary}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                contacts: prev.contacts.map((c, i) => ({
                                  ...c,
                                  isPrimary: i === index
                                }))
                              }));
                            }
                          }}
                        />
                        {formData.contacts.length > 1 && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => removeContact(index)}
                          >
                            <i className="bi bi-trash me-1"></i>הסר
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </div>
                ))}

                <Button variant="outline-primary" onClick={addContact}>
                  <i className="bi bi-plus-circle me-2"></i>הוסף איש קשר
                </Button>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h4 className="mb-4">תחומי פעילות</h4>
                
                <h5 className="mb-3">קטגוריות ראשיות</h5>
                <Row className="g-3 mb-4">
                  {availableCategories.map(category => (
                    <Col md={3} key={category}>
                      <Form.Check
                        type="checkbox"
                        id={`cat-${category}`}
                        label={category}
                        checked={formData.categories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      />
                    </Col>
                  ))}
                </Row>

                <h5 className="mb-3">מותגים</h5>
                <Form.Group className="mb-4">
                  <Form.Label>הזן מותגים (הפרד בפסיקים)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Samsung, Apple, LG, Sony..."
                    value={formData.brands}
                    onChange={(e) => handleInputChange('brands', e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    רשימת המותגים העיקריים שהספק עובד איתם
                  </Form.Text>
                </Form.Group>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h4 className="mb-4">תנאי סחר</h4>
                
                <Row className="g-3">
                  <Col xs={12}>
                    <h5 className="mb-3">תנאי תשלום</h5>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>תנאי תשלום</Form.Label>
                      <Form.Select
                        value={formData.paymentTerms}
                        onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                      >
                        {paymentTermsOptions.map(term => (
                          <option key={term} value={term}>{term}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>הנחת מזומן (%)</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={formData.cashDiscount}
                        onChange={(e) => handleInputChange('cashDiscount', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>מסגרת אשראי (₪)</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={formData.creditLimit}
                        onChange={(e) => handleInputChange('creditLimit', e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} className="mt-4">
                    <h5 className="mb-3">תנאי אספקה</h5>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>זמן אספקה (ימי עסקים)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={formData.deliveryTime}
                        onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>מינימום הזמנה (₪)</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={formData.minimumOrder}
                        onChange={(e) => handleInputChange('minimumOrder', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>חברת שילוח מועדפת</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.shippingCompany}
                        onChange={(e) => handleInputChange('shippingCompany', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h4 className="mb-4">מסמכים</h4>
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  ניתן להעלות מסמכים כעת או להוסיף אותם מאוחר יותר בכרטיס הספק.
                </Alert>
                <div
                  className="upload-area border-dashed rounded p-5 text-center mb-4"
                  onClick={handleUploadAreaClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-cloud-upload fs-1 text-muted mb-3"></i>
                  <h5>גרור קבצים לכאן או לחץ לבחירה</h5>
                  <p className="text-muted">PDF, JPG, PNG עד 10MB</p>
                  <Form.Control
                    type="file"
                    className="d-none"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    ref={fileInputRef}
                    onChange={handleFilesChange}
                  />
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mb-4">
                    <h6 className="mb-2">קבצים שנבחרו:</h6>
                    <ul className="list-group">
                      {uploadedFiles.map((file, idx) => (
                        <li key={file.name + file.size} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>
                            <i className="bi bi-file-earmark me-2"></i>
                            {file.name} <span className="text-muted small">({(file.size/1024).toFixed(1)} KB)</span>
                          </span>
                          <Button variant="outline-danger" size="sm" onClick={() => handleRemoveFile(idx)}>
                            <i className="bi bi-trash"></i>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4">
                  <h5 className="mb-3">סוגי מסמכים מומלצים</h5>
                  <Row className="g-3">
                    <Col md={6}>
                      <ul className="list-unstyled">
                        <li><i className="bi bi-check-circle text-success me-2"></i>אישור ניהול ספרים</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>אישור ניכוי מס במקור</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>תעודת עוסק מורשה</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>רישיון עסק</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul className="list-unstyled">
                        <li><i className="bi bi-check-circle text-success me-2"></i>ביטוחים</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>חוזה/הסכם</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>קטלוג מוצרים</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>מחירון</li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <Row className="mt-5">
              <Col>
                {currentStep > 1 && (
                  <Button variant="secondary" onClick={prevStep}>
                    <i className="bi bi-arrow-right me-2"></i>חזור
                  </Button>
                )}
              </Col>
              <Col className="text-center">
                <Button variant="outline-primary" type="button">
                  <i className="bi bi-save me-2"></i>שמור כטיוטה
                </Button>
              </Col>
              <Col className="text-end">
                {currentStep < 5 ? (
                  <Button variant="primary" onClick={nextStep}>
                    הבא<i className="bi bi-arrow-left ms-2"></i>
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    variant="success" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        שומר...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        {isEdit ? 'עדכן ספק' : 'סיים ושמור'}
                      </>
                    )}
                  </Button>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
};

export default SupplierForm;