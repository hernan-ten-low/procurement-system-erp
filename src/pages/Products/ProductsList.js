// Products List Component

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockData';
import { PRODUCT_CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import useFilters from '../../hooks/useFilters';
import usePagination from '../../hooks/usePagination';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import EmptyState, { EmptyProducts, EmptySearchResults, EmptyFilterResults } from '../../components/UI/EmptyState';

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
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
  } = useFilters(products, {
    category: '',
    status: '',
    supplier: '',
    inStock: ''
  }, 'products');

  // Pagination
  const {
    paginatedData,
    paginationInfo,
    goToPage,
    goToNextPage,
    goToPrevPage,
    changePageSize
  } = usePagination(filteredData, 20, 'products');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('שגיאה בטעינת המוצרים');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (inStock, minStock) => {
    if (inStock === 0) return { status: 'אזל מלאי', variant: 'danger' };
    if (inStock <= minStock) return { status: 'מלאי נמוך', variant: 'warning' };
    return { status: 'במלאי', variant: 'success' };
  };

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleViewProduct = (id) => {
    navigate(`/products/view/${id}`);
  };

  const handleEditProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };

  if (loading) {
    return (
      <Container fluid className="p-4">
        <LoadingSpinner size="lg" text="טוען מוצרים..." centered />
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
            <Button variant="outline-danger" onClick={loadProducts}>
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
              <h1 className="h3 mb-0">קטלוג מוצרים</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">בית</a>
                  </li>
                  <li className="breadcrumb-item active">מוצרים</li>
                </ol>
              </nav>
            </div>
            <Button
              variant="primary"
              className="rounded-pill"
              onClick={handleAddProduct}
            >
              <i className="bi bi-plus-circle me-2"></i>
              מוצר חדש
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
                  placeholder="חיפוש לפי שם, מק״ט או תיאור..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Col>

            {/* Category Filter */}
            <Col md={2}>
              <Form.Select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
              >
                <option value="">כל הקטגוריות</option>
                {PRODUCT_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Col>

            {/* Status Filter */}
            <Col md={2}>
              <Form.Select
                value={filters.status}
                onChange={(e) => updateFilter('status', e.target.value)}
              >
                <option value="">כל הסטטוסים</option>
                <option value="פעיל">פעיל</option>
                <option value="לא פעיל">לא פעיל</option>
              </Form.Select>
            </Col>

            {/* Stock Filter */}
            <Col md={2}>
              <Form.Select
                value={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.value)}
              >
                <option value="">כל המלאי</option>
                <option value="inStock">במלאי</option>
                <option value="lowStock">מלאי נמוך</option>
                <option value="outOfStock">אזל מלאי</option>
              </Form.Select>
            </Col>

            <Col md={2}>
              {filterStats.hasActiveFilters && (
                <Button
                  variant="outline-secondary"
                  onClick={clearFilters}
                  title="נקה מסננים"
                  className="w-100"
                >
                  <i className="bi bi-x-circle me-2"></i>
                  נקה מסננים
                </Button>
              )}
            </Col>
          </Row>

          {/* Filter Stats */}
          {filterStats.hasActiveFilters && (
            <div className="mt-3 text-muted small">
              <i className="bi bi-info-circle me-1"></i>
              מציג {filterStats.filtered} מתוך {filterStats.total} מוצרים
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Products Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-box me-2"></i>
            מוצרים ({filterStats.filtered})
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
              {products.length === 0 ? (
                <EmptyProducts onAddProduct={handleAddProduct} />
              ) : filterStats.hasActiveFilters ? (
                <EmptyFilterResults onClearFilters={clearFilters} />
              ) : searchTerm ? (
                <EmptySearchResults 
                  searchTerm={searchTerm} 
                  onClearSearch={() => setSearchTerm('')} 
                />
              ) : (
                <EmptyState
                  icon="bi-box"
                  title="אין מוצרים"
                  message="לא נמצאו מוצרים להצגה"
                />
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>מוצר</th>
                    <th>קטגוריה</th>
                    <th>ספק</th>
                    <th>מחיר</th>
                    <th>מלאי</th>
                    <th>סטטוס</th>
                    <th>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map(product => {
                    const stockStatus = getStockStatus(product.inStock, product.minStock);
                    return (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm bg-light rounded me-3 d-flex align-items-center justify-content-center">
                              <i className="bi bi-box text-muted"></i>
                            </div>
                            <div>
                              <div className="fw-bold">{product.name}</div>
                              <small className="text-muted">
                                מק״ט: {product.sku}
                              </small>
                              {product.brand && (
                                <div className="small text-muted">
                                  מותג: {product.brand}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge bg="light" text="dark" className="rounded-pill">
                            {product.category}
                          </Badge>
                        </td>
                        <td>{product.supplierName}</td>
                        <td>
                          <div className="fw-bold">
                            {formatCurrency(product.price, product.currency)}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="me-2">{product.inStock}</span>
                            <Badge bg={stockStatus.variant} className="small">
                              {stockStatus.status}
                            </Badge>
                          </div>
                          <small className="text-muted">
                            מינימום: {product.minStock}
                          </small>
                        </td>
                        <td>
                          <Badge bg={product.status === 'פעיל' ? 'success' : 'secondary'}>
                            {product.status}
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
                              <Dropdown.Item onClick={() => handleViewProduct(product.id)}>
                                <i className="bi bi-eye me-2"></i>
                                צפייה
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleEditProduct(product.id)}>
                                <i className="bi bi-pencil me-2"></i>
                                עריכה
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <i className="bi bi-arrow-repeat me-2"></i>
                                התאמת מלאי
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <i className="bi bi-graph-up me-2"></i>
                                היסטוריית מחירים
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item className="text-danger">
                                <i className="bi bi-archive me-2"></i>
                                הפסק מכירה
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
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
                מציג {paginationInfo.startIndex + 1}-{paginationInfo.endIndex} מתוך {paginationInfo.totalItems} מוצרים
              </div>
              
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${!paginationInfo.hasPrevPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(1)}>
                      <i className="bi bi-chevron-double-right"></i>
                    </button>
                  </li>
                  <li className={`page-item ${!paginationInfo.hasPrevPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={goToPrevPage}>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                  
                  {Array.from({ length: Math.min(5, paginationInfo.totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <li key={page} className={`page-item ${page === paginationInfo.currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(page)}>
                          {page}
                        </button>
                      </li>
                    );
                  })}
                  
                  <li className={`page-item ${!paginationInfo.hasNextPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={goToNextPage}>
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                  <li className={`page-item ${!paginationInfo.hasNextPage ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(paginationInfo.totalPages)}>
                      <i className="bi bi-chevron-double-left"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
};

export default ProductsList;
