
// const Icon = () => {
//     return (
//         <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M6.22363 9L12.2236 15L18.2236 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//     )
// }


const TemplateHeader = ({ setSortOrder, topic, promptsLength }) => {
    return (
        <div className='flex flex-col lg:flex-row 
        lg:justify-between py-[30px] lg:px-[40px] px-4 mb-[20px] border-b border-gray-100 bg-white'>
            <div className="flex flex-col">
                <h3 className='text-[36px] leading-[40px] font-bold mb-4'>{topic ? topic : 'All Templates'}</h3>
                <p className="w-full font-normal text-[16px] text-gray-400 leading-[24px]">Actually, now that I try out the links on my message, above, none of them take me to the secure site.</p>
                <div className="flex flex-wrap mt-[21px]">
                    <div
                     onClick={() => setSortOrder('new')}
                     className="hover:bg-gray-100 mr-2 flex items-center cursor-pointer py-3 px-6 rounded-full border border-gray-100">
                        <span className="text-black font-semibold text-[16px] mr-2">✨ New</span>
                        {/* <span>
                            <Icon />
                        </span> */}
                    </div>
                    <div onClick={() => setSortOrder('likes')}
                     className="hover:bg-gray-100 flex md:mt-0 mt-2 items-center cursor-pointer py-3 px-6 rounded-full border border-gray-100">
                        <span className="text-black font-semibold text-[16px] mr-2">👍 Upvotes</span>
                        {/* <span>
                            <Icon />
                        </span> */}
                    </div>
                </div>
            </div>
            <div className="flex lg:mt-0 mt-4 items-center">
                <div className="flex items-center justify-center border-r-4 flex-col bg-[#F5F5F5] h-[140px] rounded-tl-[10px] rounded-bl-[10px] px-8">
                    <h4 className="text-[18px] leading-[24px] font-bold">{promptsLength}</h4>
                    <p className="text-[16px] leading-[24px] text-gray-400 font-normal">Prompts</p>
                </div>
                {/* <div className="md:flex hidden border-r-4 border-l-4 border-white items-center justify-center flex-col bg-[#F5F5F5] h-[140px] px-8">
                    <h4 className="text-[18px] leading-[24px] font-bold">180</h4>
                    <p className="text-[16px] leading-[24px] text-gray-400 font-normal">Followers</p>
                </div> */}
                {/* <div className="border-r-4 border-l-4 md:border-0 border-white flex items-center justify-center flex-col bg-[#F5F5F5] h-[140px] rounded-tr-[10px] rounded-br-[10px] px-8">
                    <button className="bg-black text-white px-6 py-3 text-[18px] leading-[24px] font-bold rounded-full">
                        Follow
                    </button>
                </div> */}
            </div>
        </div>
    )
}
export default TemplateHeader