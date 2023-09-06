import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from "../../../../App";
import { payFunction } from "../../../../api/stripeService";


const LeftSide = ({ prompt, hashtagReplacements, relevantHashtags, editedTemplate, setEditedTemplate }) => {
    const [coloredText, setColoredText] = useState("");
    const { state } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editableDescription, setEditableDescription] = useState("");
    const [blurStyle, setBlurStyle] = useState({});
    const [isPurchased, setIsPurchased] = useState(false);
    const quillRef = useRef(null);
    


    const updateColoredText = () => {
        const parts = editedTemplate.split(/(#\w+)/g);
        setColoredText(parts.map((part, index) => {
            if (part.startsWith('#')) {
                const hashtagIndex = prompt.hashtags.findIndex(hashtag => hashtag.title === part);
                const color = hashtagIndex !== -1 ? prompt.hashtags[hashtagIndex].color : 'black';
                const replacement = hashtagReplacements[part] ? hashtagReplacements[part] : part;
                return <span key={index} style={{ color }}>{replacement}</span>;
            } else {
                return part;
            }
        }));
    };

    useEffect(() => {
        if (editedTemplate) {
            updateColoredText();
        }
    }, [editedTemplate, hashtagReplacements]);


    useEffect(() => {
        if (prompt) {
            setBlurStyle(prompt.isForSale ? { filter: 'blur(5px)', userSelect: 'none' } : {})
            setIsPurchased(prompt.purchasedBy && prompt.purchasedBy.includes(state.user._id));
            const parts = prompt.template.split(/(#\w+)/g);
            setColoredText(parts.map((part, index) => {
                if (part.startsWith('#')) {
                    const hashtagIndex = prompt.hashtags.findIndex(hashtag => hashtag.title === part);
                    const color = hashtagIndex !== -1 ? prompt.hashtags[hashtagIndex].color : 'black';
                    const replacement = hashtagReplacements[part] ? hashtagReplacements[part] : part;
                    return <span key={index} style={{ color }}>{replacement}</span>;
                } else {
                    return part;
                }
            }));
        }
    }, [prompt, hashtagReplacements])


    const handleQuillChange = (value) => {
        setEditableDescription(value);
        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor();
            const text = quillInstance.getText();
            setEditedTemplate(text)
        }
    }


    const handleToggle = () => {
        setIsEditing(!isEditing);
        const textForEditing = prompt.template.split(/(#\w+)/g).map((part) => {
            if (part.startsWith('#')) {
                const replacement = hashtagReplacements[part] ? hashtagReplacements[part] : part;
                return replacement;
            } else {
                return part;
            }
        }).join('');
        setEditableDescription(textForEditing);
    }

    const buyNowHandler = async (title, price)=>{
        const response = await payFunction({title, price, 
            sellerPaypalEmail:state.user.paypalAccountEmail, promptId:prompt._id});
            if(response){
                window.location.href=response.approval_url;
            }
    
        // console.log(error)
    }

    return (
        <div className="relative bg-white p-4 border border-gray-100 rounded-[10px]">
            {prompt && prompt.isForSale && !isPurchased &&
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                            bg-cyan-500 text-white px-4 py-2 rounded hover:scale-110 hover:bg-purple-500"
                    onClick={() => buyNowHandler(prompt.title, prompt.price)}
                > Buy Now </button>
            }
           <div style={{ ...(!isPurchased && prompt && prompt.isForSale ? blurStyle : {}) }}>
           {isEditing ? (
                <div className="useprompt-quill">
                    <div className="flex">
                        <p onClick={() => handleToggle()}
                            className="cursor-pointer w-fit mb-2 rounded-md px-4 py-2 
                            text-white text-[14px] font-medium bg-cyan-500 hover:bg-cyan-600">
                            Save
                        </p>
                        <p onClick={() => handleToggle()}
                            className="cursor-pointer w-fit ml-2 mb-2 rounded-md px-4 py-2 text-gray-900 
                            text-[14px] font-medium bg-transparent hover:bg-gray-200">
                            Close
                        </p>
                    </div>
                    <ReactQuill
                        theme="snow"
                        ref={quillRef}
                        value={editableDescription}
                        onChange={handleQuillChange} />
                    {prompt && <p className="text-[16px] mt-4 font-normal text-black leading-[22px]  mb-[36px]">{prompt.description}</p>}
                </div>
            ) : (
                <>
                    <p onClick={() => handleToggle()} className="cursor-pointer w-fit mb-2 rounded-md px-4 py-2 text-white text-[14px] font-medium bg-cyan-500">
                        Edit
                    </p>
                    <pre
                        style={{ whiteSpace: "pre-wrap", fontFamily: "Inter" }}
                        className="text-[16px] font-semibold text-black leading-[22px] mb-[18px]">{coloredText}</pre>
                    {prompt && <p className="text-[16px] font-normal text-black leading-[22px] mb-[36px]">{prompt.description}</p>}
                </>
            )}
            <div className="flex flex-wrap">
                {relevantHashtags.map((item, id) => {
                    return <div
                        key={id}
                        className="mr-2 cursor-pointer bg-gray-200 rounded-full px-4 py-2"
                        style={{ color: item.color }}>
                        {item.title}
                    </div>
                })}
            </div>
           </div>
        </div>
    )
}
export default LeftSide