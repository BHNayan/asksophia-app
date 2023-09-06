import { useParams } from "react-router-dom"
import ProfileEdit from "../components/Profile/ProfileEdit"
import PromptForm from "../components/Prompts/PromptForm"

const PromptTemplate = () => {
    const {id} = useParams();
    return (
        <section className='bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen'>
            <div className='flex flex-col mb-[20px]'>
                <h3 className='md:text-[36px] text-[26px] leading-[40px] font-semibold mb-4'>Create prompt templates</h3>
            </div>
            <div className='gridItems'>
                <div className='grid xl:grid-cols-2 grid-cols-1 gap-[12px]'>
                    <PromptForm promptId={id}/>
                    <ProfileEdit />
                </div>
            </div>
        </section>
    )
}

export default PromptTemplate