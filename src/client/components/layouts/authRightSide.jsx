import React from 'react'
import { Link } from 'react-router-dom'

const AuthRightSide = ({text, url, btn}) => {
  return (
    <div className="lg:flex flex-col justify-between hidden m-4 rounded-[20px] bg-[url('images/bg.png')]"
    style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
     <div></div>
     <div>
       <h1 className="font-bold mb-[62px] text-[64px] leading-[78px] text-white px-4">
         Welcome to AskSophia
       </h1>
       <div className="bg-[#171721] flex justify-between rounded-b-[20px] p-4 items-center">
         <p className="text-white text-[14px] leading-[20px] font-normal">
           {text}
         </p>
         <Link
           to={url}
           className="px-4 py-2 bg-[#3E7EFF] rounded-md text-white text-[12px] leading-[20px]"
         >
           {btn}
         </Link>
       </div>
     </div>
   </div>
  )
}

export default AuthRightSide