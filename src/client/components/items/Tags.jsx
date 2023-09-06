import { useContext } from "react";
import { UserContext } from "../../../App";
import { savePrompt, unsavePrompt } from "../../../api/multiService";

const Tags = ({ prompt, getAllPrompts, topic }) => {
    const { state } = useContext(UserContext);


    const handleSave = async (id) => {
        await savePrompt(id);
        getAllPrompts(topic)
    }
    const handleUnSave = async (id) => {
        await unsavePrompt(id);
        getAllPrompts(topic)
    }

    const checkSavedPrompt = (prompt) => {
        if (prompt.savedBy.some(id => id === state.user._id) ||
            prompt.savedBy.some(user => user._id === state.user._id)) {
            handleUnSave(prompt._id)
        } else {
            handleSave(prompt._id)
        }
    }

    return (
        <div className='mt-[11px] flex justify-between  border-b border-gray-300 pb-[26px] mb-4'>
            <div className="flex">
                <p className="mr-2 text-[13px] font-medium leading-[20px] text-[#8B8B8B]">Tags: </p>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-1">
                    {prompt.topics.map((topic, index) => {
                        return <p key={index} className="text-[13px] font-medium leading-[20px] text-purple-500"> {topic} </p>

                    })}

                </div>
            </div>
            <div className="flex ">
                <div className="flex bg-white rounded-full border border-gray-100 px-6 py-2 mr-2">
                    <p className="flex items-center text-[13px] leading-[24px] font-medium text-[#8B8B8B]">
                        <span className="md:flex hidden">counter:</span>
                        <span className="md:mx-4 mr-2">
                            <img src="/images/icons/upRight.svg" alt="up right icon" />
                        </span>
                        <span className="text-black">{prompt && prompt.usedBy && prompt.usedBy.length ? prompt.usedBy.length : 0}</span>
                    </p>
                </div>
                <div className="flex bg-white rounded-full border border-gray-100 px-6 py-3">
                    <p onClick={() => checkSavedPrompt(prompt)} 
                    className="cursor-pointer flex items-center text-[13px] leading-[24px] font-medium text-[#8B8B8B]">
                        <span className="md:flex hidden">{prompt.savedBy.includes(state.user._id) ? "Unsave" : "Save"}</span>
                        <span className="text-black md:mx-4 mr-2">{prompt.savedBy && prompt.savedBy.length ? prompt.savedBy.length : 0}</span>
                        <span className="">
                            <img src="/images/icons/save.svg" alt="save icon" />
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Tags