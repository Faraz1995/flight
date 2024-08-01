'use client'
import React from 'react'
import { PricedItinerary } from '@/types'
import ResultCardMobile from '@/components/ResultCardMobile'
import useWindowWidth from '@/hooks/useWidth'
import ResultCardDesktop from '@/components/ResultCardDesktop'

type Props = {
  data: {
    pricedItineraries: any[]
    [key: string]: any
  }
}

const resultCount = 27

function Results({ data }: Props) {
  const windowWidth = useWindowWidth()
  return (
    <div className='mt-5'>
      <p className='text-xl text-[#464646] font-bold'>بلیط هواپیمای تهران به استانبول</p>
      <p className='text-sm text-[#464646]'>
        {resultCount} پرواز یافت شد . سه‌شنبه، ۱۲ اردیبهشت ۱۴۰۰
      </p>
      <>
        {data.pricedItineraries.map((item, index) => {
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
            return <ResultCardDesktop key={index} />
          }
        })}
      </>
    </div>
  )
}

export default Results
