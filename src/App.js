import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import SuppliersList from './pages/Suppliers/SuppliersList';
import SupplierView from './pages/Suppliers/SupplierView';
import SupplierForm from './pages/Suppliers/SupplierForm';
import CategoriesList from './pages/Categories/CategoriesList';
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
          <Route path="/suppliers/add" element={<SupplierForm />} />
          <Route path="/suppliers/edit/:id" element={<SupplierForm />} />
          <Route path="/categories" element={<CategoriesList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;