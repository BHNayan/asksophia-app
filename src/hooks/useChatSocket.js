import {useEffect} from 'react'
import { socket } from '../socket';

const useChatSocket = (currentResponse, setChatData, setCurrentResponse) => {
    useEffect(() => {
        socket.on('chatgptResChunk', (data) => {
            setCurrentResponse(oldResponse => oldResponse + data.content);
        });
    
        socket.on('end', () => {
            setChatData(oldChatData => [...oldChatData, { role: 'assistant', content: currentResponse }]);
            setCurrentResponse('');
        });
    
        socket.on('resError', (data) => {
            console.error(data)
        });
    
    }, []);
}

export default useChatSocket