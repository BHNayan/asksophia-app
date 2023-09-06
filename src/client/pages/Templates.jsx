import { useEffect, useReducer, useState } from "react";
import TemplateItems from "../components/Templates/TemplateItems/TemplateItems"
import SavedPrompts from "../components/Templates/SavedPrompts/SavedPrompts"
import { useLocation, useParams } from "react-router-dom";
import { promptReducer, initialState } from "../../Reducers/promptReducer";
import { fetchAllPrompts } from "../../api/promptService";
import { Helmet } from "react-helmet-async";
import NextPrev from "../components/items/NextPrev";
import TemplateHeader from "../components/Templates/TemplatesHeader/TemplateHeader";



const Templates = () => {
    const { topic } = useParams();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('new');
    const [promptState, dispatch] = useReducer(promptReducer, initialState);
    const { prompts, pages, isLoading } = promptState;
    const location = useLocation();

    let createdBy = location.pathname === "/users-templates" ? "guest" : "company";
    const getAllPrompts = async (topic, order) => {
        dispatch({type:"FETCH_USER_PROMPTS_START"})
        await fetchAllPrompts(topic, dispatch, page, order);
    }

    useEffect(() => {
        getAllPrompts(topic, sortOrder)
    }, [topic, page, sortOrder])

    return (
       <>
       <Helmet>
        <title>AskSophia | {topic ? topic : "Prompts"} </title>
       </Helmet>
        <section className='bg-[#F8F8F8] pb-[30px] min-h-screen'>
            <TemplateHeader setSortOrder={setSortOrder} topic={topic} promptsLength={prompts.length} />
            <div className='gridItems mt-[34px] lg:mx-[30px] mx-4 pb-20'>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-[22px]'>
                    <div className=''>
                        <TemplateItems createdBy={createdBy} prompts={prompts} isLoading={isLoading} getAllPrompts={getAllPrompts} topic={topic} />
                        <NextPrev prompts={prompts} pages={pages} page={page} setPage={setPage} />
                    </div>
                    <div className=''>
                    {/* <div className='order-first lg:order-last'> */}
                        <SavedPrompts prompts={prompts} />
                    </div>
                </div>
            </div>
        </section>
       </>
    )
}
export default Templates