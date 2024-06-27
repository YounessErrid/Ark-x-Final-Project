import React from 'react'

const ServiceCardPagination = ({
    currentPage, totalPages, onPageChange 
  }) => {
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
          if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
          ) {
            pages.push(
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`px-3 py-1 mx-1 rounded ${
                  i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {i}
              </button>
            );
          } else if (
            i === currentPage - 2 ||
            i === currentPage + 2
          ) {
            pages.push(<span key={i} className="px-3 py-1 mx-1">...</span>);
          }
        }
        return pages;
      };
    
      return (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700"
          >
            &lt;
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700"
          >
            &gt;
          </button>
        </div>
      );
}

export default ServiceCardPagination
