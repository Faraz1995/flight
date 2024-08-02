// src/Checkbox.tsx
import React, { useState } from 'react'

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label: string
}

function Checkbox({ checked = false, onChange, label }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    if (onChange) onChange(newCheckedState)
  }

  return (
    <div className='flex items-center space-x-2'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
        className='hidden'
        id='custom-checkbox'
      />
      <label
        htmlFor='custom-checkbox'
        className={`w-6 h-6 flex items-center justify-center border rounded-sm cursor-pointer ${
          isChecked ? 'bg-[#1773dc] border-[#1773dc]' : 'border-gray-300'
        }`}
      >
        {isChecked && (
          <svg width='16' height='12' fill='white' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1 6l4 4L15 2'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </label>
      <span className='text-gray-700'>{label}</span>
    </div>
  )
}

export default Checkbox
