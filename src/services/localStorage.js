// LocalStorage utility for persisting data on client-side

const STORAGE_KEYS = {
  SUPPLIERS: 'procurement_suppliers',
  PRODUCTS: 'procurement_products',
  RFQS: 'procurement_rfqs',
  PURCHASE_ORDERS: 'procurement_purchase_orders',
  USER_PREFERENCES: 'procurement_user_preferences',
  FILTERS: 'procurement_filters'
};

export const localStorage = {
  // Generic methods
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Specific data methods
  suppliers: {
    save: (suppliers) => localStorage.set(STORAGE_KEYS.SUPPLIERS, suppliers),
    load: () => localStorage.get(STORAGE_KEYS.SUPPLIERS, []),
    add: (supplier) => {
      const suppliers = localStorage.suppliers.load();
      const newSupplier = { ...supplier, id: Date.now() };
      suppliers.push(newSupplier);
      localStorage.suppliers.save(suppliers);
      return newSupplier;
    },
    update: (id, supplierData) => {
      const suppliers = localStorage.suppliers.load();
      const index = suppliers.findIndex(s => s.id === id);
      if (index !== -1) {
        suppliers[index] = { ...suppliers[index], ...supplierData };
        localStorage.suppliers.save(suppliers);
        return suppliers[index];
      }
      return null;
    },
    delete: (id) => {
      const suppliers = localStorage.suppliers.load();
      const filtered = suppliers.filter(s => s.id !== id);
      localStorage.suppliers.save(filtered);
      return filtered;
    }
  },

  products: {
    save: (products) => localStorage.set(STORAGE_KEYS.PRODUCTS, products),
    load: () => localStorage.get(STORAGE_KEYS.PRODUCTS, []),
    add: (product) => {
      const products = localStorage.products.load();
      const newProduct = { ...product, id: Date.now() };
      products.push(newProduct);
      localStorage.products.save(products);
      return newProduct;
    },
    update: (id, productData) => {
      const products = localStorage.products.load();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        localStorage.products.save(products);
        return products[index];
      }
      return null;
    },
    delete: (id) => {
      const products = localStorage.products.load();
      const filtered = products.filter(p => p.id !== id);
      localStorage.products.save(filtered);
      return filtered;
    }
  },

  rfqs: {
    save: (rfqs) => localStorage.set(STORAGE_KEYS.RFQS, rfqs),
    load: () => localStorage.get(STORAGE_KEYS.RFQS, []),
    add: (rfq) => {
      const rfqs = localStorage.rfqs.load();
      const newRfq = { ...rfq, id: Date.now() };
      rfqs.push(newRfq);
      localStorage.rfqs.save(rfqs);
      return newRfq;
    },
    update: (id, rfqData) => {
      const rfqs = localStorage.rfqs.load();
      const index = rfqs.findIndex(r => r.id === id);
      if (index !== -1) {
        rfqs[index] = { ...rfqs[index], ...rfqData };
        localStorage.rfqs.save(rfqs);
        return rfqs[index];
      }
      return null;
    },
    delete: (id) => {
      const rfqs = localStorage.rfqs.load();
      const filtered = rfqs.filter(r => r.id !== id);
      localStorage.rfqs.save(filtered);
      return filtered;
    }
  },

  purchaseOrders: {
    save: (orders) => localStorage.set(STORAGE_KEYS.PURCHASE_ORDERS, orders),
    load: () => localStorage.get(STORAGE_KEYS.PURCHASE_ORDERS, []),
    add: (order) => {
      const orders = localStorage.purchaseOrders.load();
      const newOrder = { ...order, id: Date.now() };
      orders.push(newOrder);
      localStorage.purchaseOrders.save(orders);
      return newOrder;
    },
    update: (id, orderData) => {
      const orders = localStorage.purchaseOrders.load();
      const index = orders.findIndex(o => o.id === id);
      if (index !== -1) {
        orders[index] = { ...orders[index], ...orderData };
        localStorage.purchaseOrders.save(orders);
        return orders[index];
      }
      return null;
    },
    delete: (id) => {
      const orders = localStorage.purchaseOrders.load();
      const filtered = orders.filter(o => o.id !== id);
      localStorage.purchaseOrders.save(filtered);
      return filtered;
    }
  },

  userPreferences: {
    save: (preferences) => localStorage.set(STORAGE_KEYS.USER_PREFERENCES, preferences),
    load: () => localStorage.get(STORAGE_KEYS.USER_PREFERENCES, {
      theme: 'light',
      language: 'he',
      itemsPerPage: 20,
      currency: 'ILS',
      dateFormat: 'short'
    }),
    update: (newPreferences) => {
      const current = localStorage.userPreferences.load();
      const updated = { ...current, ...newPreferences };
      localStorage.userPreferences.save(updated);
      return updated;
    }
  },

  filters: {
    save: (page, filters) => {
      const allFilters = localStorage.get(STORAGE_KEYS.FILTERS, {});
      allFilters[page] = filters;
      localStorage.set(STORAGE_KEYS.FILTERS, allFilters);
    },
    load: (page) => {
      const allFilters = localStorage.get(STORAGE_KEYS.FILTERS, {});
      return allFilters[page] || {};
    },
    clear: (page) => {
      const allFilters = localStorage.get(STORAGE_KEYS.FILTERS, {});
      delete allFilters[page];
      localStorage.set(STORAGE_KEYS.FILTERS, allFilters);
    }
  }
};

export default localStorage;
