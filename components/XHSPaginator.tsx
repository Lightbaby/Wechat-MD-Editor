import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface XHSPaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const XHSPaginator: React.FC<XHSPaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={() => canGoPrev && onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
          ${canGoPrev
            ? 'bg-white text-[#333333] shadow-sm hover:shadow-md hover:bg-[#F5F5F5]'
            : 'bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed'
          }
        `}
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`
              w-2 h-2 rounded-full transition-all duration-200
              ${i === currentPage
                ? 'bg-[#1677FF] w-4'
                : 'bg-[#E5E5E5] hover:bg-[#CCCCCC]'
              }
            `}
          />
        ))}
      </div>

      <span className="text-sm text-[#999999] min-w-[48px] text-center">
        {currentPage + 1} / {totalPages}
      </span>

      <button
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
          ${canGoNext
            ? 'bg-white text-[#333333] shadow-sm hover:shadow-md hover:bg-[#F5F5F5]'
            : 'bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed'
          }
        `}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default XHSPaginator;
