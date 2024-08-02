// src/Checkbox.tsx
import React, { ChangeEvent } from 'react'

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange, label }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.checked)
  }

  return (
    <label className='flex items-center space-x-2 cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        className='form-checkbox h-5 w-5 text-[#1773dc] border-gray-300 rounded ml-2'
      />
      <span className='text-gray-700 mr-2'>{label}</span>
    </label>
  )
}

export default Checkbox
