import React from 'react'

const ChatIsLoading = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-[4px] px-4 py-2 mt-4 mx-4">
    <div className="flex justify-between mb-4">
       <div className="flex items-center">
       <img
         className="peer cursor-pointer w-8 h-8 rounded-full object-cover"
         src='/images/sophia.png' />
         <span className="font-bold ml-3">Sophia</span>
       </div>
    </div>
   <p className="font-medium text-[17px] text-gray-700">Sophia is typing ...</p>
</div>
  )
}

export default ChatIsLoading