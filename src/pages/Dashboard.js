import React from 'react';
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container fluid className="p-4">
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0 text-gray-800">דשבורד רכש וספקים</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">בית</a></li>
              <li className="breadcrumb-item active">דשבורד</li>
            </ol>
          </nav>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="g-3 mb-4">
        {/* ספקים פעילים */}
        <Col xl={3} md={6}>
          <Card className="custom-card h-100">
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="text-xs fw-bold text-primary-custom text-uppercase mb-1">
                    ספקים פעילים
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">124</div>
                  <div className="text-muted small">
                    <i className="bi bi-arrow-up text-success"></i> 
                    +5 החודש
                  </div>
                </Col>
                <Col xs="auto">
                  <div className="icon-circle bg-primary-custom">
                    <i className="bi bi-people-fill text-white fs-4"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* הזמנות פתוחות */}
        <Col xl={3} md={6}>
          <Card className="custom-card h-100">
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="text-xs fw-bold text-success text-uppercase mb-1">
                    הזמנות פתוחות
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">47</div>
                  <div className="text-muted small">
                    בשווי ₪485,320
                  </div>
                </Col>
                <Col xs="auto">
                  <div className="icon-circle bg-success">
                    <i className="bi bi-cart-check text-white fs-4"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* משלוחים צפויים */}
        <Col xl={3} md={6}>
          <Card className="custom-card h-100">
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="text-xs fw-bold text-info text-uppercase mb-1">
                    משלוחים היום
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">12</div>
                  <div className="text-muted small">
                    3 באיחור
                  </div>
                </Col>
                <Col xs="auto">
                  <div className="icon-circle bg-info">
                    <i className="bi bi-truck text-white fs-4"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* התראות */}
        <Col xl={3} md={6}>
          <Card className="custom-card h-100">
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="text-xs fw-bold text-warning text-uppercase mb-1">
                    התראות פעילות
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">8</div>
                  <div className="text-muted small">
                    5 דחופות
                  </div>
                </Col>
                <Col xs="auto">
                  <div className="icon-circle bg-warning">
                    <i className="bi bi-exclamation-triangle text-white fs-4"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Content Row */}
      <Row className="g-3">
        {/* הזמנות אחרונות */}
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <h6 className="m-0 fw-bold text-primary-custom">הזמנות אחרונות</h6>
              <a href="/purchase-orders" className="btn btn-sm btn-primary-custom">
                ראה הכל <i className="bi bi-arrow-left ms-1"></i>
              </a>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>מספר</th>
                      <th>ספק</th>
                      <th>סכום</th>
                      <th>סטטוס</th>
                      <th>תאריך</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#PO-2024-0125</td>
                      <td>אלקטרוניקה בע"מ</td>
                      <td>₪12,540</td>
                      <td><span className="badge bg-warning">ממתין</span></td>
                      <td>היום</td>
                    </tr>
                    <tr>
                      <td>#PO-2024-0124</td>
                      <td>טכנולוגיות מתקדמות</td>
                      <td>₪8,320</td>
                      <td><span className="badge bg-success">אושר</span></td>
                      <td>אתמול</td>
                    </tr>
                    <tr>
                      <td>#PO-2024-0123</td>
                      <td>מחשבים ורשתות פרו</td>
                      <td>₪15,200</td>
                      <td><span className="badge bg-info">נשלח</span></td>
                      <td>01/01/2024</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* התראות ומשימות */}
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <h6 className="m-0 fw-bold text-primary-custom">התראות ומשימות</h6>
              <a href="/alerts" className="btn btn-sm btn-primary-custom">
                ראה הכל <i className="bi bi-arrow-left ms-1"></i>
              </a>
            </Card.Header>
            <Card.Body>
              <Alert variant="warning" className="d-flex align-items-center">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>
                  <strong>מלאי נמוך:</strong> 5 פריטים מתחת למינימום
                </div>
              </Alert>
              <Alert variant="info" className="d-flex align-items-center">
                <i className="bi bi-clock-fill me-2"></i>
                <div>
                  <strong>אישור נדרש:</strong> 3 הזמנות ממתינות לאישור
                </div>
              </Alert>
              <Alert variant="danger" className="d-flex align-items-center">
                <i className="bi bi-calendar-x-fill me-2"></i>
                <div>
                  <strong>חוזה פג תוקף:</strong> חוזה עם "רכיבים בע"מ" פג ב-15/12
                </div>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;