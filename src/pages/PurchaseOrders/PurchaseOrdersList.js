// Purchase Orders List Component

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Dropdown, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockData';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatCurrency, formatDate, formatOrderNumber } from '../../utils/formatters';
import useFilters from '../../hooks/useFilters';
import usePagination from '../../hooks/usePagination';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import EmptyState, { EmptyPurchaseOrders, EmptySearchResults, EmptyFilterResults } from '../../components/UI/EmptyState';

const PurchaseOrdersList = () => {
  const navigate = useNavigate();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters and search
  const {
    filters,
    filteredData,
    searchTerm,
    filterStats,
    updateFilter,
    setSearchTerm,
    clearFilters
  } = useFilters(purchaseOrders, {
    status: '',
    supplier: '',
    dateRange: '',
    minAmount: '',
    maxAmount: ''
  }, 'purchaseOrders');

  // Pagination
  const {
    paginatedData,
    paginationInfo,
    goToPage,
    goToNextPage,
    goToPrevPage,
    changePageSize
  } = usePagination(filteredData, 20, 'purchaseOrders');

  // Load data
  useEffect(() => {
    loadPurchaseOrders();
  }, []);

  const loadPurchaseOrders = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getPurchaseOrders();
      setPurchaseOrders(data);
      setError(null);
    } catch (err) {
      setError('שגיאה בטעינת הזמנות הרכש');
      console.error('Error loading purchase orders:', err);
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

  const handleCreateOrder = () => {
    navigate('/purchase-orders/create');
  };

  const handleViewOrder = (id) => {
    navigate(`/purchase-orders/view/${id}`);
  };

  const handleEditOrder = (id) => {
    navigate(`/purchase-orders/edit/${id}`);
  };

  if (loading) {
    return (
      <Container fluid className="p-4">
        <LoadingSpinner size="lg" text="טוען הזמנות רכש..." centered />
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-4">
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <div className="mt-2">
            <Button variant="outline-danger" onClick={loadPurchaseOrders}>
              נסה שנית
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">הזמנות רכש</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">בית</a>
                  </li>
                  <li className="breadcrumb-item active">הזמנות רכש</li>
                </ol>
              </nav>
            </div>
            <Button
              variant="primary"
              className="rounded-pill"
              onClick={handleCreateOrder}
            >
              <i className="bi bi-plus-circle me-2"></i>
              הזמנה חדשה
            </Button>
          </div>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            {/* Search */}
            <Col md={4}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="חיפוש לפי מספר הזמנה, ספק או פריט..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Col>

            {/* Status Filter */}
            <Col md={2}>
              <Form.Select
                value={filters.status}
                onChange={(e) => updateFilter('status', e.target.value)}
              >
                <option value="">כל הסטטוסים</option>
                {Object.values(ORDER_STATUSES).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Form.Select>
            </Col>

            {/* Supplier Filter */}
            <Col md={2}>
              <Form.Select
                value={filters.supplier}
                onChange={(e) => updateFilter('supplier', e.target.value)}
              >
                <option value="">כל הספקים</option>
                {/* This would be populated from suppliers data */}
                <option value="אלקטרוניקה מתקדמת בע״מ">אלקטרוניקה מתקדמת בע״מ</option>
                <option value="טכנולוגיות חדשניות">טכנולוגיות חדשניות</option>
              </Form.Select>
            </Col>

            {/* Amount Range */}
            <Col md={2}>
              <Form.Control
                type="number"
                placeholder="סכום מינימלי"
                value={filters.minAmount}
                onChange={(e) => updateFilter('minAmount', e.target.value)}
              />
            </Col>

            <Col md={2}>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  placeholder="סכום מקסימלי"
                  value={filters.maxAmount}
                  onChange={(e) => updateFilter('maxAmount', e.target.value)}
                />
                {filterStats.hasActiveFilters && (
                  <Button
                    variant="outline-secondary"
                    onClick={clearFilters}
                    title="נקה מסננים"
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                )}
              </div>
            </Col>
          </Row>

          {/* Filter Stats */}
          {filterStats.hasActiveFilters && (
            <div className="mt-3 text-muted small">
              <i className="bi bi-info-circle me-1"></i>
              מציג {filterStats.filtered} מתוך {filterStats.total} הזמנות
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Orders Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-cart me-2"></i>
            הזמנות רכש ({filterStats.filtered})
          </h5>
          <div className="d-flex align-items-center gap-2">
            <Form.Select
              size="sm"
              value={paginationInfo.pageSize}
              onChange={(e) => changePageSize(parseInt(e.target.value))}
              style={{ width: 'auto' }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
            <span className="text-muted small">פריטים בעמוד</span>
          </div>
        </Card.Header>

        <Card.Body className="p-0">
          {filteredData.length === 0 ? (
            <div className="p-4">
              {purchaseOrders.length === 0 ? (
                <EmptyPurchaseOrders onCreateOrder={handleCreateOrder} />
              ) : filterStats.hasActiveFilters ? (
                <EmptyFilterResults onClearFilters={clearFilters} />
              ) : searchTerm ? (
                <EmptySearchResults 
                  searchTerm={searchTerm} 
                  onClearSearch={() => setSearchTerm('')} 
                />
              ) : (
                <EmptyState
                  icon="bi-cart"
                  title="אין הזמנות רכש"
                  message="לא נמצאו הזמנות רכש להצגה"
                />
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>מספר הזמנה</th>
                    <th>ספק</th>
                    <th>תאריך הזמנה</th>
                    <th>תאריך אספקה</th>
                    <th>סכום כולל</th>
                    <th>סטטוס</th>
                    <th>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map(order => (
                    <tr key={order.id}>
                      <td>
                        <div className="fw-bold">
                          {formatOrderNumber(order.orderNumber)}
                        </div>
                        {order.rfqId && (
                          <small className="text-muted">
                            מבוסס על RFQ-{order.rfqId}
                          </small>
                        )}
                      </td>
                      <td>
                        <div>{order.supplierName}</div>
                        <small className="text-muted">
                          {order.items?.length || 0} פריטים
                        </small>
                      </td>
                      <td>{formatDate(order.orderDate)}</td>
                      <td>
                        <div>{formatDate(order.deliveryDate)}</div>
                        {new Date(order.deliveryDate) < new Date() && 
                         order.status !== ORDER_STATUSES.COMPLETED && (
                          <small className="text-danger">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            מאחר
                          </small>
                        )}
                      </td>
                      <td>
                        <div className="fw-bold">
                          {formatCurrency(order.total, order.currency)}
                        </div>
                        <small className="text-muted">
                          + מע״מ {formatCurrency(order.vat, order.currency)}
                        </small>
                      </td>
                      <td>
                        <Badge bg={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="outline-secondary"
                            size="sm"
                            className="rounded-pill"
                          >
                            <i className="bi bi-three-dots"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleViewOrder(order.id)}>
                              <i className="bi bi-eye me-2"></i>
                              צפייה
                            </Dropdown.Item>
                            {order.status === ORDER_STATUSES.DRAFT && (
                              <Dropdown.Item onClick={() => handleEditOrder(order.id)}>
                                <i className="bi bi-pencil me-2"></i>
                                עריכה
                              </Dropdown.Item>
                            )}
                            <Dropdown.Item>
                              <i className="bi bi-download me-2"></i>
                              הורדת PDF
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="bi bi-envelope me-2"></i>
                              שליחה לספק
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger">
                              <i className="bi bi-trash me-2"></i>
                              מחיקה
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>

        {/* Pagination */}
        {paginationInfo.totalPages > 1 && (
          <Card.Footer>
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                מציג {paginationInfo.startIndex + 1}-{paginationInfo.endIndex} מתוך {paginationInfo.totalItems} הזמנות
              </div>
              
              <Pagination className="mb-0">
                <Pagination.First 
                  onClick={() => goToPage(1)}
                  disabled={!paginationInfo.hasPrevPage}
                />
                <Pagination.Prev 
                  onClick={goToPrevPage}
                  disabled={!paginationInfo.hasPrevPage}
                />
                
                {/* Page numbers would be generated here */}
                {Array.from({ length: Math.min(5, paginationInfo.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Pagination.Item
                      key={page}
                      active={page === paginationInfo.currentPage}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}
                
                <Pagination.Next 
                  onClick={goToNextPage}
                  disabled={!paginationInfo.hasNextPage}
                />
                <Pagination.Last 
                  onClick={() => goToPage(paginationInfo.totalPages)}
                  disabled={!paginationInfo.hasNextPage}
                />
              </Pagination>
            </div>
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
};

export default PurchaseOrdersList;
