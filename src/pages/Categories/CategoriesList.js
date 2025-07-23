import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Alert } from 'react-bootstrap';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    icon: 'bi bi-tag',
    isActive: true
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  // Mock data
  useEffect(() => {
    const mockCategories = [
      {
        id: 1,
        name: 'אלקטרוניקה',
        code: 'ELEC',
        description: 'רכיבי אלקטרוניקה ומעגלים',
        icon: 'bi bi-cpu',
        isActive: true,
        supplierCount: 15,
        productCount: 245
      },
      {
        id: 2,
        name: 'מחשבים ורכיבים',
        code: 'COMP',
        description: 'מחשבים, מעבדים וזכרונות',
        icon: 'bi bi-laptop',
        isActive: true,
        supplierCount: 12,
        productCount: 189
      },
      {
        id: 3,
        name: 'סלולר ואביזרים',
        code: 'MOBILE',
        description: 'טלפונים סלולריים ואביזרים',
        icon: 'bi bi-phone',
        isActive: true,
        supplierCount: 8,
        productCount: 156
      },
      {
        id: 4,
        name: 'אודיו ווידאו',
        code: 'AV',
        description: 'מערכות שמע, מסכים וטלוויזיות',
        icon: 'bi bi-speaker',
        isActive: true,
        supplierCount: 6,
        productCount: 98
      },
      {
        id: 5,
        name: 'רשתות ותקשורת',
        code: 'NET',
        description: 'ציוד רשת, נתבים ומתגים',
        icon: 'bi bi-router',
        isActive: false,
        supplierCount: 4,
        productCount: 67
      }
    ];

    setCategories(mockCategories);
  }, []);

  const handleShowModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        code: category.code,
        description: category.description,
        icon: category.icon,
        isActive: category.isActive
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        code: '',
        description: '',
        icon: 'bi bi-tag',
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      icon: 'bi bi-tag',
      isActive: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
      showAlert('הקטגוריה עודכנה בהצלחה', 'success');
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...formData,
        supplierCount: 0,
        productCount: 0
      };
      setCategories(prev => [...prev, newCategory]);
      showAlert('הקטגוריה נוספה בהצלחה', 'success');
    }
    
    handleCloseModal();
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      showAlert('הקטגוריה נמחקה בהצלחה', 'success');
    }
  };

  const toggleStatus = (categoryId) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isActive: !cat.isActive }
        : cat
    ));
    showAlert('סטטוס הקטגוריה עודכן', 'info');
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' });
    }, 3000);
  };

  const iconOptions = [
    { value: 'bi bi-tag', label: 'תג כללי' },
    { value: 'bi bi-cpu', label: 'מעבד' },
    { value: 'bi bi-laptop', label: 'מחשב נייד' },
    { value: 'bi bi-phone', label: 'טלפון' },
    { value: 'bi bi-speaker', label: 'רמקול' },
    { value: 'bi bi-router', label: 'נתב' },
    { value: 'bi bi-camera', label: 'מצלמה' },
    { value: 'bi bi-headphones', label: 'אוזניות' },
    { value: 'bi bi-tv', label: 'טלוויזיה' },
    { value: 'bi bi-keyboard', label: 'מקלדת' }
  ];

  return (
    <Container fluid className="p-4">
      {/* Alert */}
      {alert.show && (
        <Alert variant={alert.variant} className="mb-4">
          {alert.message}
        </Alert>
      )}

      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">ניהול קטגוריות</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">בית</a></li>
              <li className="breadcrumb-item"><a href="/suppliers">ספקים</a></li>
              <li className="breadcrumb-item active">קטגוריות</li>
            </ol>
          </nav>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary"
            onClick={() => handleShowModal()}
          >
            <i className="bi bi-plus-circle me-2"></i>
            הוסף קטגוריה חדשה
          </Button>
        </Col>
      </Row>

      {/* Categories Table */}
      <Card className="custom-card">
        <Card.Header className="bg-white py-3">
          <h6 className="m-0 fw-bold text-primary-custom">
            רשימת קטגוריות ({categories.length})
          </h6>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>סמל</th>
                  <th>שם קטגוריה</th>
                  <th>קוד</th>
                  <th>תיאור</th>
                  <th>ספקים</th>
                  <th>מוצרים</th>
                  <th>סטטוס</th>
                  <th width="120">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>
                      <div className="text-center">
                        <i className={`${category.icon} fs-4 text-primary-custom`}></i>
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold">{category.name}</div>
                    </td>
                    <td>
                      <code className="bg-light px-2 py-1 rounded">
                        {category.code}
                      </code>
                    </td>
                    <td>
                      <div className="text-muted">{category.description}</div>
                    </td>
                    <td>
                      <span className="badge bg-info">{category.supplierCount}</span>
                    </td>
                    <td>
                      <span className="badge bg-success">{category.productCount}</span>
                    </td>
                    <td>
                      <Button
                        variant={category.isActive ? 'success' : 'secondary'}
                        size="sm"
                        onClick={() => toggleStatus(category.id)}
                      >
                        {category.isActive ? 'פעיל' : 'לא פעיל'}
                      </Button>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <Button
                          variant="outline-secondary"
                          title="עריכה"
                          onClick={() => handleShowModal(category)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          title="מחיקה"
                          onClick={() => handleDelete(category.id)}
                          disabled={category.supplierCount > 0 || category.productCount > 0}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? 'עריכת קטגוריה' : 'הוספת קטגוריה חדשה'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>שם קטגוריה *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>קוד קטגוריה *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    required
                    style={{ textTransform: 'uppercase' }}
                  />
                  <Form.Text className="text-muted">
                    קוד יחיד באנגלית (לדוגמה: ELEC)
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>סמל</Form.Label>
                  <Form.Select
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="mt-2">
                    <i className={`${formData.icon} fs-4 text-primary-custom`}></i>
                    <span className="ms-2 text-muted">תצוגה מקדימה</span>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>סטטוס</Form.Label>
                  <Form.Check
                    type="switch"
                    id="category-active"
                    label="קטגוריה פעילה"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>תיאור</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="תיאור קצר של הקטגוריה..."
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ביטול
            </Button>
            <Button type="submit" variant="primary">
              <i className="bi bi-check-circle me-2"></i>
              {editingCategory ? 'עדכן קטגוריה' : 'הוסף קטגוריה'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CategoriesList;