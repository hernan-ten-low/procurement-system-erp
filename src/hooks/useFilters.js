// Custom hook for managing filters and search functionality

import { useState, useEffect, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

export const useFilters = (data, defaultFilters = {}, storageKey = null) => {
  // Always call all hooks at the top level
  const [localStorageFilters, setLocalStorageFilters] = useLocalStorage(
    storageKey ? `filters_${storageKey}` : 'temp_filters', 
    defaultFilters
  );
  const [stateFilters, setStateFilters] = useState(defaultFilters);
  
  // Use the appropriate filter state based on storageKey
  const filters = storageKey ? localStorageFilters : stateFilters;
  const setFilters = storageKey ? setLocalStorageFilters : setStateFilters;
  
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered data based on current filters and search term
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.filter(item => {
      // Search functionality
      if (searchTerm) {
        const searchableFields = getSearchableFields(item);
        const matchesSearch = searchableFields.some(field => 
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (!matchesSearch) return false;
      }

      // Apply filters
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === '' || value === 'all') return true;
        
        const itemValue = getNestedValue(item, key);
        
        // Handle array values (like categories)
        if (Array.isArray(itemValue)) {
          return itemValue.some(val => 
            String(val).toLowerCase().includes(String(value).toLowerCase())
          );
        }
        
        // Handle string/number values
        return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  }, [data, filters, searchTerm]);

  // Statistics about filtered data
  const filterStats = useMemo(() => {
    if (!data || !Array.isArray(data)) return { total: 0, filtered: 0 };
    
    return {
      total: data.length,
      filtered: filteredData.length,
      hasActiveFilters: Object.values(filters).some(value => value && value !== '' && value !== 'all') || searchTerm !== ''
    };
  }, [data, filteredData, filters, searchTerm]);

  // Update a specific filter
  const updateFilter = (key, value) => {
    if (storageKey) {
      setFilters(prev => ({ ...prev, [key]: value }));
    } else {
      setFilters[1](prev => ({ ...prev, [key]: value }));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    if (storageKey) {
      setFilters(defaultFilters);
    } else {
      setFilters[1](defaultFilters);
    }
    setSearchTerm('');
  };

  // Clear specific filter
  const clearFilter = (key) => {
    updateFilter(key, defaultFilters[key] || '');
  };

  // Helper function to get searchable fields from an item
  const getSearchableFields = (item) => {
    const searchableKeys = [
      'name', 'title', 'companyName', 'contactName', 'email', 'phone', 
      'businessNumber', 'orderNumber', 'rfqNumber', 'description', 'sku',
      'brand', 'category', 'supplierName'
    ];
    
    return searchableKeys
      .map(key => getNestedValue(item, key))
      .filter(value => value !== null && value !== undefined);
  };

  // Helper function to get nested object values
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  return {
    filters: storageKey ? filters : filters[0],
    filteredData,
    searchTerm,
    filterStats,
    updateFilter,
    setSearchTerm,
    clearFilters,
    clearFilter
  };
};

export default useFilters;
