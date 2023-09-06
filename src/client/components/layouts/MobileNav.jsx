import { useEffect} from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
    EditNoteOutlined, BookmarkBorderOutlined,
    MarkChatUnreadOutlined, AutoFixHighOutlined,
    StarBorderOutlined, ContactSupportOutlined,
    CampaignOutlined, LibraryBooksOutlined,
    PersonOutlineOutlined, LogoutOutlined,
    SubscriptionsOutlined, PeopleOutlineOutlined,
    MenuOpenOutlined, MenuOutlined,
    CloseOutlined
} from '@mui/icons-material';
import { useDataContext } from '../../../context/DataContext';

const MobileNav = ({ open, setOpen, openSidebar, setOpenSidebar, onLogout, user, profile }) => {
    const location = useLocation();
    const {tags}=useDataContext();

    const handleSidebarOpen = () =>{
        setOpen(false);
        setOpenSidebar(!openSidebar);
    }
    const handleOpen = () =>{
        setOpenSidebar(false);
        setOpen(!open);
    }

    useEffect(() => {
        setOpen(false);
        setOpenSidebar(false);
     }, [location]);
     

    return (
        <header className="px-[28px] lg:hidden flex bg-white h-[94px] border-b border-[#E8E8E8]">
        <nav className="mobileNav h-full w-full flex lg:hidden justify-between items-center 2xl:py-4 py-3">
            <div className='flex justify-between w-full'>
                <Link to="/chat" className="flex items-center justify-center cursor-pointer">
                    <img src="/images/asksophialogo.jpeg" className="w-[150px]" alt="AskSophia logo" />
                </Link>
                <div className='flex lg:hidden items-center'>
                   {window.location.pathname != '/subscription' &&
                    <div onClick={handleSidebarOpen} className="mr-2 cursor-pointer">
                        {openSidebar ? <MenuOpenOutlined sx={{ fontSize: 30 }} className='text-cyan-400 ' /> : 
                        <MenuOpenOutlined sx={{ fontSize: 30 }} className='text-cyan-400 rotate-180' />}
                    </div>}
                    <div onClick={handleOpen} className="cursor-pointer">
                    {open ? <CloseOutlined sx={{ fontSize: 30 }} /> : 
                        <MenuOutlined sx={{ fontSize: 30 }} />}
                    </div>
                </div>
            </div>
            <div className={`shadow-lg lg:z-auto z-[12] left-0 w-full lg:w-auto px-12 transition-all border-b border-gray-200 duration-500 ease-in lg:flex lg:pb-0 pb-12 absolute lg:static bg-white lg:items-center text-md ${open ? 'top-20' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
                <div className="flex flex-col">
                    <NavLink to="/chat-with-sophia" className="flex my-4 items-center cursor-pointer">
                        <span className="mr-3">
                            <MarkChatUnreadOutlined />
                        </span>
                        <p className="text-[16px] leading-[24px]">Chat</p>
                    </NavLink>
                    <NavLink to="/tools" className="flex mb-4 text-gray-400 items-center cursor-pointer">
                        <span className="mr-3">
                            <AutoFixHighOutlined />
                        </span>
                        <p className="text-[16px] leading-[24px]">Tools</p>
                    </NavLink>
                    <div className="relative group mb-4">
                        <div className="flex text-gray-400 items-center cursor-pointer">
                            <span className="mr-3">
                                <LibraryBooksOutlined />
                            </span>
                            <p className="text-[16px] leading-[24px] text-[#969696]">Templates Library</p>
                            <div style={{ zIndex: 12 }} className="h-[300px] overflow-y-scroll overflow-x-hidden hidden group-hover:block absolute top-6 bg-white p-4 rounded-[10px] border border-gray-100 shadow-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    {
                                        tags.map((tag, index) => {
                                            if (tag.tag_type === "personal") {
                                                return null;
                                            }
                                            return <Link to={`/templates/${tag.title}`} key={index} className={`text-center px-3 py-1 rounded-full text-[13px] border`}
                                                style={{ color: tag.color, borderColor: tag.color, background: tag.bgColor }}>{tag.title}</Link>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative group mb-4">
                        <div className="flex text-gray-400 items-center cursor-pointer">
                            <span className="mr-3">
                                <LibraryBooksOutlined />
                            </span>
                            <p className="text-[16px] leading-[24px] text-[#969696]">Personal Templates</p>
                            <div style={{ zIndex: 12 }} className="h-[200px] overflow-y-scroll overflow-x-hidden hidden group-hover:block absolute top-6 bg-white p-4 rounded-[10px] border border-gray-100 shadow-lg">
                                <div className="grid grid-cols-1 gap-4">
                                    {
                                        tags.map((tag, index) => {
                                            if (tag.tag_type === "library") {
                                                return null;
                                            }
                                            return <Link to={`/tools/${tag.title}`} key={index} className={`text-center px-3 py-1 rounded-full text-[13px] border`}
                                                style={{ color: tag.color, borderColor: tag.color, background: tag.bgColor }}>{tag.title}</Link>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <NavLink to="/templates" className="flex text-gray-400 mb-4 items-center cursor-pointer">
                        <span className="mr-3">
                            <BookmarkBorderOutlined />
                        </span>
                        <p className="text-[16px] leading-[24px]">All Templates</p>
                    </NavLink>
                    <NavLink to="/users-templates" className="flex text-gray-400 mb-4 items-center cursor-pointer">
                            <span className="mr-1">
                                <BookmarkBorderOutlined />
                            </span>
                            <p className="text-[16px] leading-[24px]">Templates</p>
                        </NavLink>
                    <NavLink to="/post-prompt" className="flex mb-4 text-gray-400 items-center cursor-pointer">
                        <span className="mr-3">
                            <EditNoteOutlined />
                        </span>
                        <p className="text-[16px] leading-[24px]">Post Prompt</p>
                    </NavLink>
                    <NavLink to="/contact-us" className="flex mb-4 items-center text-gray-400 cursor-pointer">
                        <span className="mr-3">
                            <CampaignOutlined />
                        </span>
                        <p className="text-[16px] leading-[24px]">Feedback</p>
                    </NavLink>
                    <div className="flex items-center relative">
                        <div className='mr-3'>
                            <img className="peer cursor-pointer w-8 h-8 rounded-full"
                                src={`${profile && profile.img_url ? profile.img_url : '/images/avatar.png'}`}
                                alt="user" />
                            <div style={{ zIndex: 12 }}
                                className="hidden peer-hover:flex hover:flex
                        w-[230px] top-8 left-0 absolute p-4 rounded-[10px]
                        flex-col bg-white drop-shadow-lg">
                                <Link to="/profile" className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-3">
                                        <PersonOutlineOutlined />
                                    </span>
                                    Profile</Link>
                                <Link to="/plans" className="flex items-center bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-white">
                                    <span className="mr-3">
                                        <StarBorderOutlined sx={{ color: "white" }} />
                                    </span>
                                    Upgrade</Link>
                                <Link onClick={()=>{window.location.href="/subscription"}}
                                 className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-3">
                                        <SubscriptionsOutlined />
                                    </span>
                                    Plan</Link>
                                {user.plan === "premium" && <Link to="/members" className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-3">
                                        <PeopleOutlineOutlined />
                                    </span>
                                    Members</Link>}
                                <Link to="/contact-us" className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-3">
                                        <ContactSupportOutlined />
                                    </span>
                                    Contact us</Link>
                                <p onClick={onLogout} className="flex text-gray-400 cursor-pointer items-center p-2 hover:bg-gray-200">
                                    <span className="mr-3">
                                        <LogoutOutlined />
                                    </span>
                                    Log Out</p>
                            </div>
                        </div>
                        <p className=" text-gray-400 cursor-pointer text-[16px] leading-[24px]">Profile</p>
                    </div>
                </div>
            </div>
        </nav>
        </header>
    )
}

export default MobileNav