'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  addThousandsSeparator,
  cn,
  extractTime,
  formatGeorigianDate,
  formatJalaaliDate,
  humanizeDurationTime
} from '@/util'
import Button from './Button'

type Props = {
  item: any
  airports: any[]
  airlines: any[]
}

function ResultCardDesktop({ item, airports, airlines }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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

  const clickHandler = () => {}

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='bg-white p-4 mb-4'>
      <div className='flex items-center'>
        <div className='flex items-center ml-4'>
          <Image src={'/assets/png/mahan.png'} alt='mahan' width={30} height={30} />
          <p className='text-sm text-[#464646] mr-4'>
            {findAirline(item.validatingAirlineCode).nameFa}
          </p>
        </div>
        <div className='flex mt-4 flex-1 px-8'>
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
          <div className='w-full px-4 flex flex-col items-center'>
            <p className='text-center text-xs text-[#6f6f6f]'>
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
          <div className='relative'>
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
            <p className='text-[#ff1d23] text-xs absolute top-0 left-0'>1+</p>
          </div>
        </div>
        {/* end of hour box */}
        <div className='flex flex-col items-center border-r px-4 pb-4 space-y-2'>
          <p className='text-[#8d8d8d] text-xs'>یک نفر</p>
          <p>
            <span className='text-[#1773dc] text-xl'>
              {addThousandsSeparator(
                item.airItineraryPricingInfo.itinTotalFare.totalFare
              )}
            </span>
            <span className='text-[#8d8d8d] text-xs mr-1'>تومان</span>
          </p>

          <div>
            <Button onClick={clickHandler}>
              <p>انتخاب بلیط</p>
            </Button>
          </div>
        </div>
      </div>
      <div className='border-t border-[#eeeeee] flex justify-between py-1'>
        <div className='flex items-center space-x-6'>
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
        </div>
        <div className='flex items-center cursor-pointer' onClick={toggleCollapse}>
          <p className='text-[#ff7913] text-xs ml-1'>جزئیات بیشتر</p>
          <Image
            className={cn(isOpen && 'rotate-180')}
            src={'/assets/svg/arrow_down.svg'}
            alt='arrow'
            width={10}
            height={10}
          />
        </div>
      </div>
      {/* end of flight info div */}
      <div
        className={`overflow-hidden transition-[max-height] duration-400 ease-in ${
          isOpen ? 'max-h-full' : 'max-h-0'
        }`}
      >
        <div>
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
              <p className='mt-5 font-bold'>
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
              <div className='flex mt-6'>
                <div className='flex flex-col'>
                  <Image
                    src={'/assets/png/mahan.png'}
                    alt='mahan'
                    width={40}
                    height={35}
                  />
                  <p className='xs text-[#6f6f6f]'>
                    {findAirline(item.validatingAirlineCode).nameFa}
                  </p>
                </div>
                <div className='flex flex-col items-center mx-4'>
                  <div className='w-2 h-2 border border-[#870b1d] rounded-full'></div>
                  <div className='border-l border-dashed border-[#b8b8b8] h-full py-1'></div>
                  <div className='w-2 h-2 border border-[#870b1d] rounded-full'></div>
                </div>
                <div>
                  <div className='flex space-x-4'>
                    <p className='font-bold text-[#464646] ml-4'>
                      {extractTime(
                        item.originDestinationOptions[0].flightSegments[0]
                          .departureDateTime
                      )}
                    </p>
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
                    <div className='border-l border-[#dadada]' />
                    <p className='text-[#464646]'>
                      {formatJalaaliDate(
                        item.originDestinationOptions[0].flightSegments[0]
                          .departureDateTime
                      )}{' '}
                      {formatGeorigianDate(
                        item.originDestinationOptions[0].flightSegments[0]
                          .departureDateTime
                      )}
                    </p>
                    <div className='border-l border-[#dadada]' />
                    <p className='text-[#8d8d8d]'>
                      {
                        findCitiesBasedOnAirport(
                          item.originDestinationOptions[0].flightSegments[0]
                            .departureAirportLocationCode
                        ).nameFa
                      }
                    </p>
                  </div>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='flex col-start-1 col-end-1 mt-6'>
                      <p className='text-[#8d8d8d] text-xs'>مدت پرواز</p>
                      <p className='text-[#464646] text-xs mr-2'>
                        {' '}
                        {humanizeDurationTime(
                          item.originDestinationOptions[0].flightSegments[0]
                            .journeyDuration
                        )}
                      </p>
                    </div>
                    <div className='flex col-start-2 col-end-2 mt-6'>
                      <p className='text-[#8d8d8d] text-xs'>نوع پرواز</p>
                      <p className='text-[#464646] text-xs mr-2'>سیستمی</p>
                    </div>
                    <div className='flex col-start-3 col-end-3 mt-6'>
                      <p className='text-[#8d8d8d] text-xs'>استرداد</p>
                      <p
                        className={cn(
                          item.refundMethod === 'Offline' && 'text-red-700',
                          'text-[#464646] text-xs mr-2'
                        )}
                      >
                        {item.refundMethod === 'Offline'
                          ? 'غیر قابل استرداد'
                          : 'قابل استرداد'}
                      </p>
                    </div>

                    <div className='flex col-span-1'>
                      <p className='text-[#8d8d8d] text-xs'>نوع هواپیما</p>
                      <p className='text-[#464646] text-xs mr-2'>
                        {
                          item.originDestinationOptions[0].flightSegments[0]
                            .operatingAirline.equipment
                        }
                      </p>
                    </div>

                    <div className='flex col-span-2'>
                      <p className='text-[#8d8d8d] text-xs'>بار مجاز</p>
                      <p className='text-[#464646] text-xs mr-2'>
                        {item.originDestinationOptions[0].flightSegments[0].baggage}
                      </p>
                    </div>

                    <div className='flex col-span-1'>
                      <p className='text-[#8d8d8d] text-xs'>کلاس پرواز</p>
                      <p className='text-[#464646] text-xs mr-2'>اکونومی</p>
                    </div>

                    <div className='flex col-span-2 mb-6 '>
                      <p className='text-[#8d8d8d] text-xs'>کلاس نرخی</p>
                      <p className='text-[#464646] text-xs mr-2'>
                        {
                          item.originDestinationOptions[0].flightSegments[0]
                            .cabinClassCode
                        }
                      </p>
                    </div>
                  </div>
                  <div className='flex space-x-4'>
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
                    <div className='border-l border-[#dadada]' />
                    <p className='text-[#464646]'>
                      {formatJalaaliDate(
                        item.originDestinationOptions[0].flightSegments[0].arrivalDateTime
                      )}{' '}
                      {formatGeorigianDate(
                        item.originDestinationOptions[0].flightSegments[0].arrivalDateTime
                      )}
                    </p>
                    <div className='border-l border-[#dadada]' />
                    <p className='text-[#8d8d8d]'>
                      {
                        findCitiesBasedOnAirport(
                          item.originDestinationOptions[0].flightSegments[0]
                            .arrivalAirportLocationCode
                        ).nameFa
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className='px-7 mt-8 border border-[#eeeeee] flex'>
                <div className='py-3 px-2 border-l border-[#eeeeee] flex text-sm'>
                  <p className='text-[#464646]'>2 × بزرگسال</p>
                  <p className='text-[#464646] mr-2'>
                    {addThousandsSeparator(1370000)} تومان
                  </p>
                </div>
                <div className='py-3 px-2 border-l border-[#eeeeee] flex'>
                  <p className='text-sm text-[#464646]'>2 × کودک</p>
                  <p className='text-sm text-[#464646] mr-2'>
                    {addThousandsSeparator(1370000)} تومان
                  </p>
                </div>

                <div className='py-3 px-2 border-l border-[#eeeeee] flex'>
                  <p className='text-sm text-[#464646]'>2 × نوزاد</p>
                  <p className=' text-sm text-[#464646] mr-2'>
                    {addThousandsSeparator(1370000)} تومان
                  </p>
                </div>

                <div className='py-3 mr-2 flex'>
                  <p className='text-sm text-[#464646]'>مجموع: </p>
                  <p className='text-sm text-[#1773dc] mr-2'>
                    {addThousandsSeparator(
                      item.airItineraryPricingInfo.itinTotalFare.totalFare
                    )}{' '}
                    تومان
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultCardDesktop
