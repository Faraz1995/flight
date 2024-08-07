'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import BottomDrawer from '@/components/BottomDrawer'
import Checkbox from '@/components/Checkbox'
import useWindowWidth from '@/hooks/useWidth'

interface MenuState {
  stop: boolean
  type: boolean
  [key: string]: boolean
}

interface StopState {
  no: boolean
  one: boolean
  more: boolean
  [key: string]: boolean
}

interface TypeState {
  eco: boolean
  business: boolean
  [key: string]: boolean
}
const maxMinutes = 60
const initialStopCheckbox = { no: false, one: false, more: false }
const initialTypeCheckbox = { eco: false, business: false }

function Filters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState<MenuState>({ stop: false, type: false })
  const [stopCheck, setStopCheck] = useState<StopState>(initialStopCheckbox)
  const [typeCheck, setTypeCheck] = useState<TypeState>(initialTypeCheckbox)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false)

  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    const updateMinutes = () => {
      setMinutes((prevMinutes) => (prevMinutes + 1) % 61)
    }

    const intervalId = setInterval(updateMinutes, 60000) // 60000 ms = 1 minute

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const updateSeconds = () => {
      setSeconds((prev) => (prev + 1) % 61)
    }

    const intervalId = setInterval(updateSeconds, 1000) // 60000 ms = 1 minute

    return () => clearInterval(intervalId)
  }, [])

  const windowWidth = useWindowWidth()

  const handleStopCheckBox = (name: string, value: boolean) => {
    const params = new URLSearchParams(searchParams)
    setStopCheck((prev) => {
      return {
        ...initialStopCheckbox,
        [name]: !prev[name]
      }
    })
    if (value) {
      params.set('stop', name)
    } else {
      params.delete('stop')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleTypeCheckBox = (name: string, value: boolean) => {
    const params = new URLSearchParams(searchParams)

    setTypeCheck((prev) => {
      return {
        ...initialTypeCheckbox,
        [name]: !prev[name]
      }
    })

    if (value) {
      params.set('type', name)
    } else {
      params.delete('type')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const toggleMenu = (menu: string) => {
    setIsMenuOpen((prev) => {
      return {
        ...prev,
        [menu]: !prev[menu]
      }
    })
  }

  const removeFilters = () => {
    replace(`${pathname}`)
    setStopCheck(initialStopCheckbox)
    setTypeCheck(initialTypeCheckbox)
  }

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen((prev) => !prev)
  }

  const toggleSortDrawer = () => {
    setSortDrawerOpen((prev) => !prev)
  }

  const sortHandler = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      {windowWidth > 1000 && (
        <div className='flex justify-between mb-6'>
          <p>مدت زمان اعتبار نتایج</p>
          <div className='flex items-center'>
            <p className='text-sm ml-2'>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>

            <div className='w-5 h-5'>
              <CircularProgressbar
                strokeWidth={4}
                maxValue={60}
                styles={buildStyles({
                  pathColor: '#1773dc'
                })}
                value={minutes}
              />
            </div>
          </div>
        </div>
      )}
      {windowWidth > 1000 ? (
        <div className='bg-white  h-full'>
          <div className='py-4  px-3 flex justify-between border-b border-[#eeeeee]'>
            <p className='text-sm'>فیلترها</p>
            <div onClick={removeFilters} className='cursor-pointer'>
              <p className=' text-sm text-[#1773dc]'>حذف فیلترها</p>
            </div>
          </div>
          <div className='border-b border-[#eeeeee]'>
            <div
              className='px-2 py-1 flex justify-between cursor-pointer '
              onClick={() => toggleMenu('stop')}
            >
              <p>تعداد توقف</p>
              <span
                className={`transform transition-transform duration-300 ${
                  isMenuOpen['stop'] ? 'rotate-180' : 'rotate-0'
                }`}
              >
                &#9660;
              </span>
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-400 ease-in ${
                isMenuOpen['stop'] ? 'max-h-full' : 'max-h-0'
              }`}
            >
              <div className='p-2'>
                <div className='mb-2'>
                  <Checkbox
                    checked={stopCheck['no']}
                    onChange={(value) => handleStopCheckBox('no', value)}
                    label='بدون توقف'
                  />
                </div>
                <div className='mb-2'>
                  <Checkbox
                    checked={stopCheck['one']}
                    onChange={(value) => handleStopCheckBox('one', value)}
                    label='یک توقف'
                  />
                </div>

                <Checkbox
                  checked={stopCheck['more']}
                  onChange={(value) => handleStopCheckBox('more', value)}
                  label='بیش از ۲ توقف'
                />
              </div>
            </div>
          </div>

          <div className='border-b border-[#eeeeee]'>
            <div
              className='px-2 py-1 flex justify-between cursor-pointer '
              onClick={() => toggleMenu('type')}
            >
              <p>کلاس پرواز</p>
              <span
                className={`transform transition-transform duration-300 ${
                  isMenuOpen['type'] ? 'rotate-180' : 'rotate-0'
                }`}
              >
                &#9660;
              </span>
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-400 ease-in ${
                isMenuOpen['type'] ? 'max-h-full' : 'max-h-0'
              }`}
            >
              <div className='p-2'>
                <div className='mb-2'>
                  <Checkbox
                    checked={typeCheck['eco']}
                    onChange={(value) => handleTypeCheckBox('eco', value)}
                    label='اکونومی'
                  />
                </div>
                <Checkbox
                  checked={typeCheck['business']}
                  onChange={(value) => handleTypeCheckBox('business', value)}
                  label='بیزینس'
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-between mb-4'>
          <div
            className='bg-white w-[160px] flex items-center justify-center py-3 px-10 rounded-md text-[#161616] cursor-pointer'
            onClick={toggleFilterDrawer}
          >
            <Image src={'/assets/svg/filter.svg'} alt='filter' width={16} height={16} />
            <p>فیلتر</p>
          </div>

          <div
            className='bg-white w-[160px] flex items-center justify-center py-3 px-6 rounded-md text-[#161616] cursor-pointer'
            onClick={toggleSortDrawer}
          >
            <Image src={'/assets/svg/sort.svg'} alt='filter' width={16} height={16} />
            <p>مرتب سازی</p>
          </div>
        </div>
      )}
      <BottomDrawer isOpen={filterDrawerOpen} onClose={toggleFilterDrawer}>
        <div className='flex'>
          <div className=' flex-1 border-l border-[#eeeeee]'>
            <div
              className='px-2 py-1 flex justify-between cursor-pointer '
              onClick={() => toggleMenu('stop')}
            >
              <p>تعداد توقف</p>
            </div>

            <div className='p-2'>
              <div className='mb-2'>
                <Checkbox
                  checked={stopCheck['no']}
                  onChange={(value) => handleStopCheckBox('no', value)}
                  label='بدون توقف'
                />
              </div>
              <div className='mb-2'>
                <Checkbox
                  checked={stopCheck['one']}
                  onChange={(value) => handleStopCheckBox('one', value)}
                  label='یک توقف'
                />
              </div>

              <Checkbox
                checked={stopCheck['more']}
                onChange={(value) => handleStopCheckBox('more', value)}
                label='بیش از ۲ توقف'
              />
            </div>
          </div>
          <div className='flex-1'>
            <div
              className='px-2 py-1 flex justify-between cursor-pointer '
              onClick={() => toggleMenu('type')}
            >
              <p>کلاس پرواز</p>
            </div>

            <div className='p-2'>
              <div className='mb-2'>
                <Checkbox
                  checked={typeCheck['eco']}
                  onChange={(value) => handleTypeCheckBox('eco', value)}
                  label='اکونومی'
                />
              </div>
              <Checkbox
                checked={typeCheck['business']}
                onChange={(value) => handleTypeCheckBox('business', value)}
                label='بیزینس'
              />
            </div>
          </div>
        </div>
      </BottomDrawer>

      <BottomDrawer isOpen={sortDrawerOpen} onClose={toggleSortDrawer}>
        <div className='flex flex-col'>
          <p className='font-bold'>مرتب سازی بر اساس</p>
          <p className='my-4 cursor-pointer' onClick={() => sortHandler('price')}>
            قیمت
          </p>
          <p className='cursor-pointer' onClick={() => sortHandler('date')}>
            تاریخ
          </p>
        </div>
      </BottomDrawer>
    </>
  )
}

export default Filters
