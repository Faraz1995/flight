'use client'
import useWindowWidth from '@/hooks/useWidth'
import { cn } from '@/util'
import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const windowWidth = useWindowWidth()

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className='flex justify-center my-4'>
      <button
        className={cn(
          currentPage === 1 ? 'bg-slate-400' : 'bg-white',
          'px-3 py-1 mx-1 rounded'
        )}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {windowWidth > 1000 ? '<' : '< قبلی'}
      </button>
      <>
        {windowWidth > 1000 ? (
          <>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === page ? 'bg-blue-700 text-white' : 'bg-white text-black'
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </>
        ) : (
          <span className='px-3 py-1 mx-1'>
            {currentPage} از {totalPages}
          </span>
        )}
      </>
      <button
        className={cn(
          currentPage === totalPages ? 'bg-slate-400' : 'bg-white',
          'px-3 py-1 mx-1 rounded'
        )}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {windowWidth > 1000 ? '>' : 'یعدی >'}
      </button>
    </div>
  )
}

export default Pagination
