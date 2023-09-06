import React, { useContext, useEffect, useReducer, useState } from 'react'
import { UserContext } from '../../App';
import { Helmet } from 'react-helmet-async';
import { fetchUserPrompts } from '../../api/promptService';
import { promptReducer, initialState } from '../../Reducers/promptReducer';
import PromptsHeader from '../components/YourPrompts/Prompts/PromptsHeader/PromptsHeader';
import PromptsBody from '../components/YourPrompts/Prompts/PromptsBody/PromptsBody';
import ProjectsFolderBody from '../components/Projects/ProjectFolders/ProjectsFolderBody/ProjectsFolderBody';
import ProjectsFolderHeader from '../components/Projects/ProjectFolders/ProjectsFolderHeader/ProjectsFolderHeader';
import { fetchUserFolders } from '../../api/foldersService';
import { folderReducer, initialFolderState } from '../../Reducers/folderReducer';


const Prompts = () => {
    const { state } = useContext(UserContext);
    const [promptState, dispatchPrompt] = useReducer(promptReducer, initialState)
    const [folderState, dispatchFolder] = useReducer(folderReducer, initialFolderState)
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [promptPage, setPromptPage] = useState(1);


    const getUserFolders = async () => {
        dispatchFolder({ type: "FETCH_FOLDERS_START" })
        await fetchUserFolders(state.user._id, dispatchFolder, page, "prompt");
    }
    const getUserPrompts = async () => {
        dispatchPrompt({type:"FETCH_USER_PROMPTS_START"})
        await fetchUserPrompts(state.user._id, dispatchPrompt, page);
    }

    useEffect(() => {
        getUserPrompts();
        getUserFolders()
    }, [state.user._id, page])

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);


    return (
        <>
            <Helmet>
                <title>Prompts | AskSophia</title>
            </Helmet>
            <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
            <ProjectsFolderHeader open={open} setOpen={setOpen} />
                <ProjectsFolderBody
                    page={page}
                    open={open}
                    folderType="prompt"
                    state={state}
                    getUserFolders={getUserFolders}
                    setOpen={setOpen}
                    setPage={setPage}
                    dispatch={dispatchFolder}
                    folderState={folderState}
                />
                <div className='border border-b-gray-100 my-12 h-[2px] w-full'></div>
                <PromptsHeader />
                <PromptsBody
                    page={promptPage}
                    setPage={setPromptPage}
                    open={open}
                    setOpen={setOpen}
                    dispatch={dispatchFolder}
                    dispatchPrompt={dispatchPrompt}
                    promptState={promptState}
                    folders={folderState.folders}
                    getUserPrompts={getUserPrompts}
                />
            </section>
        </>
    )
}

export default Prompts