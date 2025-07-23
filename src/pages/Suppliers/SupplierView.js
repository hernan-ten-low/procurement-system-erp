import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Table, Button, Badge, Alert, Dropdown } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SupplierView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Mock data - בעתיד יהיה API call
    const mockSupplier = {
      id: parseInt(id),
      companyName: 'אלקטרוניקה מתקדמת בע"מ',
      businessNumber: '514123456',
      businessType: 'חברה בע"מ',
      status: 'פעיל',
      isMain: true,
      rating: 4.2,
      memberSince: '01/2020',
      
      // Address
      address: {
        street: 'האורנים 15, אזור התעשייה',
        city: 'תל אביב',
        postalCode: '6971010'
      },
      
      // Contact details
      phone: '03-1234567',
      fax: '03-1234568',
      email: 'info@electronics.co.il',
      website: 'www.electronics.co.il',
      
      // Additional info
      operatingHours: 'א\'-ה\' 08:00-17:00',
      businessArea: 'כל הארץ',
      yearsInBusiness: 25,
      employeeCount: '50-100',
      annualRevenue: '10-50 מיליון ₪',
      notes: 'ספק אמין עם היסטוריה ארוכה של שיתוף פעולה. מתמחה במוצרי אלקטרוניקה מתקדמים ורכיבים למחשבים.',
      
      // Contacts
      contacts: [
        {
          id: 1,
          name: 'יוסי כהן',
          position: 'מנהל מכירות',
          phone: '03-1234567 שלוחה 102',
          mobile: '052-1234567',
          email: 'yossi@electronics.co.il',
          isPrimary: true
        },
        {
          id: 2,
          name: 'שרה לוי',
          position: 'מנהלת לקוחות',
          phone: '03-1234567 שלוחה 105',
          mobile: '054-9876543',
          email: 'sarah@electronics.co.il',
          isPrimary: false
        }
      ],
      
      // Categories and brands
      categories: [
        { name: 'רכיבי מחשב', productCount: 145 },
        { name: 'סלולר ואביזרים', productCount: 89 },
        { name: 'אודיו', productCount: 67 },
        { name: 'צילום', productCount: 34 }
      ],
      brands: ['Samsung', 'Apple', 'LG', 'Sony', 'HP', 'Dell', 'Lenovo', 'ASUS'],
      
      // Trade terms
      terms: {
        paymentTerms: 'שוטף + 60',
        cashDiscount: '2% בתשלום תוך 10 ימים',
        creditLimit: '₪500,000',
        deliveryTime: '3-5 ימי עסקים',
        minimumOrder: '₪1,000',
        shippingCost: 'חינם מעל ₪2,500'
      },
      
      // Documents
      documents: [
        {
          id: 1,
          type: 'אישור ניהול ספרים',
          fileName: 'nisul_sfarim_2024.pdf',
          uploadDate: '01/01/2024',
          expiryDate: '31/12/2024',
          status: 'בתוקף'
        },
        {
          id: 2,
          type: 'אישור ניכוי מס במקור',
          fileName: 'nikui_mas_2024.pdf',
          uploadDate: '01/01/2024',
          expiryDate: '31/12/2024',
          status: 'בתוקף'
        },
        {
          id: 3,
          type: 'תעודת עוסק מורשה',
          fileName: 'osek_morsheh.pdf',
          uploadDate: '15/06/2023',
          expiryDate: '15/06/2024',
          status: 'קרוב לפוג'
        }
      ],
      
      // Statistics
      stats: {
        totalPurchase: '₪2.5M',
        totalOrders: 324,
        averageOrder: '₪7,716',
        averageCreditDays: 45
      },
      
      // Recent orders
      recentOrders: [
        {
          id: 1,
          orderNumber: '#PO-2024-0125',
          date: '15/01/2024',
          amount: '₪12,540',
          status: 'סופק'
        },
        {
          id: 2,
          orderNumber: '#PO-2024-0089',
          date: '03/01/2024',
          amount: '₪8,320',
          status: 'סופק'
        }
      ],
      
      // Performance ratings
      performance: {
        quality: 4.5,
        delivery: 4.2,
        service: 4.8,
        price: 3.8,
        flexibility: 4.0,
        documentation: 4.6
      }
    };

    setSupplier(mockSupplier);
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }

    return <div className="rating d-inline-flex">{stars}</div>;
  };

  const getProgressColor = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'info';
    if (rating >= 3.5) return 'warning';
    return 'danger';
  };

  const getDocumentStatusVariant = (status) => {
    switch (status) {
      case 'בתוקף': return 'success';
      case 'קרוב לפוג': return 'warning';
      case 'פג תוקף': return 'danger';
      default: return 'secondary';
    }
  };

  if (!supplier) {
    return <div className="text-center p-5">טוען...</div>;
  }

  return (
    <Container fluid className="p-4">
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">בית</a></li>
              <li className="breadcrumb-item"><a href="/suppliers">ספקים</a></li>
              <li className="breadcrumb-item active">{supplier.companyName}</li>
            </ol>
          </nav>
        </Col>
      </Row>

      {/* Supplier Header */}
      <Card className="custom-card mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="auto">
              <div className="avatar-lg bg-primary-custom text-white d-flex align-items-center justify-content-center">
                {supplier.companyName.charAt(0)}
              </div>
            </Col>
            <Col>
              <h2 className="h3 mb-1">{supplier.companyName}</h2>
              <div className="text-muted mb-2">
                <i className="bi bi-building me-2"></i>ח.פ: {supplier.businessNumber}
                <span className="mx-2">|</span>
                <i className="bi bi-calendar me-2"></i>לקוח מאז: {supplier.memberSince}
              </div>
              <div>
                <Badge bg="success" className="me-2">{supplier.status}</Badge>
                {supplier.isMain && <Badge bg="primary">ספק ראשי</Badge>}
                <div className="d-inline-block ms-3">
                  {renderStars(supplier.rating)}
                  <span className="ms-1">{supplier.rating}</span>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <Button 
                variant="primary" 
                className="me-2"
                onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}
              >
                <i className="bi bi-pencil me-2"></i>ערוך
              </Button>
              <Button variant="outline-secondary" className="me-2">
                <i className="bi bi-printer me-2"></i>הדפס
              </Button>
              <Button variant="outline-secondary" className="me-2">
                <i className="bi bi-envelope me-2"></i>שלח הודעה
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  <i className="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item>צור בקשת הצעת מחיר</Dropdown.Item>
                  <Dropdown.Item>צור הזמנת רכש</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger">השבת ספק</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="general">
              <i className="bi bi-info-circle me-2"></i>פרטים כלליים
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contacts">
              <i className="bi bi-people me-2"></i>אנשי קשר
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="products">
              <i className="bi bi-box-seam me-2"></i>מוצרים וקטגוריות
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="terms">
              <i className="bi bi-cash-stack me-2"></i>תנאי סחר
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="documents">
              <i className="bi bi-file-earmark me-2"></i>מסמכים
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="history">
              <i className="bi bi-clock-history me-2"></i>היסטוריה
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="performance">
              <i className="bi bi-graph-up me-2"></i>ביצועים
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* פרטים כלליים */}
          <Tab.Pane eventKey="general">
            <Card className="custom-card">
              <Card.Body>
                <Row className="g-4">
                  <Col md={6}>
                    <h5 className="fw-bold mb-3">פרטי חברה</h5>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td className="text-muted">שם חברה:</td>
                          <td className="fw-bold">{supplier.companyName}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">ח.פ / ע.מ:</td>
                          <td>{supplier.businessNumber}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">סוג עסק:</td>
                          <td>{supplier.businessType}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">כתובת:</td>
                          <td>{supplier.address.street}, {supplier.address.city}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">טלפון ראשי:</td>
                          <td><a href={`tel:${supplier.phone}`}>{supplier.phone}</a></td>
                        </tr>
                        <tr>
                          <td className="text-muted">פקס:</td>
                          <td>{supplier.fax}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">דוא"ל:</td>
                          <td><a href={`mailto:${supplier.email}`}>{supplier.email}</a></td>
                        </tr>
                        <tr>
                          <td className="text-muted">אתר אינטרנט:</td>
                          <td><a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer">{supplier.website}</a></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <h5 className="fw-bold mb-3">מידע נוסף</h5>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td className="text-muted">אזור פעילות:</td>
                          <td>{supplier.businessArea}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">שעות פעילות:</td>
                          <td>{supplier.operatingHours}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">שנות פעילות:</td>
                          <td>{supplier.yearsInBusiness} שנים</td>
                        </tr>
                        <tr>
                          <td className="text-muted">מספר עובדים:</td>
                          <td>{supplier.employeeCount}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">מחזור שנתי:</td>
                          <td>{supplier.annualRevenue}</td>
                        </tr>
                      </tbody>
                    </Table>
                    
                    <h5 className="fw-bold mb-3 mt-4">הערות</h5>
                    <p className="text-muted">{supplier.notes}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* אנשי קשר */}
          <Tab.Pane eventKey="contacts">
            <Card className="custom-card">
              <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">אנשי קשר</h5>
                <Button size="sm" variant="primary">
                  <i className="bi bi-plus-circle me-2"></i>הוסף איש קשר
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <Table hover>
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
                    {supplier.contacts.map(contact => (
                      <tr key={contact.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle bg-primary-custom text-white me-2" style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>
                              {contact.name.split(' ').map(n => n.charAt(0)).join('')}
                            </div>
                            {contact.name}
                          </div>
                        </td>
                        <td>{contact.position}</td>
                        <td><a href={`tel:${contact.phone}`}>{contact.phone}</a></td>
                        <td><a href={`tel:${contact.mobile}`}>{contact.mobile}</a></td>
                        <td><a href={`mailto:${contact.email}`}>{contact.email}</a></td>
                        <td>
                          {contact.isPrimary && <i className="bi bi-star-fill text-warning"></i>}
                        </td>
                        <td>
                          <Button size="sm" variant="outline-secondary" className="me-1">
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button size="sm" variant="outline-danger">
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* מוצרים וקטגוריות */}
          <Tab.Pane eventKey="products">
            <Card className="custom-card">
              <Card.Body>
                <h5 className="fw-bold mb-4">קטגוריות ראשיות</h5>
                <Row className="g-3 mb-4">
                  {supplier.categories.map((category, index) => (
                    <Col md={3} key={index}>
                      <div className="text-center p-3 border rounded category-card">
                        <i className="bi bi-cpu fs-1 text-primary-custom mb-2"></i>
                        <h6>{category.name}</h6>
                        <small className="text-muted">{category.productCount} מוצרים</small>
                      </div>
                    </Col>
                  ))}
                </Row>
                
                <h5 className="fw-bold mb-3">מותגים</h5>
                <div className="mb-4">
                  {supplier.brands.map((brand, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* תנאי סחר */}
          <Tab.Pane eventKey="terms">
            <Card className="custom-card">
              <Card.Body>
                <Row className="g-4">
                  <Col md={6}>
                    <h5 className="fw-bold mb-3">תנאי תשלום</h5>
                    <div className="mb-3">
                      <label className="text-muted">תנאי תשלום סטנדרטיים:</label>
                      <p className="fw-bold">{supplier.terms.paymentTerms}</p>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted">הנחת מזומן:</label>
                      <p className="fw-bold">{supplier.terms.cashDiscount}</p>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted">מסגרת אשראי:</label>
                      <p className="fw-bold">{supplier.terms.creditLimit}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h5 className="fw-bold mb-3">תנאי אספקה</h5>
                    <div className="mb-3">
                      <label className="text-muted">זמן אספקה סטנדרטי:</label>
                      <p className="fw-bold">{supplier.terms.deliveryTime}</p>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted">מינימום הזמנה:</label>
                      <p className="fw-bold">{supplier.terms.minimumOrder}</p>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted">עלות משלוח:</label>
                      <p className="fw-bold">{supplier.terms.shippingCost}</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* מסמכים */}
          <Tab.Pane eventKey="documents">
            <Card className="custom-card">
              <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">מסמכים</h5>
                <Button size="sm" variant="primary">
                  <i className="bi bi-upload me-2"></i>העלה מסמך
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <Table hover>
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
                    {supplier.documents.map(doc => (
                      <tr key={doc.id}>
                        <td>
                          <i className="bi bi-file-earmark-text text-primary me-2"></i>
                          {doc.type}
                        </td>
                        <td>{doc.fileName}</td>
                        <td>{doc.uploadDate}</td>
                        <td>{doc.expiryDate}</td>
                        <td>
                          <Badge bg={getDocumentStatusVariant(doc.status)}>
                            {doc.status}
                          </Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-primary" className="me-1">
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button size="sm" variant="outline-secondary">
                            <i className="bi bi-download"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* היסטוריה */}
          <Tab.Pane eventKey="history">
            <Card className="custom-card mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">סיכום פעילות</h5>
                <Row className="g-3 text-center">
                  <Col md={3}>
                    <div className="p-3 border rounded">
                      <h3 className="text-primary-custom">{supplier.stats.totalPurchase}</h3>
                      <p className="text-muted mb-0">סה"כ רכש</p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="p-3 border rounded">
                      <h3 className="text-success">{supplier.stats.totalOrders}</h3>
                      <p className="text-muted mb-0">הזמנות</p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="p-3 border rounded">
                      <h3 className="text-info">{supplier.stats.averageOrder}</h3>
                      <p className="text-muted mb-0">ממוצע הזמנה</p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="p-3 border rounded">
                      <h3 className="text-warning">{supplier.stats.averageCreditDays}</h3>
                      <p className="text-muted mb-0">ימי אשראי ממוצע</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            <Card className="custom-card">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">הזמנות אחרונות</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table hover>
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
                    {supplier.recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.date}</td>
                        <td>{order.amount}</td>
                        <td><Badge bg="success">{order.status}</Badge></td>
                        <td>
                          <Button size="sm" variant="outline-primary">צפה</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* ביצועים */}
          <Tab.Pane eventKey="performance">
            <Card className="custom-card">
              <Card.Body>
                <h5 className="fw-bold mb-4">דירוג ביצועים</h5>
                
                <Row className="g-4">
                  <Col md={6}>
                    {Object.entries({
                      'איכות מוצרים': supplier.performance.quality,
                      'זמני אספקה': supplier.performance.delivery,
                      'שירות לקוחות': supplier.performance.service
                    }).map(([metric, rating]) => (
                      <div key={metric} className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span>{metric}</span>
                          <span className="fw-bold">{rating}/5</span>
                        </div>
                        <div className="progress" style={{ height: '10px' }}>
                          <div 
                            className={`progress-bar bg-${getProgressColor(rating)}`}
                            style={{ width: `${(rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </Col>
                  
                  <Col md={6}>
                    {Object.entries({
                      'מחירים תחרותיים': supplier.performance.price,
                      'גמישות': supplier.performance.flexibility,
                      'תיעוד ודיוק': supplier.performance.documentation
                    }).map(([metric, rating]) => (
                      <div key={metric} className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span>{metric}</span>
                          <span className="fw-bold">{rating}/5</span>
                        </div>
                        <div className="progress" style={{ height: '10px' }}>
                          <div 
                            className={`progress-bar bg-${getProgressColor(rating)}`}
                            style={{ width: `${(rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default SupplierView;