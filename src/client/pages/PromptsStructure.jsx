import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useFilteredTools } from "../../hooks/FilterTools";
import SearchBread from "../components/layouts/SearchBread";
import {Spinner,} from "@material-tailwind/react";


const PromptsStructure = () => {
    const { category } = useParams();
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const list = useFilteredTools(category, setIsLoading);
    const addSpacesToCamelCase =(str)=> {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2');
      }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [category]);

    const handleRoute = (url)=>{
        window.location.href=url;
    }

    if(isLoading){
        return <>
        <div className="flex flex-col justify-center items-center h-screen">
         <Spinner className="h-12 w-12" />
        </div>
      </>
    }

    return (
        <>
            <section className="bg-[#F8F8F8] py-[30px] px-[40px] min-h-screen">
                <SearchBread title="Copywriting Tools" searchText={searchText} setSearchText={setSearchText} />
                <div className="gridItems">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                        {list
                        .filter(tool => tool.title.toLowerCase().includes(searchText.toLowerCase()))
                        .map((tool, index) => {
                            return (
                                <div
                                    onClick={()=>handleRoute(`${category ? `${tool.link}` : `/tools${tool.link}`}`)}
                                    key={index}
                                    className="cursor-pointer flex flex-col bg-white rounded-[10px] border border-gray-100 p-[24px]"
                                >
                                    <img
                                        className="w-[60px]"
                                        src="/images/blog.png"
                                        alt="blog icon"
                                    />
                                    <h3 className="text-[20px] leading-[24px] text-black my-[22px] font-bold">
                                        {addSpacesToCamelCase(tool.title)}
                                    </h3>
                                    <p className="text-[#84818A] leading-[20px] text-[15px]">
                                        {tool.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="relative flex justify-end my-[20px]">
                        <Link to="/chat"
                            className="fixed right-8 bottom-4 bg-cyan-400 rounded-full px-4 py-2 text-white">
                            Start new chat
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PromptsStructure;
