# GitHub Copilot Instructions - Procurement System ERP

## Architecture Overview

This is a **React-based procurement management system** with Hebrew RTL support and Bootstrap 5. The system follows a **client-side architecture with mock data** for development.

### Core Structure
- **Frontend**: React 19.1.0 + React Router 7.7.0 + Bootstrap 5.3.7 RTL
- **State Management**: localStorage with custom hooks (`useLocalStorage`, `useFilters`, `usePagination`)
- **Data Layer**: Mock API services (`src/services/mockData.js`) with client-side persistence
- **Styling**: CSS custom properties system with RTL support and Hebrew localization

## Key Development Patterns

### Data Flow Architecture
```
Components → Custom Hooks → Services → localStorage
     ↑            ↓            ↓
   UI State → Filtered Data → Persisted Data
```

### Component Structure
- **Pages**: Feature modules in `src/pages/` (Suppliers, PurchaseOrders, Products, RFQ, etc.)
- **Shared Components**: `src/components/UI/` (LoadingSpinner, EmptyState, ConfirmDialog, Toast)
- **Services**: `src/services/` (mockData.js, localStorage.js)
- **Utilities**: `src/utils/` (constants.js, formatters.js, validators.js)

### Essential Constants and Utilities
- **Constants**: Hebrew status enums in `src/utils/constants.js` (ORDER_STATUSES, SUPPLIER_STATUSES, etc.)
- **Formatters**: Hebrew number/currency formatting with `formatCurrency`, `formatDate`, `formatBusinessNumber`
- **Validators**: Form validation with Hebrew error messages (`validateRequired`, `validateEmail`, etc.)

## Critical Development Workflows

### Adding New Features
1. **Create mock data** in `src/services/mockData.js` following existing patterns
2. **Add to localStorage service** for persistence in `src/services/localStorage.js`
3. **Use custom hooks** (`useFilters`, `usePagination`) for list pages
4. **Follow Hebrew RTL patterns** with Bootstrap classes and custom CSS

### Working with Forms
- Use React Bootstrap components with Hebrew labels
- Integrate `src/utils/validators.js` for validation
- Follow multi-step wizard pattern (see `SupplierForm.js`)
- Save drafts to localStorage using `useLocalStorage` hook

### Navigation and Routing
- All routes defined in `src/App.js`
- Hebrew breadcrumbs using Bootstrap breadcrumb component
- Navigation structure in `src/components/Layout/Layout.js`

## Project-Specific Conventions

### Hebrew and RTL Support
- **Always use Hebrew** for UI text, status labels, and user-facing content
- **Bootstrap RTL classes**: Use `me-*` (margin-end) instead of `mr-*`
- **Date formatting**: DD/MM/YYYY format with Hebrew month names
- **Currency**: Israeli Shekel (₪) with comma thousand separators

### Status and Badge Systems
```javascript
// Status badges follow consistent color patterns
const getStatusVariant = (status) => {
  switch(status) {
    case 'פעיל': return 'success';
    case 'ממתין לאישור': return 'warning';
    case 'מושעה': return 'danger';
  }
};
```

### Mock Data Patterns
- **Generate realistic Hebrew data** using company names, addresses, contact names
- **Maintain referential integrity** between suppliers, products, and orders
- **Use consistent ID patterns** (auto-increment integers)

## Build and Development Commands

```bash
# Development server (port 3000)
npm start

# Production build
npm run build

# Run tests
npm test
```

### Environment Setup
- **Node.js 16+** required
- **Bootstrap RTL** and Bootstrap Icons included
- **No backend required** - fully client-side development
- **Data persists** in browser localStorage between sessions

## Integration Points and Dependencies

### External Libraries
- **React Bootstrap**: Primary UI component library
- **Bootstrap Icons**: Icon system (`bi bi-*` classes)
- **React Router**: Client-side routing
- **Font Awesome**: Additional icons in some components

### Custom Styling System
- **CSS Variables**: Defined in `src/styles/variables.css`
- **RTL Fixes**: Hebrew-specific adjustments in `src/styles/rtl-fixes.css`
- **Print Styles**: Document printing support in `src/styles/print.css`

### Key Files for Understanding Business Logic
- `src/services/mockData.js`: All business entities and relationships
- `src/utils/constants.js`: Business rules and status flows
- `procurement-system-erp/workflows/`: Business process documentation
- `src/components/Layout/Layout.js`: Navigation and user flow

## Common Pitfalls to Avoid

1. **Don't mix English/Hebrew** - maintain consistent Hebrew UI
2. **Always use RTL Bootstrap classes** (`ms-*`, `me-*`, `pe-*`, etc.)
3. **Mock data must be realistic** - use proper Hebrew business names and addresses
4. **Respect the localStorage schema** - follow existing patterns for data persistence
5. **React Hooks rules** - always call hooks at component top level (fixed in useFilters/usePagination)
