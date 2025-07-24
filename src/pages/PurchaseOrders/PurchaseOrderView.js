// Purchase Order View Component

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockData';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatCurrency, formatDate, formatOrderNumber } from '../../utils/formatters';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { StatusChangeConfirmDialog } from '../../components/UI/ConfirmDialog';

const PurchaseOrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getPurchaseOrder(id);
      if (data) {
        setOrder(data);
        setError(null);
      } else {
        setError('הזמנת הרכש לא נמצאה');
      }
    } catch (err) {
      setError('שגיאה בטעינת הזמנת הרכש');
      console.error('Error loading purchase order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    const variants = {
      [ORDER_STATUSES.DRAFT]: 'secondary',
      [ORDER_STATUSES.PENDING_APPROVAL]: 'warning',
      [ORDER_STATUSES.APPROVED]: 'info',
      [ORDER_STATUSES.SENT_TO_SUPPLIER]: 'primary',
      [ORDER_STATUSES.CONFIRMED]: 'success',
      [ORDER_STATUSES.PARTIALLY_RECEIVED]: 'warning',
      [ORDER_STATUSES.COMPLETED]: 'success',
      [ORDER_STATUSES.CANCELLED]: 'danger'
    };
    return variants[status] || 'secondary';
  };

  const getAvailableStatuses = (currentStatus) => {
    const statusFlow = {
      [ORDER_STATUSES.DRAFT]: [ORDER_STATUSES.PENDING_APPROVAL, ORDER_STATUSES.CANCELLED],
      [ORDER_STATUSES.PENDING_APPROVAL]: [ORDER_STATUSES.APPROVED, ORDER_STATUSES.CANCELLED],
      [ORDER_STATUSES.APPROVED]: [ORDER_STATUSES.SENT_TO_SUPPLIER, ORDER_STATUSES.CANCELLED],
      [ORDER_STATUSES.SENT_TO_SUPPLIER]: [ORDER_STATUSES.CONFIRMED, ORDER_STATUSES.CANCELLED],
      [ORDER_STATUSES.CONFIRMED]: [ORDER_STATUSES.PARTIALLY_RECEIVED, ORDER_STATUSES.COMPLETED],
      [ORDER_STATUSES.PARTIALLY_RECEIVED]: [ORDER_STATUSES.COMPLETED],
      [ORDER_STATUSES.COMPLETED]: [],
      [ORDER_STATUSES.CANCELLED]: []
    };
    return statusFlow[currentStatus] || [];
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setShowStatusDialog(true);
  };

  const confirmStatusChange = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrder(prev => ({ ...prev, status: newStatus }));
      setShowStatusDialog(false);
      
      // Show success message
      console.log(`Status changed to: ${newStatus}`);
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/purchase-orders/edit/${id}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendToSupplier = () => {
    // Simulate sending to supplier
    handleStatusChange(ORDER_STATUSES.SENT_TO_SUPPLIER);
  };

  if (loading) {
    return (
      <Container fluid className="p-4">
        <LoadingSpinner size="lg" text="טוען הזמנת רכש..." centered />
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container fluid className="p-4">
        <Alert variant="danger" className="text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error || 'הזמנת הרכש לא נמצאה'}
          <div className="mt-2">
            <Button variant="outline-danger" onClick={() => navigate('/purchase-orders')}>
              חזור לרשימה
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  const availableStatuses = getAvailableStatuses(order.status);

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">
                הזמנת רכש {formatOrderNumber(order.orderNumber)}
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">בית</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/purchase-orders">הזמנות רכש</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {formatOrderNumber(order.orderNumber)}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/purchase-orders')}
              >
                <i className="bi bi-arrow-right me-2"></i>
                חזור
              </Button>
              {order.status === ORDER_STATUSES.DRAFT && (
                <Button variant="outline-primary" onClick={handleEdit}>
                  <i className="bi bi-pencil me-2"></i>
                  עריכה
                </Button>
              )}
              <Button variant="outline-info" onClick={handlePrint}>
                <i className="bi bi-printer me-2"></i>
                הדפסה
              </Button>
              {order.status === ORDER_STATUSES.APPROVED && (
                <Button variant="primary" onClick={handleSendToSupplier}>
                  <i className="bi bi-send me-2"></i>
                  שלח לספק
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Order Details */}
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                פרטי הזמנה
              </h5>
              <Badge bg={getStatusVariant(order.status)} className="fs-6">
                {order.status}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <strong>מספר הזמנה:</strong>
                  <div>{formatOrderNumber(order.orderNumber)}</div>
                </Col>
                <Col md={6}>
                  <strong>ספק:</strong>
                  <div>{order.supplierName}</div>
                </Col>
                <Col md={6}>
                  <strong>תאריך הזמנה:</strong>
                  <div>{formatDate(order.orderDate)}</div>
                </Col>
                <Col md={6}>
                  <strong>תאריך אספקה נדרש:</strong>
                  <div className={new Date(order.deliveryDate) < new Date() && 
                    order.status !== ORDER_STATUSES.COMPLETED ? 'text-danger' : ''}>
                    {formatDate(order.deliveryDate)}
                    {new Date(order.deliveryDate) < new Date() && 
                     order.status !== ORDER_STATUSES.COMPLETED && (
                      <small className="ms-2">
                        <i className="bi bi-exclamation-triangle"></i> מאחר
                      </small>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <strong>תנאי תשלום:</strong>
                  <div>{order.paymentTerms}</div>
                </Col>
                <Col md={6}>
                  <strong>מטבע:</strong>
                  <div>{order.currency}</div>
                </Col>
                {order.shippingAddress && (
                  <Col md={12}>
                    <strong>כתובת משלוח:</strong>
                    <div>{order.shippingAddress}</div>
                  </Col>
                )}
                {order.notes && (
                  <Col md={12}>
                    <strong>הערות:</strong>
                    <div className="text-muted">{order.notes}</div>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Items */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <i className="bi bi-list me-2"></i>
                פריטים ({order.items?.length || 0})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>מוצר</th>
                      <th>כמות</th>
                      <th>מחיר יחידה</th>
                      <th>סה״כ</th>
                      <th>הערות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>
                          <div className="fw-bold">{item.productName}</div>
                          {item.sku && (
                            <small className="text-muted">מק״ט: {item.sku}</small>
                          )}
                          {item.description && (
                            <div className="small text-muted mt-1">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td>{item.quantity?.toLocaleString()}</td>
                        <td>{formatCurrency(item.unitPrice, order.currency)}</td>
                        <td className="fw-bold">
                          {formatCurrency(item.totalPrice, order.currency)}
                        </td>
                        <td>
                          {item.notes && (
                            <small className="text-muted">{item.notes}</small>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          {/* Status Actions */}
          {availableStatuses.length > 0 && (
            <Card className="mb-4">
              <Card.Header>
                <h6 className="mb-0">
                  <i className="bi bi-arrow-repeat me-2"></i>
                  פעולות סטטוס
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  {availableStatuses.map(status => (
                    <Button
                      key={status}
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleStatusChange(status)}
                    >
                      שנה ל: {status}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Financial Summary */}
          <Card className="mb-4">
            <Card.Header>
              <h6 className="mb-0">
                <i className="bi bi-calculator me-2"></i>
                סיכום כספי
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>סכום ביניים:</span>
                <span>{formatCurrency(order.subtotal, order.currency)}</span>
              </div>
              
              {order.shippingCost > 0 && (
                <div className="d-flex justify-content-between mb-2">
                  <span>משלוח:</span>
                  <span>{formatCurrency(order.shippingCost, order.currency)}</span>
                </div>
              )}
              
              <div className="d-flex justify-content-between mb-2">
                <span>מע״מ:</span>
                <span>{formatCurrency(order.vat, order.currency)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between">
                <strong>סה״כ לתשלום:</strong>
                <strong className="text-primary fs-5">
                  {formatCurrency(order.total, order.currency)}
                </strong>
              </div>
            </Card.Body>
          </Card>

          {/* Quick Actions */}
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                <i className="bi bi-lightning me-2"></i>
                פעולות מהירות
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-info" size="sm">
                  <i className="bi bi-download me-2"></i>
                  הורד PDF
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <i className="bi bi-envelope me-2"></i>
                  שלח למייל
                </Button>
                <Button variant="outline-warning" size="sm">
                  <i className="bi bi-copy me-2"></i>
                  שכפל הזמנה
                </Button>
                {order.status !== ORDER_STATUSES.CANCELLED && 
                 order.status !== ORDER_STATUSES.COMPLETED && (
                  <Button variant="outline-danger" size="sm">
                    <i className="bi bi-x-circle me-2"></i>
                    בטל הזמנה
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Status Change Dialog */}
      <StatusChangeConfirmDialog
        show={showStatusDialog}
        onHide={() => setShowStatusDialog(false)}
        onConfirm={confirmStatusChange}
        currentStatus={order.status}
        newStatus={newStatus}
        itemType="הזמנת הרכש"
      />
    </Container>
  );
};

export default PurchaseOrderView;
