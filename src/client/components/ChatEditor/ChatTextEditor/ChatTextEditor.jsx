import { useEffect, useReducer, useRef, useState } from 'react';
import {
    CheckOutlined,
    ContentCopyOutlined
} from '@mui/icons-material';
import { marked } from 'marked';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../../layouts/GeneralSpinner';
import { editProject, postProject } from '../../../../api/projectService';

marked.setOptions({ headerIds: false });


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];


const ChatTextEditor = ({chatId, dispatch, projectState, prompt, transition, setTransition, generatedText }) => {
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [value, setValue] = useState('');
    const quillRef = useRef(null);


    useEffect(() => {
        if (generatedText) {
            setValue(marked(generatedText));
        }
    }, [generatedText])

    const countWordsAndChars = () => {
        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor();  // get the Quill instance
            const text = quillInstance.getText();  // get the text content
            const wordCount = text.split(/\s+/).filter(function (n) { return n != '' }).length;
            const charCount = text.length;
            // Set the word and character counts
            setWordCount(wordCount);
            setCharCount(charCount);
        }
    }
    
    const handleQuillChange = (value) => {
        setValue(value);  // Set the new value
        countWordsAndChars();  // Count the words and characters
      }

    const copyToClipboard = async () => {
        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor();  // get the Quill instance
            const text = quillInstance.getText();  // get the text content
            try {
                await navigator.clipboard.writeText(text);
                toast.success("Copied to clipboard")
            } catch (err) {
                toast.error("Failed to copy to clipboard");
            }
        }
    };

    useEffect(() => {
        if (projectState.isError) {
            toast.error(projectState.message)
        } 
        dispatch({ type: "RESET" })

    }, [projectState.isError, projectState.isSuccess, dispatch])

    const saveProject = async () => {
        dispatch({type:"START_LOADING"})
      if(chatId){
        await editProject(chatId,{ title: prompt, response: value }, dispatch)
      } else {
        await postProject({ title: prompt, response: value }, dispatch);
      }
      dispatch({type:"RESET"})
    }


    return (
        <>
            {projectState.isLoading && <Spinner />}
            <div className={`home-quill relative transition-all duration-500
             ${transition ? 'translate-x-[200%]' : ''}`}>
                <ReactQuill
                    theme="snow"
                    ref={quillRef}
                    placeholder="Start typing, copy, or paste to get started..."
                    modules={modules}
                    formats={formats}
                    value={value} onChange={handleQuillChange} />

                {!generatedText && <div onClick={() => setTransition(!transition)}
                    className='absolute hidden lg:flex bottom-[50%] translate-y-[50%] cursor-pointer'>
                    <img src="/images/icons/expand.png" alt="expand icon" />
                </div>}
                <div className="lg:absolute bottom-0 w-full mt-[80px]">
                    <div className="flex justify-between">
                        <div className="bg-white px-6 py-3 md:text-[16px] text-[13px] font-regular text-black rounded-full">
                            {wordCount} <span className='text-[#939393]'>words </span>
                            {charCount} <span className='text-[#939393]'>characters</span>
                        </div>
                        <div className="flex items-center">
                            <span onClick={copyToClipboard} className='md:flex hidden mr-4 text-gray-400 cursor-pointer'>
                                <ContentCopyOutlined />
                            </span>
                        <button
                                onClick={saveProject}
                                type='button'
                                className="flex items-center bg-white text-md font-normal text-cyan-400 rounded-full px-6 py-3">
                                <span className='mr-2'>
                                    <CheckOutlined />
                                </span>
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChatTextEditor