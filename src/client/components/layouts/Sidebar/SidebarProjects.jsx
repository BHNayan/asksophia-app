import DropdownItem from "../../items/DropDownItem"

const SidebarProjects = ({ projects }) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <ul>
                        {projects && <DropdownItem title="My projects" items={projects} type="saved" />}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SidebarProjects