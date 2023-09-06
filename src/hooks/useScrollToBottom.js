import {useEffect} from 'react'

const useScrollToBottom = (endRef, chatData) => {
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatData, endRef]);
}

export default useScrollToBottom