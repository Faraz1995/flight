'use client'
import React, { useState } from 'react'
import Drawer from './Drawer'
import {
  addThousandsSeparator,
  cn,
  extractTime,
  formatGeorigianDate,
  formatJalaaliDate,
  humanizeDurationTime
} from '@/util'
import Image from 'next/image'
import Button from './Button'

interface Props {
  isDrawerOpen: boolean
  toggleDrawer: () => void
  title: string
  airlines: any[]
  airports: any[]
  item: any
}

function DetailResultMobile({
  isDrawerOpen,
  toggleDrawer,
  title,
  airlines,
  airports,
  item
}: Props) {
  const [activeTab, setActiveTab] = useState<string>('detail')

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

  const selectTicket = () => {}

  return (
    <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} title={title}>
      <div className='flex space-x-2 border-b border-[#eeeeee]'>
        <div
          onClick={() => setActiveTab('detail')}
          className={cn(
            activeTab === 'detail' ? 'bg-[#1773dc] text-white' : 'text-[#8d8d8d]',
            'flex items-center p-3 cursor-pointer'
          )}
        >
          <Image
            className='ml-1'
            src={'/assets/svg/detail.svg'}
            alt='detail'
            width={15}
            height={15}
          />
          <p>جزئیات پرواز</p>
        </div>
        <div
          onClick={() => setActiveTab('rule')}
          className={cn(
            activeTab === 'rule' ? 'bg-[#1773dc] text-white' : 'text-[#8d8d8d]',
            'flex items-center p-3 cursor-pointer'
          )}
        >
          <Image
            className='ml-1'
            src={'/assets/svg/rule.svg'}
            alt='detail'
            width={15}
            height={15}
          />

          <p> قوانین و شرایط</p>
        </div>
      </div>
      {activeTab === 'detail' && (
        <>
          <p className='my-5 font-bold'>
            پرواز رفت{' '}
            {
              findCitiesBasedOnAirport(
                item.originDestinationOptions[0].flightSegments[0]
                  .departureAirportLocationCode
              ).cityFa
            }
            -{' '}
            {
              findCitiesBasedOnAirport(
                item.originDestinationOptions[0].flightSegments[0]
                  .arrivalAirportLocationCode
              ).cityFa
            }
          </p>
          <div className='h-full flex flex-col'>
            <div className='flex flex-col'>
              <div className='flex'>
                {/* airline div */}
                <div className='flex flex-col items-center justify-center'>
                  <Image
                    src={'/assets/png/mahan.png'}
                    alt='mahan'
                    width={40}
                    height={35}
                  />
                  <p className='text-xs text-[#6f6f6f]'>
                    {findAirline(item.validatingAirlineCode).nameFa}
                  </p>
                </div>
                {/* divider */}
                <div className='flex flex-col items-center mx-4 max-h-[320px]'>
                  <div className='w-2 h-2 border border-[#870b1d] rounded-full'></div>
                  <div className='border-l border-dashed border-[#b8b8b8] h-full min-h-32 py-1'></div>
                  <div className='w-2 h-2 border border-[#870b1d] rounded-full'></div>
                </div>
                {/* info */}
                <div className='flex flex-col w-full'>
                  <div className='flex'>
                    {/* departure time */}
                    <p className='font-bold text-[#464646] ml-4'>
                      {extractTime(
                        item.originDestinationOptions[0].flightSegments[0]
                          .departureDateTime
                      )}
                    </p>
                    {/* departure city */}
                    <p className='text-[#464646]'>
                      {' '}
                      {
                        findCitiesBasedOnAirport(
                          item.originDestinationOptions[0].flightSegments[0]
                            .departureAirportLocationCode
                        ).cityFa
                      }{' '}
                      (
                      {
                        findCitiesBasedOnAirport(
                          item.originDestinationOptions[0].flightSegments[0]
                            .departureAirportLocationCode
                        ).cityId
                      }
                      )
                    </p>
                  </div>
                  {/* departure date */}
                  <p className='text-[#464646] mt-2'>
                    {formatJalaaliDate(
                      item.originDestinationOptions[0].flightSegments[0].departureDateTime
                    )}{' '}
                    {formatGeorigianDate(
                      item.originDestinationOptions[0].flightSegments[0].departureDateTime
                    )}
                  </p>
                  {/* departure airport */}
                  <p className='text-[#8d8d8d] mt-2'>
                    {
                      findCitiesBasedOnAirport(
                        item.originDestinationOptions[0].flightSegments[0]
                          .departureAirportLocationCode
                      ).nameFa
                    }
                  </p>

                  {/* info */}
                  <div className='flex mt-6'>
                    <p className='text-[#8d8d8d] text-xs flex-1'>مدت پرواز</p>
                    <p className='text-[#464646] text-xs flex-1'>
                      {' '}
                      {humanizeDurationTime(
                        item.originDestinationOptions[0].flightSegments[0].journeyDuration
                      )}
                    </p>
                  </div>

                  <div className='flex mt-2'>
                    <p className='text-[#8d8d8d] text-xs flex-1'>نوع هواپیما</p>
                    <p className='text-[#464646] text-xs flex-1'>
                      {
                        item.originDestinationOptions[0].flightSegments[0]
                          .operatingAirline.equipment
                      }
                    </p>
                  </div>

                  <div className='flex mt-2'>
                    <p className='text-[#8d8d8d] text-xs flex-1'>کلاس پرواز</p>
                    <p className='text-[#464646] text-xs flex-1'>اکونومی</p>
                  </div>

                  <div className='flex mt-2'>
                    <p className='text-[#8d8d8d] text-xs flex-1'>نوع پرواز</p>
                    <p className='text-[#464646] text-xs flex-1'>سیستمی</p>
                  </div>

                  <div className='flex mt-2'>
                    <p className='text-[#8d8d8d] text-xs flex-1'>بار مجاز</p>
                    <p className='text-[#464646] text-xs flex-1'>
                      {item.originDestinationOptions[0].flightSegments[0].baggage}
                    </p>
                  </div>

                  <div className='flex mt-2 '>
                    <p className='text-[#8d8d8d] text-xs flex-1'>کلاس نرخی</p>
                    <p className='text-[#464646] text-xs flex-1'>
                      {item.originDestinationOptions[0].flightSegments[0].cabinClassCode}
                    </p>
                  </div>

                  <div className='flex mt-2 mb-6'>
                    <p className='text-[#8d8d8d] text-xs flex-1'>استرداد</p>
                    <p
                      className={cn(
                        item.refundMethod === 'Offline' && 'text-red-700',
                        'text-[#464646] text-xs flex-1'
                      )}
                    >
                      {item.refundMethod === 'Offline'
                        ? 'غیر قابل استرداد'
                        : 'قابل استرداد'}
                    </p>
                  </div>
                  {/* arrival info */}

                  <div className='flex'>
                    <p className='font-bold text-[#464646] ml-4'>
                      {extractTime(
                        item.originDestinationOptions[0].flightSegments[0].arrivalDateTime
                      )}
                    </p>
                    <p className='text-[#464646]'>
                      {' '}
                      {
                        findCitiesBasedOnAirport(
                          item.originDestinationOptions[0].flightSegments[0]
                            .arrivalAirportLocationCode
                        ).cityFa
                      }{' '}
                      (
                      {
                        findCitiesBasedOnAirport(
                          item.originDestinationOptions[0].flightSegments[0]
                            .arrivalAirportLocationCode
                        ).cityId
                      }
                      )
                    </p>
                  </div>
                  <p className='text-[#464646] mt-2'>
                    {formatJalaaliDate(
                      item.originDestinationOptions[0].flightSegments[0].arrivalDateTime
                    )}{' '}
                    {formatGeorigianDate(
                      item.originDestinationOptions[0].flightSegments[0].arrivalDateTime
                    )}
                  </p>
                  <p className='text-[#8d8d8d] mt-2'>
                    (
                    {
                      findCitiesBasedOnAirport(
                        item.originDestinationOptions[0].flightSegments[0]
                          .arrivalAirportLocationCode
                      ).nameFa
                    }
                    )
                  </p>
                </div>
              </div>
              {/* price box */}
              <div className='flex flex-col border border-[#eeeeee] py-4 px-8 mt-6 mb-4'>
                <div className='flex justify-between'>
                  <p className='text-[#464646]'>2* بزرگسال</p>
                  <p className='text-[#464646]'>{addThousandsSeparator(1370000)} تومان</p>
                </div>
                <div className='flex justify-between mt-2'>
                  <p className='text-[#464646]'>2* کودک</p>
                  <p className='text-[#464646]'>{addThousandsSeparator(1370000)} تومان</p>
                </div>
                <div className='flex justify-between mt-2'>
                  <p className='text-[#464646]'>2* نوزاد</p>
                  <p className='text-[#464646]'>{addThousandsSeparator(1370000)} تومان</p>
                </div>
                <div className='flex justify-between mt-2'>
                  <p className='font-bold text-[#464646]'>مجموع: </p>
                  <p className='text-[#1773dc]'>
                    {addThousandsSeparator(
                      item.airItineraryPricingInfo.itinTotalFare.totalFare
                    )}{' '}
                    تومان
                  </p>
                </div>
              </div>
            </div>
            <div className='p-2 shadow-[0_-5px_8px_0_rgba(0,0,0,0.08)] flex justify-between'>
              <div>
                <p className='text-sm text-[#8d8d8d]'>یک نفر</p>
                <p className='text-[#1773dc]'>
                  <span className='font-bold text-lg'>
                    {addThousandsSeparator(
                      item.airItineraryPricingInfo.itinTotalFare.totalFare
                    )}
                  </span>{' '}
                  <span className='text-[#8d8d8d]'>تومان</span>
                </p>
              </div>
              <Button onClick={selectTicket}>
                <p>انتخاب بلیط</p>
              </Button>
            </div>
          </div>
        </>
      )}
    </Drawer>
  )
}

export default DetailResultMobile
