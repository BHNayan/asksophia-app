import { useContext, useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import MobileNav from "./MobileNav";
import { Logout } from "../../../api/userService";
import { UserContext } from "../../../App";
import { Navigate, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {

    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 960);
    const [open, setOpen] = useState(false);

    const onLogout = async () => {
        await Logout(state, dispatch);
        navigate("/login");
    }

    if (!state.user) {
        return (<Navigate to="/login" />)
    }

    return (
        <>
            <div className="flex w-full">
                <Sidebar
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                />
                <div className="lg:ml-[288px] flex flex-col w-full">
                    <Header onLogout={onLogout} />
                    <MobileNav onLogout={onLogout} 
                    open={open} 
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
                    setOpen={setOpen} user={state.user} />
                    {children}
                </div>
            </div>
        </>
    )
}
export default Layout