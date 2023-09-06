
const ProjectsFolderHeader = ({open, setOpen}) => {
    return (
        <div className="flex flex-col mb-[20px]">
            <h3 className="text-[28px] leading-[40px] font-semibold mb-4">
                Your Folders
            </h3>
            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-[16px] text-gray-800 font-normal leading-[22px]">
                    Automatically generate high-quality content To Try
                </p>
                <button
                    onClick={()=>setOpen(!open)}
                    type="button"
                    className="bg-cyan-400 md:mt-0 mt-4 rounded-full px-4 py-2 text-white"
                >
                    New Folder
                </button>
            </div>
        </div>
    )
}

export default ProjectsFolderHeader 