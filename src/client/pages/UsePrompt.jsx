import { useContext, useEffect, useReducer, useState } from "react"
import RightSide from "../components/UsePrompt/RightSide/RightSide"
import LeftSide from "../components/UsePrompt/LeftSide/leftSide"
import Header from "../components/layouts/Header"
import UsePromptHeader from "../components/UsePrompt/Header/UsePromptHeader"
import { initialState, promptReducer } from "../../Reducers/promptReducer"
import { useNavigate, useParams } from "react-router-dom"
import { getOnePrompt } from "../../api/promptService"
import { Helmet } from "react-helmet-async"
import ToolResult from "../components/Tools/ToolResult/ToolResult"
import MobileNav from "../components/layouts/MobileNav"
import Comments from "./Comments"
import { Logout } from "../../api/userService"
import { UserContext } from "../../App"




const UsePrompt = () => {
    const { state, dispatch } = useContext(UserContext);
    const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 960);
    const [open, setOpen] = useState(false);
    const { promptId } = useParams();
    const [promptState, dispatchPrompt] = useReducer(promptReducer, initialState);
    const [hashtagReplacements, setHashtagReplacements] = useState({});
    const [relevantHashtags, setRelevantHashtags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedText, setGeneratedText] = useState(false);
    const [editedTemplate, setEditedTemplate] = useState("");
    const navigate = useNavigate();
    const { prompt } = promptState;

    useEffect(() => {
        const regex = /(#\w+)/g;
        if (prompt) {
            const matches = prompt.template.match(regex) || [];
            const uniqueHashtags = [...new Set(matches)];
            setRelevantHashtags(prompt.hashtags.filter(hashtag => uniqueHashtags.includes(hashtag.title)))
        }
    }, [prompt])

    const getCurrentPrompt = async () => {
        try {
            await getOnePrompt(promptId, dispatchPrompt);
        } catch (error) {
            console.log(error);
        }
    }

    const onLogout = async () => {
        await Logout(state, dispatch);
        navigate("/login");
    }
    useEffect(() => {
        if (promptId) { getCurrentPrompt() }
    }, [promptId])


    return (
        <>
            <Helmet>
                <title>{prompt ? prompt.title : ""} | AskSophia</title>
            </Helmet>
            <Header onLogout={onLogout} />
            <MobileNav
                user={state.user}
                onLogout={onLogout}
                open={open}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                setOpen={setOpen}
            />
            <div className="pb-8 bg-[#F8F8F8] min-h-screen">
                <UsePromptHeader prompt={prompt} getCurrentPrompt={getCurrentPrompt} />
                <div className="lg:px-[80px] px-4 grid lg:grid-cols-2 grid-cols-1 gap-4 mt-[18px]">
                    <LeftSide
                        editedTemplate={editedTemplate}
                        setEditedTemplate={setEditedTemplate}
                        relevantHashtags={relevantHashtags}
                        prompt={prompt}
                        hashtagReplacements={hashtagReplacements} />
                    <RightSide
                        prompt={prompt}
                        editedTemplate={editedTemplate}
                        setIsLoading={setIsLoading}
                        setGeneratedText={setGeneratedText}
                        relevantHashtags={relevantHashtags}
                        hashtagReplacements={hashtagReplacements}
                        setHashtagReplacements={setHashtagReplacements} />
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 py-8 lg:px-[80px] px-4 gap-4">
                    <div>
                        <h3 className="font-semibold text-[20px] leadin-[20px] mb-4 text-black">Results</h3>
                        <ToolResult prompt={prompt} generatedText={generatedText} loading={isLoading} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-[20px] leadin-[20px] mb-4 text-black">Comments</h3>
                        <Comments id={promptId} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsePrompt