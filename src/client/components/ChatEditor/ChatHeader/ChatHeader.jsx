import React from 'react'

const ChatHeader = () => {
  return (
    <div className='py-2 md:py-0'>
    <h3 className='text-[36px] leading-[40px] font-bold mb-[20px]'>Welcome to Ask Sophia</h3>
    <div className='flex items-center rounded-[15px] bg-[#E1E8EF] px-4'>
      <p className='md:text-[16px] text-[13px] leading-[20px] text-gray-800'>Get started by writing a task and Chat can do the rest. Not sure where to start? Check out the Prompt Library for inspiration.</p>
      <img src='/images/sophia_longhair.png' alt="sophia" />
    </div>
  </div>
  )
}

export default ChatHeader