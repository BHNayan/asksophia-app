
const DropDown = ({openDrop, removeProject, id, setAdd, folders}) => {
  return (
   <>
    {openDrop && <div className="z-10 absolute left-[77px] md:right-0 top-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
    <ul className="py-2 text-sm text-gray-700">
      <li>
        <p onClick={()=>setAdd(folders > 0)}
        className="cursor-pointer block px-4 py-2 hover:bg-gray-100">Add to folder</p>
      </li>
      <li>
        <p className="cursor-pointer block px-4 py-2 hover:bg-gray-100" 
        onClick={() => removeProject(id)}>Delete</p>
      </li>
    </ul>
</div>}
   </>
  )
}

export default DropDown