import { Helmet } from 'react-helmet-async';
import ProjectsFolderHeader from '../components/Projects/ProjectFolders/ProjectsFolderHeader/ProjectsFolderHeader';
import ProjectsFolderBody from '../components/Projects/ProjectFolders/ProjectsFolderBody/ProjectsFolderBody';
import { initialFolderState, folderReducer } from '../../Reducers/folderReducer';
import { initialProjectState, projectReducer } from '../../Reducers/projectReducer';
import { useEffect, useState, useContext, useReducer } from 'react';
import { fetchUserFolders } from '../../api/foldersService';
import { UserContext } from '../../App';
import ProjectsHeader from '../components/Projects/Projects/ProjectsHeader/ProjectsHeader';
import ProjectsBody from '../components/Projects/Projects/ProjectsBody/ProjectsBody';
import { fetchUserProjects } from '../../api/projectService';



const Projects = () => {
    const { state } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const [folderState, dispatch] = useReducer(folderReducer, initialFolderState);
    const [projectState, dispatchProject] = useReducer(projectReducer, initialProjectState);

    const [page, setPage] = useState(1);
    const [projectPage, setProjectPage] = useState(1);

    const getUserFolders = async () => {
        dispatch({ type: "FETCH_FOLDERS_START" })
        await fetchUserFolders(state.user._id, dispatch, page, "project");
    }
    const getUserProjects = async () => {
        dispatchProject({ type: "FETCH_PROJECTS_START" })
        await fetchUserProjects(state.user._id, dispatchProject, projectPage);
    }

    useEffect(() => {
        getUserFolders();
        getUserProjects();
    }, [state.user._id, page])

    return (
        <>
            <Helmet>
                <title>Projects | AskSophia</title>
            </Helmet>
            <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
                <ProjectsFolderHeader open={open} setOpen={setOpen} />
                <ProjectsFolderBody
                    page={page}
                    open={open}
                    state={state}
                    getUserFolders={getUserFolders}
                    setOpen={setOpen}
                    folderType="project"
                    setPage={setPage}
                    dispatch={dispatch}
                    folderState={folderState}
                />
                <div className='border border-b-gray-100 my-12 h-[2px] w-full'></div>
                <ProjectsHeader />
                <ProjectsBody
                    page={projectPage}
                    setPage={setProjectPage}
                    open={open}
                    setOpen={setOpen}
                    dispatch={dispatch}
                    dispatchProject={dispatchProject}
                    projectState={projectState}
                    folders={folderState.folders}
                    getUserProjects={getUserProjects}
                />
            </section>
        </>
    )
}

export default Projects