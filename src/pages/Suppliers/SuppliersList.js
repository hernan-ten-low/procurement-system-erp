import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SuppliersList = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    rating: ''
  });

  // Mock data - בעתיד יהיה API call
  useEffect(() => {
    const mockSuppliers = [
      {
        id: 1,
        companyName: 'אלקטרוניקה מתקדמת בע"מ',
        businessNumber: '514123456',
        contactName: 'יוסי כהן',
        contactPosition: 'מנהל מכירות',
        phone: '052-1234567',
        categories: ['אלקטרוניקה', 'מחשבים'],
        rating: 4.2,
        status: 'פעיל',
        isMain: true
      },
      {
        id: 2,
        companyName: 'טכנולוגיות חדשניות',
        businessNumber: '514789123',
        contactName: 'שרה לוי',
        contactPosition: 'סמנכ"ל מכירות',
        phone: '054-9876543',
        categories: ['מחשבים', 'רשתות'],
        rating: 4.8,
        status: 'פעיל',
        isMain: false
      },
      {
        id: 3,
        companyName: 'רכיבים ומערכות בע"מ',
        businessNumber: '514456789',
        contactName: 'מיכאל דוד',
        contactPosition: 'מנהל טכני',
        phone: '053-1122334',
        categories: ['רכיבים', 'אלקטרוניקה'],
        rating: 3.9,
        status: 'ממתין לאישור',
        isMain: false
      },
      {
        id: 4,
        companyName: 'סמארט טק פתרונות',
        businessNumber: '514987654',
        contactName: 'רחל אברהם',
        contactPosition: 'מנהלת פיתוח עסקי',
        phone: '052-5566778',
        categories: ['טכנולוגיה', 'מחשבים'],
        rating: 4.5,
        status: 'לא פעיל',
        isMain: false
      }
    ];

    setSuppliers(mockSuppliers);
    setFilteredSuppliers(mockSuppliers);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = suppliers.filter(supplier => {
      const matchesSearch = filters.search === '' || 
        supplier.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.businessNumber.includes(filters.search) ||
        supplier.phone.includes(filters.search);
      
      const matchesStatus = filters.status === '' || supplier.status === filters.status;
      
      const matchesCategory = filters.category === '' || 
        supplier.categories.some(cat => cat.includes(filters.category));
      
      const matchesRating = filters.rating === '' || 
        (filters.rating === '5' && supplier.rating >= 4.5) ||
        (filters.rating === '4' && supplier.rating >= 4.0) ||
        (filters.rating === '3' && supplier.rating >= 3.0);

      return matchesSearch && matchesStatus && matchesCategory && matchesRating;
    });

    setFilteredSuppliers(filtered);
  }, [filters, suppliers]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'פעיל': return 'success';
      case 'לא פעיל': return 'secondary';
      case 'ממתין לאישור': return 'warning';
      default: return 'secondary';
    }
  };

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

    return (
      <div className="rating d-inline-flex align-items-center">
        {stars}
        <span className="ms-1 text-muted">{rating}</span>
      </div>
    );
  };

  return (
    <Container fluid className="p-4">
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">ניהול ספקים</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">בית</a></li>
              <li className="breadcrumb-item active">ספקים</li>
            </ol>
          </nav>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary" 
            className="me-2"
            onClick={() => navigate('/suppliers/add')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            הוסף ספק חדש
          </Button>
          <Button variant="outline-secondary">
            <i className="bi bi-upload me-2"></i>
            ייבוא מ-CSV
          </Button>
        </Col>
      </Row>

      {/* Filters Card */}
      <Card className="custom-card mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Label>חיפוש חופשי</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="חפש לפי שם, ח.פ, טלפון..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Label>סטטוס</Form.Label>
              <Form.Select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">הכל</option>
                <option value="פעיל">פעיל</option>
                <option value="לא פעיל">לא פעיל</option>
                <option value="ממתין לאישור">ממתין לאישור</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>קטגוריה</Form.Label>
              <Form.Select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">הכל</option>
                <option value="אלקטרוניקה">אלקטרוניקה</option>
                <option value="מחשבים">מחשבים</option>
                <option value="רכיבים">רכיבים</option>
                <option value="רשתות">רשתות</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>דירוג</Form.Label>
              <Form.Select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">הכל</option>
                <option value="5">4.5+ כוכבים</option>
                <option value="4">4+ כוכבים</option>
                <option value="3">3+ כוכבים</option>
              </Form.Select>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button 
                variant="primary" 
                className="w-100"
                onClick={() => setFilters({ search: '', status: '', category: '', rating: '' })}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                נקה
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Suppliers Table */}
      <Card className="custom-card">
        <Card.Header className="bg-white py-3">
          <Row className="align-items-center">
            <Col>
              <h6 className="m-0 fw-bold text-primary-custom">
                רשימת ספקים ({filteredSuppliers.length})
              </h6>
            </Col>
            <Col xs="auto">
              <div className="btn-group btn-group-sm" role="group">
                <Button variant="outline-secondary" className="active">
                  <i className="bi bi-list-ul"></i>
                </Button>
                <Button variant="outline-secondary">
                  <i className="bi bi-grid-3x3"></i>
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th width="40">
                    <Form.Check type="checkbox" id="selectAll" />
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
                {filteredSuppliers.map(supplier => (
                  <tr key={supplier.id}>
                    <td>
                      <Form.Check type="checkbox" />
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle me-3">
                          {supplier.companyName.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold">{supplier.companyName}</div>
                          {supplier.isMain && (
                            <div className="text-muted small">ספק ראשי</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{supplier.businessNumber}</td>
                    <td>
                      <div>{supplier.contactName}</div>
                      <div className="text-muted small">{supplier.contactPosition}</div>
                    </td>
                    <td>
                      <a href={`tel:${supplier.phone}`}>{supplier.phone}</a>
                    </td>
                    <td>
                      {supplier.categories.map((category, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-1">
                          {category}
                        </Badge>
                      ))}
                    </td>
                    <td>
                      {renderStars(supplier.rating)}
                    </td>
                    <td>
                      <Badge bg={getStatusVariant(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <Button
                          variant="outline-primary"
                          title="צפייה מפורטת"
                          onClick={() => navigate(`/suppliers/detail/${supplier.id}`)}
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <Button
                          variant="outline-secondary"
                          title="עריכה"
                          onClick={() => navigate(`/suppliers/edit/${supplier.id}`)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Dropdown as="div" className="d-inline">
                          <Dropdown.Toggle
                            as={Button}
                            variant="outline-secondary"
                            size="sm"
                            className="dropdown-toggle-no-caret"
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item>צור הצעת מחיר</Dropdown.Item>
                            <Dropdown.Item>צור הזמנה</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger">מחק ספק</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="bg-white">
          <Row className="align-items-center">
            <Col>
              <div className="text-muted">
                מציג 1-{filteredSuppliers.length} מתוך {suppliers.length} רשומות
              </div>
            </Col>
            <Col xs="auto">
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">קודם</a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">הבא</a>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SuppliersList;