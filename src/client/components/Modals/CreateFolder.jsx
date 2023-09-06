import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { postFolder } from "../../../api/foldersService";
 
export default function CreateFolder({open, setOpen, dispatch, getUserFolders, state, folderType}) {
    const handleOpen = () => setOpen(!open);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title){
            toast.error('Please enter a title');
            return;
        }
        const data = {title, description, owner:state.user._id, folderType}
        await postFolder(data, dispatch);
        setTitle('');
        setDescription('');
        dispatch({ type: "RESET" })
        setOpen(false);
        await getUserFolders()
    }
   
  return (
    <>
      { <Dialog open={open} handler={handleOpen} className="min-w-[98%] md:min-w-[50%]">
        <DialogHeader>Create New Folder</DialogHeader>
        <DialogBody divider>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-md font-medium text-gray-700">
                 title<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input 
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  type="title" 
                  name="title"
                  className="outline-0 border border-gray-300 rounded-md shadow-sm px-4 py-2 block w-full" />
              </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-md font-medium text-gray-700">
                 Description (Optional)
                </label>
                <div className="mt-2">
                  <input 
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  type="description" 
                  name="description"
                  className="outline-0 border border-gray-300 rounded-md shadow-sm px-4 py-2 block w-full" />
              </div>
              </div>
            </form>
        </DialogBody>
        <DialogFooter>
        <Button
            variant="text"
            className="mx-2"
            onClick={handleOpen}
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>}
    </>
  );
}