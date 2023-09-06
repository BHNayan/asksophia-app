const ChatBodyBot = ({chatItem}) => {

  return (
    <div className="bg-white border border-gray-100 rounded-[4px] px-4 py-2 mt-4 mx-4">
        <div className="flex justify-between mb-4">
           <div className="flex items-center">
           <img
             className="peer cursor-pointer w-8 h-8 rounded-full object-cover"
             src='/images/sophia.png' />
             <span className="font-bold ml-3">Sophia</span>
           </div>
             <p className="font-normal text-[14px] text-[#969696] leading-[20px]"></p>
        </div>
       <pre 
       style={{fontFamily:"Inter", whiteSpace: "pre-wrap"}}
       className="font-medium text-[15px]">{chatItem.content}</pre>
    </div>
  )
}

export default ChatBodyBot