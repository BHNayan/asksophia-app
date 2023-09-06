import {
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


const FolderToolsTemplate = ({projects, deleteToolFromFolder, title}) => {
  return (
    <>
    {projects && projects.length > 0 && <div className="gridItems">
        <h3 className="my-2 text-[14px] text-gray-700">{title}</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {projects
                .map((tool, index) => {
                    return (
                        <div key={index}
                            className="cursor-pointer flex flex-col bg-white rounded-[10px] border border-gray-100 p-[24px]"
                        >
                            <div className='flex justify-between'>
                                <img
                                    className="w-[60px]"
                                    src="/images/blog.png"
                                    alt="blog icon"
                                />
                                <div className={`flex justify-center`}>
                                    <Tooltip content="delete folder">
                                        <IconButton
                                            onClick={() => deleteToolFromFolder(tool._id)}
                                            variant="text" color="blue-gray">
                                            <TrashIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                            <Link
                                to={`${tool.url ? tool.url : '/chat'}`}
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: '1',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                                className="text-[20px] leading-[24px] text-black my-[22px] font-bold hover:text-blue-400">
                                {tool.title}
                            </Link>
                            <p
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                                dangerouslySetInnerHTML={{ __html: tool.response }}
                                className="text-[#84818A] leading-[20px] text-[15px]">
                            </p>
                        </div>
                    );
                })}
        </div>
    </div>}
</>
  )
}

export default FolderToolsTemplate