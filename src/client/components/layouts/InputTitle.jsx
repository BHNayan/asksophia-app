import React, { useEffect, useState } from 'react'

const InputTitle = ({toolName, name, handleChange, title}) => {
    const [isDisplay, setIsDisplay] = useState(false);

    useEffect(()=>{
        if(toolName === "Blog Title"  || toolName === "Blog Title - Listicle" 
         || toolName === "Keyword Generator" || toolName === "Audience Refiner"
         || toolName === "Event Copy" || toolName === "Microcopy"
         || toolName === "Question Generator" || toolName === "Confirmation Emails"
         || toolName === "Follow Up Email" || toolName === "Add Emoji To List"
         || toolName === "Bullet Points" || toolName === "Carousel Post"
         || toolName === "Crazy Youtube Ideas" || toolName === "Hashtag Generator"
         || toolName === "Hook Generator"  || toolName === "Instagram Captions"
         || toolName === "Keyword Generator" || toolName === "Relatable Experiences"
         || toolName === "Short Text Hook"  || toolName === "Tiktok Brainstorn Topics"
         || toolName === "YouTube Video Title" || toolName === "Adjective Accelerator"
         || toolName === "Analogy Generator"  || toolName === "Cliffhanger"
         || toolName === "Explain Like I'm 5" || toolName === "Hero Story Infro"
         || toolName === "" || toolName === ""
         || toolName === "" || toolName === ""
         || toolName === "" || toolName === ""
         || toolName === "" || toolName === ""
         ) {
            setIsDisplay(false)
        } else { setIsDisplay(true)}

    }, [toolName])
    
  return (
   <>
   {isDisplay && <div className="mb-6">
    <label className="text-[18px] font-semibold text-black leading-[20px]">
      {title}
    </label>
    <input
      type="text"
      name="name"
      value={name}
      onChange={handleChange}
      placeholder="e.g Facebook"
      className="rounded-[10px] mt-3 w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400"
    />
  </div>}
   </>
  )
}

export default InputTitle