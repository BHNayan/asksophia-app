import {
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddToFolder from "../Modals/AddToFolder";
import { useEffect, useRef, useState } from "react";
import ChatDropdown from "./ChatDropdown";
import { deleteChat } from "../../../api/openaiService";
import { toast } from "react-toastify";
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';


const HistoryCh = ({ chats, title, dispatch, dispatchChat, getUserChats, folders }) => {
    const [openDrop, setOpenDrop] = useState(null);
    const [add, setAdd] = useState(false);
    const [toolId, setToolId] = useState("");
    const dropdownRef = useRef(null);

    const handleOpen = (id) => { 
        setToolId(id);
        setOpenDrop(prev => prev === id ? null : id)
    }

    useEffect(() => {
        function handleDocumentClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDrop(null);
            }
        }
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    const removeChat = async (id)=>{
        alert("Are you sure you want to delete this project?")
        await deleteChat(id, dispatchChat);
        dispatchChat({ type: "RESET" })
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);


    return (
        <>
            {chats && chats.length > 0 && <div className="gridItems">
                <h3 className="my-2 text-[14px] text-gray-700">{title}</h3>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {chats
                        .map((chat, index) => {
                            return (
                                <div key={index}
                                    className="cursor-pointer flex flex-col bg-white rounded-[10px] border border-gray-100 p-[24px]">
                                    <div className='flex justify-between relative'>
                                    <div className='flex justify-center items-center w-[60px] h-[60px] rounded-full'
                                         style={{background:"rgba(30,36,75, 0.7)"}}>
                                            <MarkUnreadChatAltOutlinedIcon className='text-white' />
                                        </div>
                                        <div className={`flex justify-center`}>
                                            <Tooltip content="View">
                                                <Link to={`/chat-with-sophia/${chat._id}`}>
                                                    <IconButton variant="text" color="blue-gray">
                                                        <VisibilityOutlinedIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="options">
                                                <IconButton onClick={() => handleOpen(chat._id)}
                                                    variant="text" color="blue-gray">
                                                    <MoreVertOutlinedIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <div ref={dropdownRef}>
                                                <ChatDropdown
                                                    id={chat._id}
                                                    setAdd={setAdd}
                                                    folders={folders.length}
                                                    openDrop={openDrop === chat._id}
                                                    removeChat={removeChat}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h3
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: '1',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                        className="text-[20px] leading-[24px] text-black my-[22px] font-bold">
                                        {chat.title}
                                    </h3>
                                    {/* <input
                                    type="text"
                                    value={chat.title}
                                    className="rounded-[10px] mt-3 w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400"
                                    /> */}
                                </div>
                            );
                        })}
                </div>
            </div>}
            <AddToFolder
                dispatch={dispatch}
                open={add}
                setOpen={setAdd}
                folders={folders}
                getUserProjects={getUserChats}
                toolId={toolId} />
        </>
    )
}

export default HistoryCh