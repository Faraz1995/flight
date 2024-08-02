import React, { useState, useEffect } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

function Drawer({ isOpen, onClose, children, title }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='fixed inset-0 bg-gray-800 bg-opacity-50' onClick={onClose}></div>
      <div className='relative w-full h-full bg-white shadow-xl overflow-y-auto'>
        <div className='flex justify-between py-2 px-4 border-b border-[#eeeeee]'>
          <p className='text-[#464646] font-bold text-lg'>{title}</p>
          <button className='' onClick={onClose}>
            x
          </button>
        </div>
        <div className='overflow-y-auto px-4 mt-8'>{children}</div>
      </div>
    </div>
  )
}

export default Drawer
