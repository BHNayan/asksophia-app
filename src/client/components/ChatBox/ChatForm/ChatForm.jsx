import { Link } from "react-router-dom"

const ChatForm = ({ prompt, setPrompt, chatData, setChatData, handleSubmit }) => {

    const submitChat = (e) => {
        e.preventDefault();
        const updatedChatData = [...chatData, { role: 'user', content: prompt }];
        setChatData(updatedChatData);
        handleSubmit(e, updatedChatData);
    }

    const onSubmit = (e) => {
        submitChat(e);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            submitChat(e);
        }
    };


    return (
        <>
            <div className="absolute bottom-0 left-0 w-full border border-gray-100 rounded-[10px] bg-white p-[24px] mt-4">
                <form onSubmit={onSubmit}>
                    <textarea
                        name="prompt"
                        rows="2"
                        // disabled={isLoading}
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                        onKeyDown={handleKeyPress}
                        placeholder="What would you like to know?"
                        className="resize-none font-normal border-b border-gray-100 bg-white mb-4 placeholder::text-gray-100 outline-0 w-full text-[15px] leading-[20px]"></textarea>
                    <div className="flex justify-between">
                        <div className="flex md:flex-row flex-col">
                            <Link to="/templates"
                                className="mr-4 w-[200px] md:w-fit bg-black text-white font-semibold text-[18px] leading-[20px] rounded-full py-3 px-6">
                                Browse prompts</Link>
                            <Link
                                to="/tools"
                                className="md:mt-0 w-[200px] md:w-fit mt-3 cursor-pointer bg-cyan-100 text-cyan-600 font-semibold text-[18px] leading-[20px]
                              rounded-full py-3 px-6">+ Add project</Link>
                        </div>
                        <button type="submit" className="cursor-pointer">
                            <img src="images/icons/send.svg" alt="send icon" />
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default ChatForm