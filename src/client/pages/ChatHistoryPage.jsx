import ChatHistory from "../components/ChatHistory/ChatHistory";
import { Helmet } from "react-helmet-async";
import ProjectsFolderHeader from "../components/Projects/ProjectFolders/ProjectsFolderHeader/ProjectsFolderHeader";
import ProjectsFolderBody from "../components/Projects/ProjectFolders/ProjectsFolderBody/ProjectsFolderBody";
import { fetchAllChats } from "../../api/openaiService";
import { folderReducer, initialFolderState } from "../../Reducers/folderReducer";
import { fetchUserFolders } from "../../api/foldersService";
import { chatReducer, initialState } from "../../Reducers/chatReducer";
import { useContext, useState, useReducer, useEffect } from "react";
import { UserContext } from "../../App";

const ChatHistoryPage = () => {
  const { state } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const [folderState, dispatchFolder] = useReducer(folderReducer, initialFolderState);
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  const [page, setPage] = useState(1);
  const [chatPage, setChatPage] = useState(1);

  const getUserFolders = async () => {
    dispatchFolder({ type: "FETCH_FOLDERS_START" })
    await fetchUserFolders(state.user._id, dispatchFolder, page, "chat");
  }
  const getUserChats = async () => {
    dispatch({ type: "FETCH_CHATS_START" })
    await fetchAllChats(dispatch, chatPage, state.user._id);
  }

  useEffect(() => {
    getUserFolders();
    getUserChats();
  }, [state.user._id, page])

  return (
    <>
      <Helmet>
        <title>Chat History | AskSophia</title>
      </Helmet>
      <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
        <ProjectsFolderHeader open={open} setOpen={setOpen} />
        <ProjectsFolderBody
          page={page}
          open={open}
          folderType="chat"
          state={state}
          getUserFolders={getUserFolders}
          setOpen={setOpen}
          setPage={setPage}
          dispatch={dispatchFolder}
          folderState={folderState}
        />
        <div className='border border-b-gray-100 my-12 h-[2px] w-full'></div>
        <div className="flex flex-col mb-[20px]">
          <h3 className="text-[28px] leading-[40px] font-semibold mb-4">
            Chat History
          </h3>
        </div>
        <ChatHistory 
        chatState={chatState}
         dispatch={dispatchFolder} 
         dispatchChat={dispatch}
         folders={folderState.folders}
         getUserChats={getUserChats} />
      </section>
    </>
  )
}

export default ChatHistoryPage