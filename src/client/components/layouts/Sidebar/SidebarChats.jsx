import DropdownItem from "../../items/DropDownItem"

const SidebarChats = ({chats}) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <ul>
                        {chats && <DropdownItem title="Chat" items={chats} type="saved" />}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SidebarChats