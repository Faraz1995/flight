import React from 'react'

// Define the props interface
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

// Create the Button component
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className='bg-[#1773dc] rounded py-2 px-6 text-white' onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
