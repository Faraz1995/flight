'use client'
import Checkbox from '@/components/Checkbox'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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

const initialStopCheckbox = { no: false, one: false, more: false }
const initialTypeCheckbox = { eco: false, business: false }

function Filters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState<MenuState>({ stop: false, type: false })
  const [stopCheck, setStopCheck] = useState<StopState>(initialStopCheckbox)
  const [typeCheck, setTypeCheck] = useState<TypeState>(initialTypeCheckbox)

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

  return (
    <div className='bg-white py-4 h-full'>
      <div className='py-4  px-3 flex justify-between border-b border-[#eeeeee]'>
        <p className='text-sm'>فیلترها</p>
        <div className='cursor-pointer'>
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
  )
}

export default Filters
