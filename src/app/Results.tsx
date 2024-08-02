'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import React, { useState, useEffect } from 'react'
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
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const windowWidth = useWindowWidth()
  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState(data.pricedItineraries)
  const totalPages = Math.ceil(totalData.length / sizePerPage)
  const stopQuery = searchParams.get('stop'?.toString()) || ''
  const typeQuery = searchParams.get('type'?.toString()) || ''
  const sortQuery = searchParams.get('sort'?.toString()) || ''

  useEffect(() => {
    if (stopQuery) {
      const stop = stopQuery === 'no' ? 0 : stopQuery === 'one' ? 1 : 'more'
      setTotalData((prev) =>
        prev.filter(
          (item) =>
            item.originDestinationOptions[0].flightSegments[0].stopQuantity === stop
        )
      )
    }

    if (typeQuery) {
      const type = typeQuery === 'eco' ? 'Y' : 'C'
      setTotalData((prev) =>
        prev.filter(
          (item) =>
            item.originDestinationOptions[0].flightSegments[0].cabinClassCode === type
        )
      )
    }
    if (!stopQuery && !typeQuery) {
      setTotalData(data.pricedItineraries)
    }
  }, [stopQuery, typeQuery])

  useEffect(() => {
    if (sortQuery === 'price') {
      const sorted = [...totalData]
      sorted.sort((a, b) => {
        return (
          a.airItineraryPricingInfo.itinTotalFare.totalFare -
          b.airItineraryPricingInfo.itinTotalFare.totalFare
        )
      })
      setTotalData([...sorted])
    } else if (sortQuery === 'date') {
      const sorted = [...totalData]

      sorted.sort((a, b) => {
        const getHour = (dateTime: string) =>
          parseInt(dateTime.split('T')[1].split(':')[0], 10)

        const hourA = getHour(
          a.originDestinationOptions[0].flightSegments[0].departureDateTime
        )
        const hourB = getHour(
          b.originDestinationOptions[0].flightSegments[0].departureDateTime
        )
        return hourA - hourB
      })
      setTotalData([...sorted])
    } else {
      setTotalData(data.pricedItineraries)
    }
  }, [sortQuery])

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const paginatedData = totalData.slice((page - 1) * sizePerPage, page * sizePerPage)

  const handleSelect = (option: { key: string; label: string }) => {
    const params = new URLSearchParams(searchParams)
    if (option.key) {
      params.set('sort', option.key)
    } else {
      params.delete('sort')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <div className='flex justify-between mb-6'>
        <div>
          <p className='text-xl text-[#464646] font-bold'>
            بلیط هواپیمای تهران به استانبول
          </p>
          <p className='text-sm text-[#464646]'>
            {totalData.length} پرواز یافت شد . سه‌شنبه، ۱۲ اردیبهشت ۱۴۰۰
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
