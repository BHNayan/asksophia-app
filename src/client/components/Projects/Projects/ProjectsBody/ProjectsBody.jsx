import { useEffect, useState, useRef } from 'react'
import NextPrev from '../../../items/NextPrev';
import { Link } from 'react-router-dom';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
    IconButton,
    Tooltip,
    Spinner,
} from "@material-tailwind/react";
import { deleteProject } from '../../../../../api/projectService';
import DropDown from '../ProjectsDropDown/DropDown';
import AddToFolder from '../../../Modals/AddToFolder';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';



const ProjectsBody = ({ dispatch,dispatchProject, page, setPage, projectState, folders, getUserProjects}) => {

    const { projects, isLoading, pages } = projectState;
    const [openDrop, setOpenDrop] = useState(null);
    const [add, setAdd] = useState(false);
    const [toolId, setToolId]=useState("");
    const dropdownRef = useRef(null);

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

    const handleOpen = (id) =>{
        setToolId(id);
        setOpenDrop(prev => prev === id ? null : id);
    }

    const removeProject = async (id) => {
        alert("Are you sure you want to delete this project?")
        await deleteProject(id, dispatchProject);
        await getUserProjects();
        dispatchProject({ type: "RESET" })
    }

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
            {projects && projects.length > 0 ? <div className="gridItems">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                    {projects
                        .map((tool, index) => {
                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer flex flex-col bg-white rounded-[10px] border border-gray-100 p-[24px]"
                                >
                                    <div className='flex justify-between relative'>
                                    <div className='flex justify-center items-center w-[60px] h-[60px] rounded-full'
                                         style={{background:"rgba(13,148,136, 0.7)"}}>
                                            <AccountTreeOutlinedIcon className='text-white' />
                                        </div>
                                        <div className={`flex justify-center`}>
                                            <Tooltip content="delete folder">
                                                <IconButton onClick={() => handleOpen(tool._id)}
                                                    variant="text" color="blue-gray">
                                                    <MoreVertOutlinedIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <div ref={dropdownRef}>
                                                <DropDown
                                                    id={tool._id}
                                                    setAdd={setAdd}
                                                    folders={folders.length}
                                                    openDrop={openDrop === tool._id}
                                                    removeProject={removeProject}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to={`${tool.url ? tool.url : '/chat/'+tool._id}`}
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: '1',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                        className="text-[20px] leading-[24px] text-black my-[22px] font-bold">
                                        {tool.title}
                                    </Link>
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
                <NextPrev page={page} setPage={setPage} pages={pages} prompts={projects} />
                <div className="relative flex justify-end">
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
                    <p className="text-[#707070] text-[20px] font-medium">No Projects Found</p>
                </div>
            </>}
        <AddToFolder 
         dispatch={dispatch}
         open={add}
         setOpen={setAdd} 
         folders={folders} 
         getUserProjects={getUserProjects}
         toolId={toolId} />
        </>
    )
}

export default ProjectsBody