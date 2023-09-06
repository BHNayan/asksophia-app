import {useEffect} from 'react';
import { getChatHistory, saveChat } from '../api/openaiService';

const useSaveChat = (chatData, conversationId, setConversationId, setChatData) => {

    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const previousChatData = await getChatHistory(conversationId);
                console.log(previousChatData)
                if(previousChatData.conversation){
                    setChatData(previousChatData.conversation);
                }
            } catch (error) {
                console.error("Failed to fetch chat data", error);
            }
        };

        fetchChatData();
    }, [conversationId]);

    useEffect(() => {
        const saveChatToDatabase = async () => {
            if (chatData.length > 0) {
                try {
                    const response = await saveChat(chatData, conversationId);
                    setConversationId(response._id)
                } catch (error) {
                    console.error(error);
                }
            }
        };

        saveChatToDatabase();
    }, [chatData]);
    
}

export default useSaveChat