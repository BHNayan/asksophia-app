import { useEffect, useReducer, useRef, useState } from "react";
import { exportToExcel } from "../../../../api/openaiService";
import { spinnerLoading } from "../../../../config/constants";
import { postProject } from "../../../../api/projectService";
import { useLocation } from "react-router-dom";
import { initialProjectState, projectReducer } from "../../../../Reducers/projectReducer";
import { CheckOutlined } from '@mui/icons-material';
import { toast } from "react-toastify";


const ToolResult = ({ loading, generatedText, toolName, prompt }) => {

    const [isSuccess, setIsSuccess] = useState(false);
    const downloadLinkRef = useRef(null);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // new state
    const [projectState, dispatch] = useReducer(projectReducer, initialProjectState);
    const location = useLocation();

    useEffect(() => {
        countWordsAndChars();
    }, [generatedText]);

    useEffect(() => {
        if (loading) {
            let intervalId = setInterval(() => {
                setCurrentMessageIndex(prevIndex => (prevIndex + 1) % spinnerLoading.length);
            }, 4000); // every 4 seconds
            return () => clearInterval(intervalId); // cleanup function to stop the messages when loading is false or when component is unmounted
        }
    }, [loading]);

    // Define a function to copy the generated text to the clipboard
    const copyToClip = () => {
        navigator.clipboard.writeText(generatedText);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
        }, 3000)
    }

    const countWordsAndChars = () => {
        if (generatedText) {
            const wordCount = generatedText.split(/\s+/).filter(function (n) { return n != '' }).length;
            const charCount = generatedText.length;
            // Set the word and character counts
            setWordCount(wordCount);
            setCharCount(charCount);
        }
    }
    
    const saveProject = async () => {
        const currentPath = location.pathname;
        const res = await postProject({ title: toolName ? toolName : prompt.title, url: currentPath }, dispatch);
        if(res){
            toast.success("Project Saved Successfully.");
        } else {
            toast.warning("Project already saved.");
        }
    }
    
    // Define an async function to export data (title and output) as an Excel file
    const exportData = async (output) => {
        try {
            const resp = await exportToExcel(output);
            const url = URL.createObjectURL(resp);
            downloadLinkRef.current.href = url;
            downloadLinkRef.current.download = `AskSophia_${Math.floor(Math.random() * 1000000)}.docx`;
            downloadLinkRef.current.click();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="h-full">
                <div className="h-[500px] flex flex-col justify-between bg-white overflow-y-auto rounded-[10px] border border-gray-100 pt-8 pb-4 px-[22px]">
                    <pre style={{ fontFamily: "Inter", whiteSpace: 'pre-wrap' }}>{generatedText} </pre>
                    {loading && <div className="flex items-center justify-center spinnerH">
                        <img src="/images/sophia.png" className="w-1/2 bounce" alt="sophia" />
                    </div>}
                    {loading && <div className="flex items-center justify-center">
                        <p className="text-gray-400 text-[22px] font-bold">{spinnerLoading[currentMessageIndex]}</p>
                    </div>}
                    {generatedText &&
                        <>
                            <div className="flex flex-col mt-4">
                                {isSuccess && <p className="text-md text-green-500 font-light">The text is copied</p>}
                                <div className="flex">
                                    <div className="cursor-pointer bg-cyan-400 rounded-full px-4 py-2 text-white" onClick={copyToClip}><i className="fa-regular fa-copy"></i>
                                        <span className="ml-2">Copy to Clipboard</span>
                                    </div>
                                    <div onClick={() => exportData(generatedText)} className="cursor-pointer text-white rounded-full px-4 py-2 mx-2 text-md bg-green-600 hover:bg-green-700">
                                        <span className="">Export to word</span>
                                    </div>
                                    <a ref={downloadLinkRef} style={{ display: 'none' }}>Download</a>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="flex justify-between items-center mt-4 h-[15%]">
                    <div className="flex justify-between">
                        <div className="flex bg-white px-6 py-3 text-[14px] font-regular text-black rounded-full">
                            {wordCount} <span className='text-[#939393] mr-1'>words </span>
                            <span className='md:flex hidden'>{charCount}</span> 
                            <span className='md:flex hidden text-[#939393]'>characters</span>
                        </div>
                    </div>
                    <div className="flex items-center">
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
        </>
    )
}
export default ToolResult