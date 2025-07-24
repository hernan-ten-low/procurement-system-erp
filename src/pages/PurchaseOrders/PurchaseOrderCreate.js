// Purchase Order Creation Component

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, InputGroup, Alert, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockApi } from '../../services/mockData';
import { ORDER_STATUSES, PAYMENT_TERMS, SHIPPING_METHODS, CURRENCIES } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { validateRequired, validatePositiveNumber, validateForm } from '../../utils/validators';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { SaveConfirmDialog } from '../../components/UI/ConfirmDialog';

const PurchaseOrderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Check if we're creating from an RFQ
  const rfqData = location.state?.rfqData;

  const [formData, setFormData] = useState({
    orderNumber: `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    supplierId: rfqData?.selectedSupplierId || '',
    supplierName: rfqData?.selectedSupplierName || '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    currency: rfqData?.currency || 'ILS',
    paymentTerms: 'שוטף + 30',
    shippingMethod: 'משלוח רגיל',
    shippingAddress: 'רחוב הבורסה 28, רמת גן',
    shippingCost: 0,
    notes: rfqData?.notes || '',
    items: rfqData?.items || []
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [suppliersData, productsData] = await Promise.all([
        mockApi.getSuppliers(),
        mockApi.getProducts()
      ]);
      setSuppliers(suppliersData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSupplierChange = (supplierId) => {
    const supplier = suppliers.find(s => s.id === parseInt(supplierId));
    if (supplier) {
      setFormData(prev => ({
        ...prev,
        supplierId: supplierId,
        supplierName: supplier.companyName,
        currency: supplier.currency || 'ILS',
        paymentTerms: supplier.paymentTerms || 'שוטף + 30'
      }));
    }
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      productId: '',
      productName: '',
      sku: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    };
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const updateItem = (itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          
          // Update product details when product is selected
          if (field === 'productId' && value) {
            const product = products.find(p => p.id === parseInt(value));
            if (product) {
              updatedItem.productName = product.name;
              updatedItem.sku = product.sku;
              updatedItem.description = product.description;
              updatedItem.unitPrice = product.price;
            }
          }
          
          // Recalculate total price
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const shippingCost = parseFloat(formData.shippingCost) || 0;
    const subtotalWithShipping = subtotal + shippingCost;
    const vat = subtotalWithShipping * 0.17; // 17% VAT
    const total = subtotalWithShipping + vat;
    
    return {
      subtotal,
      shippingCost,
      vat,
      total
    };
  };

  const validateForm = () => {
    const validationRules = {
      supplierId: [(value) => validateRequired(value, 'ספק')],
      deliveryDate: [(value) => validateRequired(value, 'תאריך אספקה')],
      items: [(value) => {
        if (!value || value.length === 0) {
          return 'חייב להוסיף לפחות פריט אחד';
        }
        return null;
      }]
    };

    const validation = validateForm(formData, validationRules);
    
    // Validate items
    const itemErrors = {};
    formData.items.forEach((item, index) => {
      if (!item.productId) {
        itemErrors[`item_${item.id}_product`] = 'חייב לבחור מוצר';
      }
      if (!item.quantity || item.quantity <= 0) {
        itemErrors[`item_${item.id}_quantity`] = 'כמות חייבת להיות גדולה מ-0';
      }
      if (!item.unitPrice || item.unitPrice <= 0) {
        itemErrors[`item_${item.id}_price`] = 'מחיר חייב להיות גדול מ-0';
      }
    });

    const allErrors = { ...validation.errors, ...itemErrors };
    setErrors(allErrors);
    
    return Object.keys(allErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowSaveDialog(true);
    }
  };

  const handleConfirmSave = async () => {
    try {
      setLoading(true);
      
      const totals = calculateTotals();
      const orderData = {
        ...formData,
        ...totals,
        status: ORDER_STATUSES.DRAFT,
        createdDate: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving purchase order:', orderData);
      
      setShowSaveDialog(false);
      navigate('/purchase-orders', {
        state: { 
          message: 'הזמנת הרכש נשמרה בהצלחה',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error saving purchase order:', error);
      setErrors({ general: 'שגיאה בשמירת ההזמנה' });
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotals();

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">הזמנת רכש חדשה</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">בית</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/purchase-orders">הזמנות רכש</a>
                  </li>
                  <li className="breadcrumb-item active">הזמנה חדשה</li>
                </ol>
              </nav>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/purchase-orders')}
              >
                ביטול
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading && <LoadingSpinner size="sm" showText={false} />}
                שמירה
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {rfqData && (
        <Alert variant="info" className="mb-4">
          <i className="bi bi-info-circle me-2"></i>
          הזמנה זו נוצרה על בסיס בקשת הצעת מחיר מספר {rfqData.rfqNumber}
        </Alert>
      )}

      {errors.general && (
        <Alert variant="danger" className="mb-4">
          {errors.general}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          {/* Basic Information */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                פרטי הזמנה
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>מספר הזמנה</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                      disabled
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>ספק *</Form.Label>
                    <Form.Select
                      value={formData.supplierId}
                      onChange={(e) => handleSupplierChange(e.target.value)}
                      isInvalid={!!errors.supplierId}
                    >
                      <option value="">בחר ספק</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.companyName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.supplierId}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>תאריך הזמנה</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.orderDate}
                      onChange={(e) => handleInputChange('orderDate', e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>תאריך אספקה נדרש *</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                      isInvalid={!!errors.deliveryDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.deliveryDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>מטבע</Form.Label>
                    <Form.Select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                    >
                      {CURRENCIES.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>תנאי תשלום</Form.Label>
                    <Form.Select
                      value={formData.paymentTerms}
                      onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                    >
                      {PAYMENT_TERMS.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>שיטת משלוח</Form.Label>
                    <Form.Select
                      value={formData.shippingMethod}
                      onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
                    >
                      {SHIPPING_METHODS.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>כתובת משלוח</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={formData.shippingAddress}
                      onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Items */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-list me-2"></i>
                פריטים ({formData.items.length})
              </h5>
              <Button variant="outline-primary" size="sm" onClick={addItem}>
                <i className="bi bi-plus me-1"></i>
                הוסף פריט
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              {errors.items && (
                <div className="p-3 border-bottom">
                  <Alert variant="danger" className="mb-0">
                    {errors.items}
                  </Alert>
                </div>
              )}
              
              {formData.items.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  <i className="bi bi-box display-4 mb-3"></i>
                  <p>לא נוספו פריטים עדיין</p>
                  <Button variant="outline-primary" onClick={addItem}>
                    הוסף פריט ראשון
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '30%' }}>מוצר</th>
                        <th style={{ width: '15%' }}>כמות</th>
                        <th style={{ width: '15%' }}>מחיר יחידה</th>
                        <th style={{ width: '15%' }}>סה״כ</th>
                        <th style={{ width: '25%' }}>הערות</th>
                        <th style={{ width: '5%' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <Form.Select
                              value={item.productId}
                              onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                              isInvalid={!!errors[`item_${item.id}_product`]}
                              size="sm"
                            >
                              <option value="">בחר מוצר</option>
                              {products.map(product => (
                                <option key={product.id} value={product.id}>
                                  {product.name} ({product.sku})
                                </option>
                              ))}
                            </Form.Select>
                            {item.description && (
                              <small className="text-muted d-block mt-1">
                                {item.description}
                              </small>
                            )}
                            {errors[`item_${item.id}_product`] && (
                              <div className="invalid-feedback d-block">
                                {errors[`item_${item.id}_product`]}
                              </div>
                            )}
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                              isInvalid={!!errors[`item_${item.id}_quantity`]}
                              size="sm"
                            />
                            {errors[`item_${item.id}_quantity`] && (
                              <div className="invalid-feedback">
                                {errors[`item_${item.id}_quantity`]}
                              </div>
                            )}
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              isInvalid={!!errors[`item_${item.id}_price`]}
                              size="sm"
                            />
                            {errors[`item_${item.id}_price`] && (
                              <div className="invalid-feedback">
                                {errors[`item_${item.id}_price`]}
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="fw-bold">
                              {formatCurrency(item.totalPrice, formData.currency)}
                            </div>
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              placeholder="הערות..."
                              value={item.notes || ''}
                              onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                              size="sm"
                            />
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Notes */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="bi bi-chat-left-text me-2"></i>
                הערות
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="הערות נוספות להזמנה..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Summary */}
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '2rem' }}>
            <Card.Header>
              <h5 className="mb-0">
                <i className="bi bi-calculator me-2"></i>
                סיכום הזמנה
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>סכום ביניים:</span>
                <span>{formatCurrency(totals.subtotal, formData.currency)}</span>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>משלוח:</span>
                  <InputGroup size="sm" style={{ width: '120px' }}>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.shippingCost}
                      onChange={(e) => handleInputChange('shippingCost', parseFloat(e.target.value) || 0)}
                    />
                  </InputGroup>
                </div>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>מע״מ (17%):</span>
                <span>{formatCurrency(totals.vat, formData.currency)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <strong>סה״כ לתשלום:</strong>
                <strong className="text-primary fs-5">
                  {formatCurrency(totals.total, formData.currency)}
                </strong>
              </div>

              {formData.deliveryDate && (
                <div className="alert alert-light">
                  <small>
                    <i className="bi bi-truck me-1"></i>
                    אספקה צפויה: {formatDate(formData.deliveryDate)}
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Save Confirmation Dialog */}
      <SaveConfirmDialog
        show={showSaveDialog}
        onHide={() => setShowSaveDialog(false)}
        onConfirm={handleConfirmSave}
        loading={loading}
      />
    </Container>
  );
};

export default PurchaseOrderCreate;
