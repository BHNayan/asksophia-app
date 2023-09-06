import { useEffect } from "react";
import { fetchUserProjects } from "../api/projectService";

const useProjects = (id, dispatchProject) => {
    useEffect(()=>{
        const getProjects = async () => { await fetchUserProjects(id, dispatchProject, 1) }
        getProjects();
    },[])
}

export default useProjects