import { useEffect } from "react";
import { fetchAllChats } from "../api/openaiService";

const useChat = (userId, dispatch) => {
    useEffect(()=>{
        const getChats= async () => { await fetchAllChats(dispatch, 1, userId) }
        getChats();
    },[])
}

export default useChat