import { useContext, useEffect, useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../../../App";
import {
    EditNoteOutlined, BookmarkBorderOutlined,
    MarkChatUnreadOutlined, AutoFixHighOutlined,
    StarBorderOutlined, ContactSupportOutlined,
    CampaignOutlined, LibraryBooksOutlined,
    PersonOutlineOutlined, LogoutOutlined,
    SubscriptionsOutlined, PeopleOutlineOutlined
} from '@mui/icons-material';
import { getOneUser } from "../../../api/userService";
import SwitchAccount from "../items/SwitchAccount";
import { useDataContext } from "../../../context/DataContext";


const Header = ({ onLogout }) => {
    const { state } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const { tags } = useDataContext();

    const getUserprofile = async () => {
        const prof = await getOneUser(state.user._id);
        setProfile(prof);
    }

    useEffect(() => {
        getUserprofile();
    }, [])

    if (!state.user) {
        return (<Navigate to="/login" />)
    }

    return (
        <>
            <header className="px-[28px] hidden lg:flex  bg-white h-[94px] border-b border-[#E8E8E8]">
                <nav className="dashNav lg:flex hidden h-full w-full items-center justify-between">
                    {state.user && <div className="flex">
                        <NavLink to="/chat-with-sophia" className="flex items-center cursor-pointer">
                            <span className="mr-1">
                                <MarkChatUnreadOutlined />
                            </span>
                            <p className="text-[14px] leading-[24px]">Chat</p>
                        </NavLink>
                        <NavLink to="/tools" className="flex pl-[15px] text-gray-400 items-center cursor-pointer">
                            <span className="mr-1">
                                <AutoFixHighOutlined />
                            </span>
                            <p className="text-[14px] leading-[24px]">Tools</p>
                        </NavLink>
                        <div className="relative group">
                            <div className="flex px-[15px] text-gray-400 items-center cursor-pointer">
                                <span className="mr-1">
                                    <LibraryBooksOutlined />
                                </span>
                                <p className="text-[14px] leading-[24px] text-[#969696]">Library</p>
                                <div style={{ zIndex: 9999 }} className="w-[600px] z-10 h-[300px] overflow-y-scroll overflow-x-hidden hidden group-hover:block absolute top-6 bg-white p-4 rounded-[10px] border border-gray-100 shadow-lg">
                                    <div className="grid grid-cols-4 gap-4">
                                        {
                                            tags && tags.map((tag, index) => {
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
                        <div className="relative group">
                            <div className="flex pr-[15px] text-gray-400 items-center cursor-pointer">
                                <span className="mr-1">
                                    <LibraryBooksOutlined />
                                </span>
                                <p className="text-[14px] leading-[24px] text-[#969696]">Personal</p>
                                <div style={{ zIndex: 9999 }} className="w-[600px] h-[200px] overflow-y-scroll overflow-x-hidden hidden group-hover:block absolute top-6 bg-white p-4 rounded-[10px] border border-gray-100 shadow-lg">
                                    <div className="grid grid-cols-3 gap-4">
                                        {
                                            tags && tags.map((tag, index) => {
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
                        <NavLink to="/templates" className="flex text-gray-400 items-center cursor-pointer">
                            <span className="mr-1">
                                <BookmarkBorderOutlined />
                            </span>
                            <p className="text-[14px] leading-[24px]">All Templates</p>
                        </NavLink>
                        <NavLink to="/users-templates" className="pl-[15px] flex text-gray-400 items-center cursor-pointer">
                            <span className="mr-1">
                                <BookmarkBorderOutlined />
                            </span>
                            <p className="text-[14px] leading-[24px]">Users templates</p>
                        </NavLink>
                        <NavLink to="/post-prompt" className="pl-[15px] flex text-gray-400 items-center cursor-pointer">
                            <span className="mr-1">
                                <EditNoteOutlined />
                            </span>
                            <p className="text-[14px] leading-[24px]">Post Prompt</p>
                        </NavLink>
                    </div>}
                    <div className="flex">
                        <NavLink to="/contact-us" className="flex items-center text-gray-400 cursor-pointer px-[15px]">
                            <span className="mr-1">
                                <CampaignOutlined />
                            </span>
                            <p className="text-[14px] leading-[24px]">Feedback</p>
                        </NavLink>
                        <div className="relative">
                            <img className="peer cursor-pointer w-8 h-8 rounded-full object-cover"
                                src={`${profile && profile.img_url ? profile.img_url : '/images/avatar.png'}`} alt="user" />
                            <div style={{ zIndex: 12 }}
                                className="hidden peer-hover:flex hover:flex
                        w-[230px] top-8 right-0 absolute p-4 rounded-[10px]
                        flex-col bg-white drop-shadow-lg p-3 -m-3">
                                <Link to="/profile" className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-1">
                                        <PersonOutlineOutlined />
                                    </span>
                                    Profile</Link>
                                <Link to="/plans" className="flex items-center bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-white">
                                    <span className="mr-1">
                                        <StarBorderOutlined sx={{ color: "white" }} />
                                    </span>
                                    Upgrade</Link>
                                <Link onClick={() => { window.location.href = "/subscription" }} className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-1">
                                        <SubscriptionsOutlined />
                                    </span>
                                    Plan</Link>
                                {state.user.plan === "premium" && <Link to="/members" className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-1">
                                        <PeopleOutlineOutlined />
                                    </span>
                                    Members</Link>}
                                <Link to="/contact-us" className="flex items-center p-2 hover:bg-gray-200">
                                    <span className="mr-1">
                                        <ContactSupportOutlined />
                                    </span>
                                    Contact us</Link>
                                <p onClick={onLogout} className="flex text-gray-400 cursor-pointer items-center p-2 hover:bg-gray-200">
                                    <span className="mr-1">
                                        <LogoutOutlined />
                                    </span>
                                    Log Out</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <SwitchAccount userId={state.user._id} profile={profile} />
        </>
    )
}
export default Header