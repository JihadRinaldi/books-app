// Pagination.tsx
import React from 'react';
import './Pagination.scss'; // Import component styles

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="pagination">
            <button 
                className={currentPage === 1 ? 'disabled' : ''}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button 
                className={currentPage === totalPages ? 'disabled' : ''}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
