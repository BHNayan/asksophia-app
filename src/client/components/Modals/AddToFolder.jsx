import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { assignToolToFolder } from "../../../api/foldersService";


export default function AddToFolder({ dispatch, open, setOpen, folders, toolId, getUserProjects }) {
    const handleOpen = () => setOpen(!open);
    const [folderId, setFolderId] = useState("");

    const handleSubmit = async ()=>{
        await assignToolToFolder(folderId, toolId, dispatch);
        setOpen(false);
        setFolderId("");
        await getUserProjects();
        dispatch({type:"RESET"});
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen} className="min-w-[98%] md:min-w-[50%]">
                <DialogBody>
                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
                        {folders && folders.length > 0 &&
                            folders.map((folder) => {
                                return <div key={folder._id}
                                 className="flex items-center pl-2 border border-gray-100 rounded">
                                    <input id="tool"
                                        type="radio"
                                        value={folder._id}
                                        onChange={(e)=>{setFolderId(e.target.value)}}
                                        name="tool"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                    <label htmlFor="tool" className="w-full py-4 ml-2 text-sm font-medium text-gray-900">{folder.title}</label>
                                </div>
                            })
                        }
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" className="mr-2" onClick={handleOpen}>
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        <span>Submit</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}