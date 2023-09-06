import { useContext, useEffect, useState } from "react";
import { usedByPrompt } from "../../../../api/multiService";
import { getResponse } from "../../../../api/openaiService";
import { socket } from "../../../../socket";
import { UserContext } from "../../../../App";


const RightSide = ({ prompt, editedTemplate, setIsLoading, setGeneratedText, 
    hashtagReplacements, relevantHashtags, setHashtagReplacements }) => {
        const [blurStyle, setBlurStyle] = useState({});
        const [isPurchased, setIsPurchased] = useState(false);
        const { state } = useContext(UserContext);

        useEffect(()=>{
            if(prompt){
                setBlurStyle(prompt.isForSale ? { filter: 'blur(5px)', userSelect:"none" } : {})
                setIsPurchased(prompt.purchasedBy && prompt.purchasedBy.includes(state.user._id));
            }
        }, [prompt])

    const handleUses = async (id) => {
        await usedByPrompt(id);
    }

    useEffect(() => {
        socket.on('chatgptResChunk', (data) => {
            setGeneratedText(data.content);
            setIsLoading(false);
        });
        socket.on('resError', (data) => {
            console.error(data)
        });

    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            let promptTemplate =  editedTemplate || prompt.template;

            for (let hashtag in hashtagReplacements) {
                const replacement = hashtagReplacements[hashtag];
                const regex = new RegExp(hashtag, 'g');
                promptTemplate = promptTemplate.replace(regex, replacement);
            }
            await getResponse(promptTemplate);
           
            await handleUses(prompt._id)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    const handleInputChange = (event, tag) => {
        setHashtagReplacements(prevState => ({ ...prevState, [tag]: event.target.value }));
    };


    return (
        <>
            <div
            style={{ ...(!isPurchased && prompt && prompt.isForSale ? blurStyle : {}),}}
            className="bg-white p-4 border border-gray-100 rounded-[10px]">
               {relevantHashtags && relevantHashtags.length > 0  &&
                <h3 className="font-semibold text-[20px] leadin-[20px] text-black">Edit Tags</h3>}
                {relevantHashtags && relevantHashtags.length > 0 ?
                    <form onSubmit={handleSubmit}>
                        <div className="mt-[20px] grid lg:grid-cols-2 grid-cols-1 gap-3">
                            {relevantHashtags.map((item, index) => {
                                return <div key={index} className="mb-6">
                                    <label
                                        htmlFor=""
                                        style={{ color: item.color }}
                                        className="text-[16px] font-semibold leading-[24px]">{item.title}</label>
                                    <input
                                        type="text"
                                        name={item.name}
                                        onChange={(event) => handleInputChange(event, item.title)}
                                        className="rounded-[10px] mt-3 w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400"
                                    />
                                </div>
                            })}
                        </div>
                        <button type="submit" className="bg-black text-white px-6 py-3 text-[18px] leading-[24px] font-semibold rounded-full">
                            Send
                        </button>
                    </form>
                    : <div className="h-full flex flex-col justify-center items-center">
                        <p>No tags added to this prompt</p>
                        <button
                         type="button"
                         onClick={handleSubmit}
                         className="bg-black mt-2 text-white px-6 py-3 text-[18px] leading-[24px] font-semibold rounded-full">
                            Send
                        </button>
                    </div>
                }
        </div> 
        </>
    )
}
export default RightSide