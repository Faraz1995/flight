'use client'
import React, { useState } from 'react'
import { PricedItinerary } from '@/types'
import ResultCardMobile from '@/components/ResultCardMobile'
import useWindowWidth from '@/hooks/useWidth'
import ResultCardDesktop from '@/components/ResultCardDesktop'
import Pagination from '@/components/pagination'

type Props = {
  data: {
    pricedItineraries: any[]
    [key: string]: any
  }
}

const resultCount = 27

const sizePerPage = 10
function Results({ data }: Props) {
  const windowWidth = useWindowWidth()
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(data.pricedItineraries.length / sizePerPage)

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const paginatedData = data.pricedItineraries.slice(
    (page - 1) * sizePerPage,
    page * sizePerPage
  )

  return (
    <div className='mt-5'>
      <p className='text-xl text-[#464646] font-bold'>بلیط هواپیمای تهران به استانبول</p>
      <p className='text-sm text-[#464646]'>
        {resultCount} پرواز یافت شد . سه‌شنبه، ۱۲ اردیبهشت ۱۴۰۰
      </p>
      <>
        {paginatedData.map((item, index) => {
          if (windowWidth < 1000) {
            return (
              <ResultCardMobile
                key={index}
                item={item}
                airports={data.additionalData.airports}
                airlines={data.additionalData.airlines}
              />
            )
          } else {
            return (
              <ResultCardDesktop
                key={index}
                item={item}
                airports={data.additionalData.airports}
                airlines={data.additionalData.airlines}
              />
            )
          }
        })}
      </>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Results
