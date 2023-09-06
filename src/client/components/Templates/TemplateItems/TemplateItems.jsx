import { useContext } from "react";
import { likePrompt, unlikePrompt } from "../../../../api/multiService";
import Tags from "../../items/Tags"
import { UserContext } from "../../../../App";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { payFunction } from "../../../../api/stripeService";



const TemplateItems = ({ prompts, createdBy, getAllPrompts, topic, isLoading }) => {
    const { state } = useContext(UserContext);

    const handleLike = async (id) => {
        await likePrompt(id);
        getAllPrompts(topic)
    }
    const handleUnLike = async (id) => {
        await unlikePrompt(id);
        getAllPrompts(topic)
    }
    const checkPrompt = (prompt) => {
        if (prompt.likes.some(id => id === state.user._id) ||
            prompt.likes.some(user => user._id === state.user._id)) {
            handleUnLike(prompt._id)
        } else {
            handleLike(prompt._id)
        }
    }
 
    if (isLoading) {
        return <>
            <div className="flex flex-col justify-center items-center h-screen">
                <Spinner className="h-12 w-12" />
            </div>
        </>
    }
    return (
        <div className="">
            {prompts && prompts.length > 0 ? prompts.map((prompt, index) => {
                if(prompt.createdBy !== createdBy){
                    return null;
                }

                return <div key={index}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-[80%]">
                            <div className="flex items-center">
                                <img className="rounded-full w-8 h-8 mr-2 object-cover"
                                    src={`${prompt.user.img_url ? 
                                        `${prompt.user.img_url}` : '/images/avatar.png'}`}
                                     alt="avatar" />
                                <p className="text-black text-md font-medium">{prompt && prompt.user.username}</p>
                            </div>
                                <Link to={`/use-prompt/${prompt._id}`} className="flex items-center mt-4">
                                    <h4 className="text-[18px] font-semibold leading-[24px] mr-[12px]">
                                        {prompt && prompt.title}
                                    </h4>
                                </Link>
                        </div>
                        <button onClick={() => checkPrompt(prompt)}
                            className="bg-white text-cyan-600 text-[18px] 
                               font-semibold px-6 py-3 border border-gray-100 rounded-full">👍 {prompt.likes.length ? prompt.likes.length : 0}</button>
                    </div>
                    <div className="relative">
                        <p
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                userSelect: 'none'
                            }}
                            className="text-gray-800 text-md font-normal"
                        >{prompt && prompt.description}</p>
                    </div>
                    <Tags prompt={prompt} getAllPrompts={getAllPrompts} topic={topic} />
                </div>

            }) : <>
                <div className="flex text-center my-6">
                    <p className="text-gray-500 text-md">No prompts available for this category.</p>
                </div>
            </>
            }
        </div>
    )
}
export default TemplateItems