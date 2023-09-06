import React, { useEffect, useReducer, useState } from 'react'
import PromptTextArea from '../components/ChatEditor/Textarea/PromptTextArea'
import { Helmet } from 'react-helmet-async';
import ChatHeader from '../components/ChatEditor/ChatHeader/ChatHeader';
import ChatPrompts from '../components/ChatEditor/ChatPrompts/ChatPrompts';
import ChatTextEditor from '../components/ChatEditor/ChatTextEditor/ChatTextEditor';
import { useParams } from 'react-router-dom';
import { getOneProject } from '../../api/projectService';
import { initialProjectState, projectReducer } from '../../Reducers/projectReducer';

const ChatEditor = () => {
  const [transition, setTransition] = useState(false);
  const [projectState, dispatch] = useReducer(projectReducer, initialProjectState);
  const [prompt, setPrompt] = useState("");
  const {project} = projectState;
  const [generatedText, setGeneratedText] = useState(null)
  const {chatId} = useParams();
  const getProject = async () => {
     await getOneProject(chatId, dispatch);
  }
  useEffect(()=>{
    if(chatId){
     getProject();
    }
  }, [chatId])
  
  useEffect(()=>{
    if(project){
      setPrompt(project.title);
      setGeneratedText(project.response)
     }
  }, [project])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, []);

  return (

  <>
    <Helmet>
      <title>Chat Editor | AskSophia</title>
    </Helmet>
    <section className='relative bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen overflow-x-hidden '>
     {transition && <div onClick={() => setTransition(!transition)}
          className='absolute hidden lg:flex bottom-[50%] right-0 rotate-180 translate-y-[50%] cursor-pointer'>
          <img src="/images/icons/expand.png" alt="expand icon" />
      </div>}
      <div className={` ${transition ? 'flex' : 'grid lg:grid-cols-2 grid-cols-1 gap-[30px]'} mb-[20px]`}>
        <div className={`transition-all duration-1000 w-full flex flex-col justify-between`}>
          <ChatHeader />
          <ChatPrompts setPrompt={setPrompt}/>
          <PromptTextArea 
            prompt={prompt}
            setPrompt={setPrompt}
            setGeneratedText={setGeneratedText} />
        </div>
        <ChatTextEditor
          chatId={chatId}
          prompt={prompt}
          dispatch={dispatch}
          projectState={projectState}
          generatedText={generatedText}
          transition={transition}
          setTransition={setTransition}
        />
      </div>
    </section>
  </>
  )
}

export default ChatEditor