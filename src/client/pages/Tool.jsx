import { useContext, useEffect, useState } from "react";
import ToolForm from "../components/Tools/ToolForm/ToolForm"
import ToolResult from "../components/Tools/ToolResult/ToolResult";
import { getResponse } from "../../api/openaiService";
import { UserContext } from "../../App";
import { getOneUser } from "../../api/userService";
import { socket } from "../../socket";



const Tool = ({ tool, toolName }) => {
    const {state, setUserWords} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ tone: "Friendly", generatedText: null, language:"English" })

    const {  generatedText } = formData;
   
    useEffect(() => {
        socket.on('chatgptResChunk', (data) => {
            setFormData({ generatedText: data.content });
            setIsLoading(false);
        });

        socket.on('resError', (data) => {
            console.error(data)
        });

    }, []); 

    const getUserWords = async () => {
        const currentUser = await getOneUser(state.user._id);
         setUserWords(currentUser.words);
       }
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({...formData, generatedText: null });
        setIsLoading(true);
        try {
            let prompt = `In ${formData.language} please, Write a ${formData.tone} ${toolName}.`;
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'tone' && key !== 'generatedText') {
                  prompt += ` The ${key} is/are [${value}].\n`;
                }
              });
            console.log(prompt)
            const result = await getResponse(prompt);
            setFormData({ generatedText: result });
            getUserWords();
        } catch (error) {
            setIsLoading(false);
        }
    };
    return (
        <>
            <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
                <div className="flex flex-col mb-[27px]">
                    <h3 className="text-[36px] leading-[40px] font-bold mb-4">
                        {toolName}
                    </h3>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <ToolForm
                        formData={formData}
                        setFormData={setFormData}
                        tool={tool}
                        handleSubmit={handleSubmit} />
                    <ToolResult
                        loading={isLoading}
                        toolName={toolName}
                        generatedText={generatedText}
                    />
                </div>
            </section>
        </>
    )
}
export default Tool