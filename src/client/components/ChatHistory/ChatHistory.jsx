import {useState } from "react";
import {Spinner} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import NextPrev from "../items/NextPrev";
import HistoryCh from "./HistoryCh";
import { isToday, isYesterday, isWithinInterval, endOfYesterday, 
    startOfToday, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';

const ChatHistory = ({chatState, dispatch, dispatchChat, folders, getUserChats}) => {
    const [page, setPage] = useState(1);
    const {chats, isLoading, pages} = chatState;

    const categorizedChats = {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: []
    };

    chats.forEach(chat => {
        const createdAt = new Date(chat.createdAt);
        if (isToday(createdAt)) {
            categorizedChats.today.push(chat);
        } else if (isYesterday(createdAt)) {
            categorizedChats.yesterday.push(chat);
        } else if (isWithinInterval(createdAt, { start: subDays(startOfToday(), 6), end: endOfYesterday() })) {
            categorizedChats.lastWeek.push(chat);
        } else if (isWithinInterval(createdAt, { start: startOfMonth(subMonths(new Date(), 1)), end: endOfMonth(subMonths(new Date(), 1)) })) {
            categorizedChats.lastMonth.push(chat);
        } else {
            categorizedChats.lastMonth.push(chat);
        }
    });
  
    if(isLoading){
        return <>
        <div className="flex flex-col justify-center items-center h-screen">
         <Spinner className="h-12 w-12" />
        </div>
      </>
    }
  return (
    <>
        {chats && chats.length > 0 ? <div className="gridItems">
            <HistoryCh title="Today" chats={categorizedChats.today} 
           dispatch={dispatch} dispatchChat={dispatchChat} folders={folders} getUserChats={getUserChats} />
            <HistoryCh title="Yesterday" chats={categorizedChats.yesterday} 
             dispatch={dispatch} dispatchChat={dispatchChat} folders={folders} getUserChats={getUserChats}/>
            <HistoryCh title="Last Week" chats={categorizedChats.lastWeek} 
             dispatch={dispatch} dispatchChat={dispatchChat} folders={folders} getUserChats={getUserChats} />
            <HistoryCh title="Last Month" chats={categorizedChats.lastMonth} 
          dispatch={dispatch} dispatchChat={dispatchChat} folders={folders} getUserChats={getUserChats} />

            <NextPrev page={page} setPage={setPage} pages={pages} prompts={chats} />
            <div className="relative flex justify-end my-[20px]">
                <Link
                    to="/chat-with-sophia"
                    className="fixed right-8 bottom-4 bg-cyan-400 rounded-full px-4 py-2 text-white"
                >
                    Start new chat
                </Link>
            </div>
        </div> : <>
            <div className="flex flex-col items-center justify-center">
                <img src="/images/icons/saved.png" alt="empty" className="my-4" />
                <p className="text-[#707070] text-[20px] font-medium">History is empty.</p>
            </div>
        </>}
</>
  )
}

export default ChatHistory