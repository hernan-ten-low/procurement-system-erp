import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import SuppliersList from './pages/Suppliers/SuppliersList';
import SupplierView from './pages/Suppliers/SupplierView';
import SupplierDetail from './pages/Suppliers/SupplierDetail';
import SupplierForm from './pages/Suppliers/SupplierForm';
import CategoriesList from './pages/Categories/CategoriesList';
import ProductsList from './pages/Products/ProductsList';
import RFQList from './pages/RFQ/RFQList';
import RFQCreate from './pages/RFQ/RFQCreate';
import RFQView from './pages/RFQ/RFQView';
import RFQEdit from './pages/RFQ/RFQEdit';
import RFQCompare from './pages/RFQ/RFQCompare';
import PurchaseOrdersList from './pages/PurchaseOrders/PurchaseOrdersList';
import PurchaseOrderCreate from './pages/PurchaseOrders/PurchaseOrderCreate';
import PurchaseOrderView from './pages/PurchaseOrders/PurchaseOrderView';
import Reports from './pages/Reports/Reports';
import Receiving from './pages/Receiving/Receiving';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/suppliers" element={<SuppliersList />} />
          <Route path="/suppliers/view/:id" element={<SupplierView />} />
          <Route path="/suppliers/detail/:id" element={<SupplierDetail />} />
          <Route path="/suppliers/add" element={<SupplierForm />} />
          <Route path="/suppliers/edit/:id" element={<SupplierForm />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/rfq" element={<RFQList />} />
          <Route path="/rfq/list" element={<RFQList />} />
          <Route path="/rfq/create" element={<RFQCreate />} />
          <Route path="/rfq/view/:id" element={<RFQView />} />
          <Route path="/rfq/edit/:id" element={<RFQEdit />} />
          <Route path="/rfq/compare/:id" element={<RFQCompare />} />
          <Route path="/purchase-orders" element={<PurchaseOrdersList />} />
          <Route path="/purchase-orders/list" element={<PurchaseOrdersList />} />
          <Route path="/purchase-orders/create" element={<PurchaseOrderCreate />} />
          <Route path="/purchase-orders/view/:id" element={<PurchaseOrderView />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/receiving" element={<Receiving />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;