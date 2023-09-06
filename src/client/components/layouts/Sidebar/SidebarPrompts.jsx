import DropdownItem from "../../items/DropDownItem"

const SidebarPrompts = ({prompts}) => {
  return (
    <>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <ul>
                        {prompts && <DropdownItem title="My prompts" items={prompts} type="saved" /> }
                    </ul>
                </div>
            </div>
        </>
  )
}

export default SidebarPrompts
