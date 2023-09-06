import { useContext } from "react";
import { UserContext } from "../../../../App";
import moment from "moment"; 

const ChatBodyUser = ({chatItem}) => {
    const {state} = useContext(UserContext);
    const {user}= state;

    return (
    <div className="bg-white border border-gray-100 rounded-[4px] px-4 py-2 mt-4 mx-4">
        <div className="flex justify-between mb-4">
           <div className="flex items-center">
           <img
             className="peer cursor-pointer w-8 h-8 rounded-full object-cover"
             src={`${user.img_url  ? user.img_url : '/images/avatar.png'}`} />
             <span className="font-bold ml-3">{user.username}</span>
           </div>
             <p className="font-normal text-[14px] text-[#969696] leading-[20px]"></p>
        </div>
       <p className="font-medium text-[15px]">{chatItem.content}</p>
    </div>
  )
}

export default ChatBodyUser