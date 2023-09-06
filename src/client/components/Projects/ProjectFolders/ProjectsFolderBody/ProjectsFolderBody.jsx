import { useEffect, useState } from 'react'
import NextPrev from '../../../items/NextPrev';
import { Link } from 'react-router-dom';
import CreateFolder from '../../../Modals/CreateFolder';
import { TrashIcon } from "@heroicons/react/24/solid";
import {
    IconButton,
    Tooltip,
    Spinner,
} from "@material-tailwind/react";
import { deleteFolder } from '../../../../../api/foldersService';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';


const ProjectsFolderBody = ({
    dispatch, page, setPage, folderState, folderType,
    open, setOpen, state, getUserFolders }) => {

    const [selectedTool, setSelectedTool] = useState(null);
    const { folders, isLoading, pages } = folderState;


    const removeFolder = async (id) => {
        alert("Are you sure you want to delete this project?")
        await deleteFolder(id, dispatch);
        dispatch({ type: "RESET" })
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
            {folders && folders.length > 0 ? <div className="gridItems">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                    {folders
                        .map((tool, index) => {
                            return (
                                <div
                                    key={index}
                                    // onClick={() => { setOpen(!open); setSelectedTool(tool); }}
                                    className="cursor-pointer flex flex-col bg-white rounded-[10px] border border-gray-100 p-[24px]"
                                >
                                    <div className='flex justify-between'>

                                        {folderType === "chat" && <div className='flex justify-center items-center w-[60px] h-[60px] rounded-full'
                                         style={{background:"rgba(30,36,75, 0.7)"}}>
                                            <MarkUnreadChatAltOutlinedIcon className='text-white' />
                                        </div>}
                                        {folderType === "project" && <div className='flex justify-center items-center w-[60px] h-[60px] rounded-full'
                                         style={{background:"rgba(13,148,136, 0.7)"}}>
                                            <AccountTreeOutlinedIcon className='text-white' />
                                        </div>}
                                        {folderType === "prompt" && <div className='flex justify-center items-center w-[60px] h-[60px] rounded-full'
                                         style={{background:"rgba(202,138,4, 0.7)"}}>
                                            <BookOutlinedIcon className='text-white' />
                                        </div>}
                                        <div className={`flex justify-center`}>
                                            <Tooltip content="delete folder">
                                                <IconButton onClick={() => removeFolder(tool._id)} variant="text" color="blue-gray">
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/folder/${tool._id}`}
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: '1',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                        className="text-[20px] leading-[24px] text-black my-[22px] font-bold hover:text-blue-500">
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
                <NextPrev page={page} setPage={setPage} pages={pages} prompts={folders} />
            </div> : <>
                <div className="flex flex-col items-center justify-center">
                    <img src="/images/icons/saved.png" alt="empty" className="my-4" />
                    <p className="text-[#707070] text-[20px] font-medium">No Folders Created</p>
                </div>
            </>}
            <CreateFolder
                open={open}
                state={state}
                getUserFolders={getUserFolders}
                setOpen={setOpen}
                dispatch={dispatch}
                folderState={folderState}
                tool={selectedTool}
                folderType={folderType}
            />
        </>
    )
}

export default ProjectsFolderBody