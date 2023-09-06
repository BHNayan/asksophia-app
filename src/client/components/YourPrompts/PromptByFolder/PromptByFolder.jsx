import { useParams } from "react-router-dom";
import { getProjectsByFolderId, removeToolFromFolder } from "../../../../api/foldersService";
import { useEffect, useReducer } from "react";
import { folderReducer, initialFolderState } from "../../../../Reducers/folderReducer";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
    IconButton,
    Tooltip,
    Spinner,
} from "@material-tailwind/react";

const PromptByFolder = () => {

    const {folderId} = useParams();
    const [folderState, dispatch] = useReducer(folderReducer, initialFolderState);
    const {projects, isLoading} = folderState;
    
    const getProjects = async ()=>{
        dispatch({ type: "FETCH_FOLDERS_START" });
        await getProjectsByFolderId(folderId, dispatch);
        dispatch({ type: "RESET" });
    }

    const deleteToolFromFolder = async (toolId)=>{
        await removeToolFromFolder(folderId, toolId, dispatch);
        dispatch({ type: "RESET" });
    }

    useEffect(()=>{
        getProjects();
    },[folderId]);

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
            {projects && projects.length > 0 ? <div className="gridItems">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                    {projects
                        .map((tool, index) => {
                            return (
                                <div
                                    key={index}
                                    // onClick={() => { setOpen(!open); setSelectedTool(tool); }}
                                    className="cursor-pointer flex flex-col bg-white rounded-[10px] border border-gray-100 p-[24px]"
                                >
                                    <div className='flex justify-between'>
                                        <img
                                            className="w-[60px]"
                                            src="/images/blog.png"
                                            alt="blog icon"
                                        />
                                        <div className={`flex justify-center`}>
                                            <Tooltip content="delete folder">
                                                <IconButton 
                                                onClick={() => deleteToolFromFolder(tool._id)}
                                                 variant="text" color="blue-gray">
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
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
                                        {tool.title}
                                    </h3>
                                    <p
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: '2',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: tool.response }}
                                        className="text-[#84818A] leading-[20px] text-[15px]">
                                    </p>
                                </div>
                            );
                        })}
                </div>
                {/* <NextPrev page={page} setPage={setPage} pages={pages} prompts={folders} /> */}
            </div> : <>
                <div className="h-full flex flex-col items-center justify-center">
                    <img src="/images/icons/saved.png" alt="empty" className="my-4" />
                    <p className="text-[#707070] text-[20px] font-medium">No Prompts added to This Folder.</p>
                </div>
            </>}
            </section>
        </>
    )
}

export default PromptByFolder