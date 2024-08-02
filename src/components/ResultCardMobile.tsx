'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { addThousandsSeparator, cn, extractTime, humanizeDurationTime } from '@/util'
import Button from './Button'
import Drawer from './Drawer'
import DetailResultMobile from './DetailResultMobile'

type Props = {
  item: any
  airports: any[]
  airlines: any[]
}

function ResultCardMobile({ item, airports, airlines }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  const findCitiesBasedOnAirport = (airport: string) => {
    const item = airports.find((item) => item.iata === airport)
    if (item) {
      return item
    }
  }

  const findAirline = (airline: string) => {
    const item = airlines.find((item) => item.iata === airline)
    if (item) {
      return item
    }
  }

  const clickHandler = () => {
    setIsDrawerOpen(true)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className='bg-white p-4 mb-4'>
      <div className='flex items-center'>
        <Image src={'/assets/png/mahan.png'} alt='mahan' width={30} height={30} />
        <p className='text-sm text-[#464646] mr-4'>
          {findAirline(item.validatingAirlineCode).nameFa}
        </p>
      </div>
      <div className='flex mt-4'>
        {/* start hour box */}
        <div>
          <p className='font-bold text-[#464646] text-2xl'>
            {extractTime(
              item.originDestinationOptions[0].flightSegments[0].departureDateTime
            )}
          </p>
          <p className='text-sm text-[#464646]'>
            {
              findCitiesBasedOnAirport(
                item.originDestinationOptions[0].flightSegments[0]
                  .departureAirportLocationCode
              ).cityFa
            }
            <span className='mr-2 text-xs text-[#8d8d8d]'>
              (
              {
                findCitiesBasedOnAirport(
                  item.originDestinationOptions[0].flightSegments[0]
                    .departureAirportLocationCode
                ).cityId
              }
              )
            </span>
          </p>
        </div>
        <div className='w-full px-4'>
          <p className='text-center'>
            {humanizeDurationTime(
              item.originDestinationOptions[0].flightSegments[0].journeyDuration
            )}
          </p>
          <div className='w-full flex items-center mx-4'>
            <div className='border border-[#1773dc] rounded-full w-2 h-2 mr-4'></div>
            <div className='w-11/12 flex-grow border-t-2 border-gray-300'></div>
            <div className='border border-[#ff7913] rounded-full w-2 h-2 ml-4'></div>
          </div>
        </div>
        <div>
          <p className='font-bold text-[#464646] text-2xl'>
            {extractTime(
              item.originDestinationOptions[0].flightSegments[0].arrivalDateTime
            )}
          </p>
          <p className='text-sm text-[#464646]'>
            {
              findCitiesBasedOnAirport(
                item.originDestinationOptions[0].flightSegments[0]
                  .arrivalAirportLocationCode
              ).cityFa
            }
            <span className='mr-2 text-xs text-[#8d8d8d]'>
              (
              {
                findCitiesBasedOnAirport(
                  item.originDestinationOptions[0].flightSegments[0]
                    .arrivalAirportLocationCode
                ).cityId
              }
              )
            </span>
          </p>
        </div>
      </div>
      {/* end of hour box */}
      <div className='border-t border-b border-[#eeeeee] flex justify-between py-1 mt-4'>
        <div className={cn(item.isCharter && 'bg-[#f4f4f4]', 'py-1 px-3 rounded-sm')}>
          <p className='text-sm'>چارتر</p>
        </div>
        <div>
          <p className='text-sm'>اکونومی</p>
        </div>
        <p className='text-sm'>
          {item.originDestinationOptions[0].flightSegments[0].seatsRemaining} صندلی خالی
        </p>
        {item.originDestinationOptions[0].flightSegments[0].operatingAirline
          .flightNumber && (
          <p className='text-sm'>
            شماره پرواز :{' '}
            {
              item.originDestinationOptions[0].flightSegments[0].operatingAirline
                .flightNumber
            }
          </p>
        )}
      </div>{' '}
      {/*flight info div */}
      <div className='flex justify-between items-center mt-4'>
        <div>
          <p className='text-[#8d8d8d] text-xs'>یک نفر</p>
          <p>
            <span className='text-[#1773dc] text-xl'>
              {addThousandsSeparator(
                item.airItineraryPricingInfo.itinTotalFare.totalFare
              )}
            </span>
            <span className='text-[#8d8d8d] text-xs mr-1'>تومان</span>
          </p>
        </div>
        <div>
          <Button onClick={clickHandler}>
            <p>جزئیات و انتخاب</p>
          </Button>
        </div>
      </div>
      <DetailResultMobile
        title={'جزئیات پرواز'}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        airlines={airlines}
        airports={airports}
        item={item}
      />
    </div>
  )
}

export default ResultCardMobile
