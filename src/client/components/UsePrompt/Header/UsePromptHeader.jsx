import { useContext, useState } from "react";
import { downvotePrompt, unsavePrompt, upvotePrompt } from "../../../../api/multiService";
import { savePrompt } from "../../../../api/multiService";
import { UserContext } from "../../../../App";
import moment from 'moment';
import SocialMedia from "../../Modals/SocialMedia";

const UsePromptHeader = ({ prompt, getCurrentPrompt }) => {
    const { state } = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);

    const handleSave = async (id) => {
        await savePrompt(id);
        getCurrentPrompt()
    }
    const handleUnSave = async (id) => {
        await unsavePrompt(id);
        getCurrentPrompt()
    }
    const handleUpvote = async (id) => {
        await upvotePrompt(id);
        getCurrentPrompt()
    }
    const handleDownvote = async (id) => {
        await downvotePrompt(id);
        getCurrentPrompt()
    }

    const checkSavedPrompt = (prompt) => {
        if (prompt.savedBy.some(id => id === state.user._id) ||
            prompt.savedBy.some(user => user._id === state.user._id)) {
            handleUnSave(prompt._id)
        } else {
            handleSave(prompt._id)
        }
    }

    const checkupvotedPrompt = (prompt) => {
        if (prompt.votedBy.some(id => id === state.user._id) ||
            prompt.votedBy.some(user => user._id === state.user._id)) {
            handleDownvote(prompt._id)
        } else {
            handleUpvote(prompt._id)
        }
    }

    const handleOpen = ()=>{
        setOpenModal(!openModal)
    }

    return (
        <>
            <div className='flex font-inter justify-between lg:px-[80px] px-4 py-[30px] mb-[20px] border-b border-gray-100 bg-white'>
                <div className="flex items-center justify-between mb-3">
                    <div className="">
                        <div className="flex items-center">
                            <img className="rounded-full w-8 h-8 mr-2" src="/images/Avatar.png" alt="avatar" />
                            <p className="text-black text-md font-medium">{state.user.username}</p>
                             {/* <p className="text-yellow-500 text-md ml-6 font-semibold">Health & Wellness</p> */}
                        </div>
                        <div className="flex flex-col mt-6">
                            <h4 className="md:text-[36px] text-[18px] font-semibold leading-[24px] mb-[12px]">{prompt && prompt.title}</h4>
                            <p className="font-normal md:text-[16px] text-[13px] text-gray-800 leading-[22px] mb-4">{prompt && prompt.description}</p>
                            <div className="flex lg:flex-row flex-col lg:items-center items-start">
                                <div className="bg-white rounded-full border border-gray-100 px-6 py-3">
                                    <p className="flex items-center text-[13px] leading-[24px] font-medium text-[#8B8B8B]">
                                        <span className="md:flex hidden">Prompt counter:</span>
                                        <span className="mx-4">
                                            <img src="/images/icons/upRight.svg" alt="up right icon" />
                                        </span>
                                        <span className="text-black">{prompt && prompt.usedBy && prompt.usedBy.length ? prompt.usedBy.length : 0}</span>
                                    </p>
                                </div>
                                <div className="bg-white rounded-full border border-gray-100 px-6 py-3 lg:mx-2 my-2">
                                    <p className="cursor-pointer flex items-center text-[13px] leading-[24px] font-medium text-[#8B8B8B]">{prompt && prompt.savedBy.includes(state.user._id) ? "Unsave" : "Save"}
                                        <span className="text-black mx-4">{prompt && prompt.savedBy && prompt.savedBy.length ? prompt.savedBy.length : 0}</span>
                                        <span className="">
                                            <img src="/images/icons/save.svg" alt="save icon" />
                                        </span>
                                    </p>
                                </div>
                                <p className="font-normal text-[14px] text-[#969696] leading-[20px]">{prompt && moment(prompt.createdAt).fromNow()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col items-center md:ml-0 ml-2">
                    <div className="lg:flex hidden cursor-pointer items-center justify-center" onClick={handleOpen}>
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="72" height="72" rx="36" fill="white" />
                            <path d="M34 37C34.4295 37.5741 34.9774 38.0491 35.6066 38.3929C36.2357 38.7367 36.9315 38.9411 37.6467 38.9923C38.3618 39.0435 39.0796 38.9403 39.7513 38.6897C40.4231 38.4392 41.0331 38.047 41.54 37.54L44.54 34.54C45.4508 33.597 45.9548 32.3339 45.9434 31.023C45.932 29.712 45.4061 28.4579 44.4791 27.5309C43.5521 26.6038 42.298 26.078 40.987 26.0666C39.676 26.0552 38.413 26.5592 37.47 27.47L35.75 29.18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M38 35.0002C37.5705 34.4261 37.0226 33.951 36.3934 33.6073C35.7642 33.2635 35.0684 33.0591 34.3533 33.0079C33.6382 32.9567 32.9204 33.0599 32.2486 33.3104C31.5769 33.561 30.9668 33.9532 30.46 34.4602L27.46 37.4602C26.5492 38.4032 26.0452 39.6662 26.0566 40.9772C26.068 42.2882 26.5938 43.5423 27.5209 44.4693C28.4479 45.3964 29.702 45.9222 31.0129 45.9336C32.3239 45.945 33.5869 45.441 34.53 44.5302L36.24 42.8202" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="0.5" y="0.5" width="71" height="71" rx="35.5" stroke="black" strokeOpacity="0.1" />
                        </svg>
                    </div>
                    <div onClick={() => checkSavedPrompt(prompt)} className="flex cursor-pointer lg:px-8 md:mb-0 mb-2">
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="72" height="72" rx="36" fill="#ECECEC" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M41 27H31C29.9 27 29.01 27.9 29.01 29L29 45L36 42L43 45V29C43 27.9 42.1 27 41 27ZM41 42L36 39.82L31 42V30C31 29.45 31.45 29 32 29H40C40.55 29 41 29.45 41 30V42Z" fill="#222222" />
                        </svg>
                    </div>
                    <div className="flex items-center justify-center lg:px-8">
                        <button onClick={() => checkupvotedPrompt(prompt)}
                            className="bg-black text-white px-6 py-3 text-[18px] leading-[24px] font-semibold rounded-full">
                            👍 <span className="md:flex hidden">Upvotes</span>
                            ({prompt && prompt.votedBy && prompt.votedBy.length ? prompt.votedBy.length : 0})
                        </button>
                    </div>
                </div>
            </div>
            <SocialMedia open={openModal} handleOpen={handleOpen} title={prompt && prompt.title} />
        </>

    )
}
export default UsePromptHeader