import React from 'react'

const SearchBread = ({ searchText, setSearchText, title }) => {
    return (
        <>
            <div className="flex flex-col mb-[20px]">
                <h3 className="md:text-[36px] md:leading-[40px] text-[20px] font-semibold mb-4">
                    {title}
                </h3>
                <div className="flex flex-col md:flex-row justify-between">
                    <p className="text-[16px] text-gray-800 font-normal leading-[22px]">
                        Automatically generate high-quality content To Try
                    </p>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="py-[9px] px-[12px] mt-4 md:mt-0 w-[340px] outline-0 placeholder::text-[#84818A99] border border-gray-100 rounded-[10px] text-[14px]"
                        placeholder="Search By Title"
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBread