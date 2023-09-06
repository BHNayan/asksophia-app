import { sidebar_tools } from "../../../../config/sidebar"
import DropdownItem from "../../items/DropDownItem"

const SidebarTools = () => {
    return (
        <>
            <h3 className="my-[20px] text-[18px] font-semibold leading-[24px]">All Templates</h3>
            <div className="flex flex-col" style={{ minHeight: "100vh" }}>
                <div className="">
                    <div className="flex flex-col">
                        <ul>
                            {sidebar_tools.map((item) => (
                                <DropdownItem key={item.id} id={item.id} title={item.title} items={item.items} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarTools