/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './Pagination.module.scss';

// --- Logic tạo mảng trang thông minh ---
const usePagination = ({ currentPage, totalPage, siblingCount = 1 }) => {
  const paginationRange = React.useMemo(() => {
    // 1. Fix lỗi: Nếu totalPage không tồn tại hoặc <= 0, trả về mảng rỗng ngay lập tức
    if (!totalPage || totalPage <= 0) {
      return [];
    }

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPage) {
      return Array.from({ length: totalPage }, (_, idx) => idx + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPage;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, idx) => idx + 1);
      return [...leftRange, 'DOTS', totalPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from({ length: rightItemCount }, (_, idx) => totalPage - rightItemCount + idx + 1);
      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, idx) => leftSiblingIndex + idx);
      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }
    
    return []; // Fallback an toàn
  }, [totalPage, siblingCount, currentPage]);

  return paginationRange;
};

// --- Component Chính ---
const Pagination = ({ totalPage, page, setPage }) => {
  const paginationRange = usePagination({
    currentPage: page,
    totalPage: totalPage,
  });

  // 2. Fix lỗi: Kiểm tra paginationRange có tồn tại không trước khi check .length
  if (page === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const onPrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.pageBtn}
        onClick={onPrevious}
        disabled={page === 1}
        aria-label="Trang trước"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === 'DOTS') {
          return <span key={index} className={styles.dots}>&#8230;</span>;
        }

        return (
          <button
            key={index}
            className={`${styles.pageBtn} ${pageNumber === page ? styles.active : ''}`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className={styles.pageBtn}
        onClick={onNext}
        disabled={page === totalPage}
        aria-label="Trang sau"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;