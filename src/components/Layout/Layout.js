import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Top Navigation */}
      <Navbar 
        bg="dark" 
        variant="dark" 
        expand="lg" 
        fixed="top"
        className="shadow-sm"
        style={{ backgroundColor: '#011939' }}
      >
        <Container fluid>
          <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
            <i className="bi bi-box-seam me-2"></i>
            מערכת רכש ERP
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                href="/dashboard" 
                className={isActive('/dashboard') ? 'active' : ''}
              >
                <i className="bi bi-speedometer2 me-2"></i>
                דשבורד
              </Nav.Link>

              <NavDropdown 
                title={
                  <>
                    <i className="bi bi-people me-2"></i>
                    ספקים
                  </>
                } 
                id="suppliers-dropdown"
              >
                <NavDropdown.Item href="/suppliers">רשימת ספקים</NavDropdown.Item>
                <NavDropdown.Item href="/suppliers/add">הוסף ספק</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/categories">קטגוריות</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown 
                title={
                  <>
                    <i className="bi bi-cart me-2"></i>
                    רכש
                  </>
                } 
                id="purchasing-dropdown"
              >
                <NavDropdown.Item href="/rfq">בקשות הצעת מחיר</NavDropdown.Item>
                <NavDropdown.Item href="/purchase-orders">הזמנות רכש</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/receiving">קליטת סחורה</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/reports">
                <i className="bi bi-graph-up me-2"></i>
                דוחות
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="/notifications" className="position-relative">
                <i className="bi bi-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6em' }}>
                  3
                </span>
              </Nav.Link>
              
              <NavDropdown 
                title={
                  <>
                    <i className="bi bi-person-circle me-2"></i>
                    משתמש
                  </>
                } 
                id="user-dropdown" 
                align="end"
              >
                <NavDropdown.Item href="/profile">פרופיל</NavDropdown.Item>
                <NavDropdown.Item href="/settings">הגדרות</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">יציאה</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <div className="main-container">
        {children}
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <div className="bottom-nav d-md-none">
        <div className="d-flex justify-content-around py-2 bg-light border-top">
          <Button variant="link" className="text-center p-2">
            <i className="bi bi-house-door d-block"></i>
            <small>בית</small>
          </Button>
          <Button variant="link" className="text-center p-2">
            <i className="bi bi-people d-block"></i>
            <small>ספקים</small>
          </Button>
          <Button variant="link" className="text-center p-2">
            <i className="bi bi-cart d-block"></i>
            <small>רכש</small>
          </Button>
          <Button variant="link" className="text-center p-2">
            <i className="bi bi-graph-up d-block"></i>
            <small>דוחות</small>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Layout;