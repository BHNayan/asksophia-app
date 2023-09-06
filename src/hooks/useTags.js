import { useEffect } from "react";
import { fetchAllTags } from "../api/tagsService";

const useTags = (dispatchTag) => {
    useEffect(()=>{
        const getTags = async () => { await fetchAllTags(dispatchTag) }
        getTags();
    },[dispatchTag])
}

export default useTags