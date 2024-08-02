import React, { useState } from 'react'

interface BottomDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`z-10 fixed bottom-0 left-0 right-0 bg-white transition-transform transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ transition: 'transform 0.3s ease-in-out' }}
      >
        <div className='p-4'>
          <div className='flex justify-end'>
            <button onClick={onClose} className='text-gray-500 hover:text-gray-800'>
              x
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default BottomDrawer
