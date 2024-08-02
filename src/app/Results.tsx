'use client'
import React, { useState } from 'react'
import { PricedItinerary } from '@/types'
import ResultCardMobile from '@/components/ResultCardMobile'
import useWindowWidth from '@/hooks/useWidth'
import ResultCardDesktop from '@/components/ResultCardDesktop'
import Pagination from '@/components/pagination'
import Dropdown from '@/components/DropDown'

type Props = {
  data: {
    pricedItineraries: any[]
    [key: string]: any
  }
}

const sizePerPage = 10

const options = [
  { key: 'price', label: 'قیمت' },
  { key: 'date', label: 'تاریخ' }
]
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

  const handleSelect = (option: { key: string; label: string }) => {
    console.log(`Selected: ${option.label}`)
  }

  return (
    <div className='mt-5'>
      <div className='flex justify-between mb-6'>
        <div>
          <p className='text-xl text-[#464646] font-bold'>
            بلیط هواپیمای تهران به استانبول
          </p>
          <p className='text-sm text-[#464646]'>
            {data.pricedItineraries.length} پرواز یافت شد . سه‌شنبه، ۱۲ اردیبهشت ۱۴۰۰
          </p>
        </div>
        {windowWidth > 1000 && (
          <Dropdown options={options} onSelect={handleSelect} label='مرتب سازی' />
        )}
      </div>
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
