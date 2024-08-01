import React from 'react'
import { PricedItinerary } from '@/types'
import ResultCard from '@/components/ResultCard'

type Props = {
  data: {
    pricedItineraries: any[]
    [key: string]: any
  }
}

const resultCount = 27

function Results({ data }: Props) {
  return (
    <div className='mt-5'>
      <p className='text-xl text-[#464646] font-bold'>بلیط هواپیمای تهران به استانبول</p>
      <p className='text-sm text-[#464646]'>
        {resultCount} پرواز یافت شد . سه‌شنبه، ۱۲ اردیبهشت ۱۴۰۰
      </p>
      <>
        {data.pricedItineraries.map((item, index) => (
          <ResultCard
            key={index}
            item={item}
            airports={data.additionalData.airports}
            airlines={data.additionalData.airlines}
          />
        ))}
      </>
    </div>
  )
}

export default Results
