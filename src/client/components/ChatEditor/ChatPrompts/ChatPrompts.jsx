import React from 'react'

const ChatPrompts = ({setPrompt}) => {
  return (
    <div className="mt-[40px]">
    <div className="flex mb-[30px]">
      <img className='mr-4 h-[52px] w-[52px]' src="/images/icons/search.png" alt="search icon" />
      <div className="cursor-pointer flex flex-col border-b border-[#E8E8E8]" onClick={()=>setPrompt("Summarize the latest news on generative Al")}>
        <h4 className='font-bold mb-2 text-[20px] leading-[24px] text-black'>Real-Time Search</h4>
        <p className="text-gray-400 mb-[20px] text-[15px] leading-[20px]">"Summarize the latest news on generative Al" "Write a personalized email to [insert Linkedin profile URL]"</p>
      </div>
    </div>
    <div className="flex mb-[30px]">
      <img className='mr-4 h-[52px] w-[52px]' src="/images/icons/longForm.png" alt="long form icon" />
      <div onClick={()=>setPrompt("Create a blog post about search engine optimization")} className="cursor-pointer flex flex-col border-b border-[#E8E8E8]">
        <h4 className='font-bold mb-2 text-[20px] leading-[24px] text-black'>Long Form Content </h4>
        <p className="text-gray-400 mb-[20px] text-[15px] leading-[20px]">"Create a blog post about search engine optimization" "Write a press release about www.asksophia.com"</p>
      </div>
    </div>
    <div className="flex">
      <img className='mr-4 h-[52px] w-[52px]' src="/images/icons/brain.png" alt="brain icon" />
      <div onClick={()=>setPrompt("Generate 10 Instagram captions for fashion week")} className="cursor-pointer flex flex-col">
        <h4 className='font-bold mb-2 text-[20px] leading-[24px] text-black'>Brainstorm Ideas</h4>
        <p className="text-gray-400 mb-[20px] text-[15px] leading-[20px]">"Generate 10 Instagram captions for fashion week" "Write a product description for a bicycle in the style of Hemingway"</p>
      </div>
    </div>
  </div>
  )
}

export default ChatPrompts