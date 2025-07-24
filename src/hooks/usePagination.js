// Custom hook for pagination functionality

import { useState, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

export const usePagination = (data, defaultPageSize = 20, storageKey = null) => {
  // Always call all hooks at the top level
  const [localStoragePageSize, setLocalStoragePageSize] = useLocalStorage(
    storageKey ? `pageSize_${storageKey}` : 'temp_pageSize',
    defaultPageSize
  );
  const [statePageSize, setStatePageSize] = useState(defaultPageSize);
  
  // Use the appropriate page size state based on storageKey
  const pageSize = storageKey ? localStoragePageSize : statePageSize;
  const setPageSize = storageKey ? setLocalStoragePageSize : setStatePageSize;
  
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const paginationInfo = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return {
        totalItems: 0,
        totalPages: 0,
        startIndex: 0,
        endIndex: 0,
        hasNextPage: false,
        hasPrevPage: false
      };
    }

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    
    return {
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      currentPage,
      pageSize
    };
  }, [data, currentPage, pageSize]);

  // Get current page data
  const paginatedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  // Navigation functions
  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, paginationInfo.totalPages));
    setCurrentPage(newPage);
  };

  const goToNextPage = () => {
    if (paginationInfo.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (paginationInfo.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(paginationInfo.totalPages);
  };

  // Reset to first page when data changes
  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Change page size
  const changePageSize = (newSize) => {
    const currentIndex = (currentPage - 1) * pageSize;
    if (storageKey) {
      setPageSize(newSize);
    } else {
      setPageSize[1](newSize);
    }
    
    // Calculate which page the current first item should be on with new page size
    const newPage = Math.floor(currentIndex / newSize) + 1;
    setCurrentPage(newPage);
  };

  // Generate page numbers for pagination component
  const getPageNumbers = (maxVisible = 5) => {
    const { totalPages, currentPage } = paginationInfo;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    paginatedData,
    paginationInfo,
    currentPage,
    pageSize: storageKey ? pageSize : pageSize[0],
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    changePageSize,
    getPageNumbers
  };
};

export default usePagination;
