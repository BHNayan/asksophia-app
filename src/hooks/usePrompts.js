import { useEffect } from "react";
import { fetchUserPrompts } from "../api/promptService";

const usePrompts = (id, dispatch) => {
    useEffect(()=>{
        const getPrompts= async () => { await fetchUserPrompts(id, dispatch, 1) }
        getPrompts();
    },[])
}

export default usePrompts