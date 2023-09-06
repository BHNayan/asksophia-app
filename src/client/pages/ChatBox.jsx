import { Helmet } from 'react-helmet-async';
import ChatBodyBot from '../components/ChatBox/ChatBodyBot/ChatBodyBot';
import ChatBodyUser from '../components/ChatBox/ChatBodyUser/ChatBodyUser';
import ChatForm from '../components/ChatBox/ChatForm/ChatForm';
import useSaveChat from '../../hooks/useSaveChat';
import { useRef, useState } from 'react';
import { getChatResponse } from '../../api/openaiService';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import { useParams } from 'react-router-dom';
import ChatIsLoading from '../components/ChatBox/ChatIsLoading/ChatIsLoading';

const ChatBox = () => {
    const { id } = useParams();
    const [chatData, setChatData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [conversationId, setConversationId] = useState(id ? id : "");
    const endOfMessagesRef = useRef(null);

    useSaveChat(chatData, conversationId, setConversationId, setChatData);
    useScrollToBottom(endOfMessagesRef, chatData)


    const handleSubmit = async (e, updatedChatData) => {
        setPrompt("");
        setIsLoading(true);
        const response = await getChatResponse(updatedChatData);
        if (response) {
            setChatData(oldChatData => [...oldChatData, { role: 'assistant', content: response.content }]);
        }
        setIsLoading(false);
    }

    return (
        <>
            <Helmet>
                <title>Chatting wit AskSophia</title>
            </Helmet>
            <div className='relative'>
                <div className='chat-container'>
                    {chatData && chatData.length > 0 &&
                        chatData.map((chatItem, index) => {
                            if (chatItem.role === "user") return <ChatBodyUser key={index} chatItem={chatItem} />
                            else if(chatItem.role === "assistant") return <ChatBodyBot key={index} chatItem={chatItem} />
                        })
                    }
                {isLoading && <ChatIsLoading />}
                 <div ref={endOfMessagesRef} />
                </div>
                <ChatForm
                    prompt={prompt}
                    handleSubmit={handleSubmit}
                    setPrompt={setPrompt}
                    chatData={chatData}
                    setChatData={setChatData} />
            </div>
        </>
    )
}

export default ChatBox