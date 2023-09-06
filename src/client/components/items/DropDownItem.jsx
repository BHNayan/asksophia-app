import { useState } from 'react';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Link } from 'react-router-dom';

function DropdownItem({ title, items, type}) {
    const [isOpen, setIsOpen] = useState(false);
    const visitUrl = (url) => {
        window.location.href = url;
    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="mb-8">
            <div className="flex cursor-pointer items-center mb-2" onClick={toggleDropdown}>
                <span className={`${isOpen ? 'rotate-90' : ''} mr-[20px]`}>
                    <ArrowRightOutlinedIcon />
                </span>
                <p className="text-[16px] leading-[24px]">{title}</p>
            </div>
            {items && items.length > 0 && isOpen && (
                <ul className="ml-8 py-2 space-y-2 max-h-[140px] overflow-y-auto">
                    {type === "saved" && 
                    <li>
                        {title==="My projects" && <Link to={`/projects`} 
                        className="cursor-pointer text-[14px] leading-[24px]">View all</Link>}    
                        {title==="My prompts" && <Link to={`/prompts`} 
                        className="cursor-pointer text-[14px] leading-[24px]">View all</Link>}    
                        {title==="Chat" && <Link to={`/chat-history`} 
                        className="cursor-pointer text-[14px] leading-[24px]">View all</Link>}    
                    </li>}
                    {items.map((item) => (
                        <li key={item._id}>
                           {type === "saved" ? <>
                           {title==="My prompts" && <Link to={`${`/use-prompt/${item._id}`} `}
                             className="cursor-pointer text-[14px] leading-[24px] one-line ">{item.title}</Link>}
                           {title==="My projects" && <Link to={`${`/chat/${item._id}`} `}
                             className="cursor-pointer text-[14px] leading-[24px] one-line ">{item.title}</Link>}
                           {title==="Chat" && <Link to={`${`/chat-with-sophia/${item._id}`} `}
                             className="cursor-pointer text-[14px] leading-[24px] one-line ">{item.title}</Link>}
                            
                           </> :
                           <p onClick={() => visitUrl(item.url)} 
                           className="cursor-pointer text-[14px] leading-[24px] one-line ">{item.title}</p>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}


export default DropdownItem;
