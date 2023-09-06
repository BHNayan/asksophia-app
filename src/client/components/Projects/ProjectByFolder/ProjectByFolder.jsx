import { useParams } from "react-router-dom";
import { getProjectsByFolderId, removeToolFromFolder } from "../../../../api/foldersService";
import { useEffect, useReducer } from "react";
import { folderReducer, initialFolderState } from "../../../../Reducers/folderReducer";
import { isToday, isYesterday, isWithinInterval, endOfYesterday, startOfToday, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';

import { Spinner } from "@material-tailwind/react";
import FolderToolsTemplate from "./FolderToolsTemplate";

const ProjectByFolder = () => {

    const { folderId } = useParams();
    const [folderState, dispatch] = useReducer(folderReducer, initialFolderState);
    const { projects, isLoading } = folderState;
    const categorizedProjects = {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
    };

        projects.forEach(project => {
          const createdAt = new Date(project.createdAt);
          
          if (isToday(createdAt)) {
            categorizedProjects.today.push(project);
          } else if (isYesterday(createdAt)) {
            categorizedProjects.yesterday.push(project);
          } else if (isWithinInterval(createdAt, { start: subDays(startOfToday(), 6), end: endOfYesterday() })) {
            categorizedProjects.lastWeek.push(project);
          } else if (isWithinInterval(createdAt, { start: startOfMonth(subMonths(new Date(), 1)), end: endOfMonth(subMonths(new Date(), 1)) })) {
            categorizedProjects.lastMonth.push(project);
          } else {
            categorizedProjects.lastMonth.push(project);
            console.log(categorizedProjects.lastMonth)
          }
        });

    const getProjects = async () => {
        dispatch({ type: "FETCH_FOLDERS_START" });
        await getProjectsByFolderId(folderId, dispatch);
        dispatch({ type: "RESET" });
    }

    const deleteToolFromFolder = async (toolId) => {
        alert("are you sure you want to delete this prompt from this folder?");
        await removeToolFromFolder(folderId, toolId, dispatch);
        dispatch({ type: "RESET" });
    }

    useEffect(() => {
        getProjects();
    }, [folderId]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    if (isLoading) {
        return <>
            <div className="flex flex-col justify-center items-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        </>
    }

    return (
        <>
            <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
                {projects && projects.length > 0 ?
                    <>
                        <FolderToolsTemplate title="Today" projects={categorizedProjects.today} deleteToolFromFolder={deleteToolFromFolder} />
                        <FolderToolsTemplate title="Yesterday" projects={categorizedProjects.yesterday} deleteToolFromFolder={deleteToolFromFolder} />
                        <FolderToolsTemplate title="Last Week" projects={categorizedProjects.lastWeek} deleteToolFromFolder={deleteToolFromFolder} />
                        <FolderToolsTemplate title="Last Month" projects={categorizedProjects.lastMonth} deleteToolFromFolder={deleteToolFromFolder} />
                    </> 
                    : <>
                        <div className="h-full flex flex-col items-center justify-center">
                            <img src="/images/icons/saved.png" alt="empty" className="my-4" />
                            <p className="text-[#707070] text-[20px] font-medium">No Projects added to This Folder.</p>
                        </div>
                    </>}
            </section>
        </>
    )
}

export default ProjectByFolder