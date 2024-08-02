import React, { useState } from 'react'

interface Option {
  key: string
  label: string
}

interface DropdownProps {
  label: string
  options: Option[]
  onSelect: (option: Option) => void
}

function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect(option)
  }

  return (
    <div className='flex items-center rtl:flex rtl:space-x-reverse'>
      {/* Label */}
      <label className='block text-[#8d8d8d] text-sm ml-2'>{label}</label>

      {/* Dropdown */}
      <div className='relative inline-block text-left w-52'>
        {' '}
        {/* Set a fixed width here */}
        <div>
          <button
            type='button'
            className='inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption ? selectedOption.label : 'موردی را انتخاب نمایید'}
            <svg
              className='-mr-1 ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className='origin-top-right absolute right-0 rtl:left-0 mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {options.map((option) => (
                <button
                  key={option.key}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left rtl:text-right'
                  role='menuitem'
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
