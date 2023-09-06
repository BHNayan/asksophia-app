import { useEffect, useState } from "react";
import { getResponse } from "../../../../api/openaiService";
import Spinner from "../../layouts/GeneralSpinner";
import { socket } from "../../../../socket";
import { Link } from "react-router-dom";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const PromptTextArea = ({  prompt, setPrompt, setGeneratedText }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        socket.on('chatgptResChunk', (data) => {
            setGeneratedText(data.content)
            setIsLoading(false);
        });

        socket.on('resError', (data) => {
            console.error(data)
        });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneratedText(null);
        setIsLoading(true);
        try {
            await getResponse(prompt);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return (
        <>
            {isLoading && <Spinner />}
            <div className="border border-gray-100 rounded-[10px] bg-white p-[24px]">
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="prompt"
                        rows="2"
                        disabled={isLoading}
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                        onKeyPress={handleKeyPress}
                        placeholder="What would you like to know?"
                        className="resize-none font-normal border-b border-gray-100 bg-white mb-4 placeholder::text-gray-100 outline-0 w-full text-[15px] leading-[20px]"></textarea>
                    <div className="flex justify-between">
                        <div className="flex md:flex-row flex-col">
                            <Link to="/templates"
                                className="mr-4 w-[200px] md:w-fit bg-black text-white font-semibold text-center
                                 md:text-[16px] text-[14px] leading-[20px] rounded-full 
                                 md:py-3 md:px-6 py-2 px-4">
                                Browse prompts</Link>
                            <Link
                              to="/tools"
                              className="md:mt-0 w-[200px] md:w-fit text-center mt-3 cursor-pointer bg-cyan-100 text-cyan-600 
                              font-semibold md:text-[16px] text-[14px] leading-[20px]
                              rounded-full md:py-3 md:px-6 py-2 px-4">+ Add project</Link>
                        </div>
                        <button type="submit" className="cursor-pointer">
                            {/* <img src="images/icons/send.svg" alt="send icon" /> */}
                            <span className="flex items-center justify-center 
                            bg-blue-500 rounded-full w-[35px] h-[35px]">
                                <SendOutlinedIcon className="text-white" />
                            </span>
                        </button>
                    </div>
                </form>

            </div>

        </>
    )
}
export default PromptTextArea