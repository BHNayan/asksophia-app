import { useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import SidebarTools from "./Sidebar/SidebarTools";
import { initialProjectState, projectReducer } from "../../../Reducers/projectReducer";
import SidebarProjects from "./Sidebar/SidebarProjects";
import useProjects from "../../../hooks/useProjects";
import { initialState, promptReducer } from "../../../Reducers/promptReducer";
import usePrompts from "../../../hooks/usePrompts";
import SidebarPrompts from "./Sidebar/SidebarPrompts";
import SidebarChats from "./Sidebar/SidebarChats";
import { chatReducer } from "../../../Reducers/chatReducer";
import useChat from "../../../hooks/useChat";
import Tour from 'reactour';
// import 'reactour/dist/reactour.css';


const Sidebar = ({ openSidebar }) => {
    const { state } = useContext(UserContext);
    const [projectState, dispatchProject] = useReducer(projectReducer, initialProjectState);
    const [promptState, dispatchPrompt] = useReducer(promptReducer, initialState);
    const steps = [
        {
          selector: '.step-one',
          content: 'This is my first Step',
        },
        {
          selector: '.step-two',
          content: 'This is my second Step',
        },
      ];
    const [chatState, dispatchChat] = useReducer(chatReducer, {
        chats: [],
        chat: null,
        pages: 0,
        user: state.user ? state.user : null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        search: '',
        message: ""
    });

    const { projects } = projectState;
    const { prompts } = promptState;
    const { chats } = chatState;
    useProjects(state.user._id, dispatchProject);
    usePrompts(state.user._id, dispatchPrompt);
    useChat(state.user._id, dispatchChat);

    return (
        <div className={`${openSidebar ? 'open' : ''} 
            sidebar transition z-[12] w-[288px] bg-cyan-900 
            text-white fixed px-[24px] flex flex-col h-screen overflow-y-auto`}>
            <Link to="/chat" className="flex items-center h-[94px] border-b p-3 border-[#2C3257]">
                <img className="w-[150px]" src="/images/white.png" alt="asksophia" />
            </Link>
            {/* <Tour
                steps={steps}
                isOpen={true}
                onRequestClose={false} /> */}
            {state.user &&
                <>
                    <div className="mt-[30px]">
                        <div className="step-one">
                            <SidebarChats chats={chats} />
                        </div>
                        <div className="step-two">
                            <SidebarProjects projects={projects} />
                        </div>
                        <SidebarPrompts prompts={prompts} />
                    </div>
                    {state.user.plan === "premium" && <>
                        <h3 className="my-[20px] text-[18px] font-semibold leading-[24px]">Teams</h3>
                        <div className="flex flex-col">
                            <div className="">
                                <Link to="/members" className="flex cursor-pointer items-center mb-8">
                                    <span className="mr-[20px]">
                                        <ArrowRightOutlinedIcon />
                                    </span>
                                    <p className="text-[16px] leading-[24px]">Members</p>
                                </Link>
                            </div>
                        </div>
                    </>}
                    <SidebarTools />
                </>
            }
        </div>
    )
}
export default Sidebar