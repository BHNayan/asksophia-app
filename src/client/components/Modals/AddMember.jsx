import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { addUserToAccount } from "../../../api/accountServices";
import { UserContext } from "../../../App";
 
export default function Modal({open, setOpen, dispatch, accountState, fetchAddedMembers}) {
    const handleOpen = () => setOpen(!open);
    const [email, setEmail] = useState('');
    const {state} = useContext(UserContext);
    const {isSuccess, isError, message} = accountState;

    useEffect(() => {
      if(isSuccess){
        toast.success(message);
      } else if(isError){
        toast.error(message);
      }
      dispatch({type: 'RESET'})
    }, [isSuccess, isError, message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email){
            toast.error('Please enter email');
            return;
        }
        await addUserToAccount(dispatch, state.user.account, email);
        setEmail('');
        await fetchAddedMembers()
        setOpen(false);
    }
   
  return (
    <>
      { <Dialog open={open} handler={handleOpen} className="min-w-[98%] md:min-w-[50%]">
        <DialogHeader>Add members to your account</DialogHeader>
        <DialogBody divider>
            <form>
              <div>
                <label htmlFor="email" className="block text-md font-medium text-gray-700">
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email" 
                  name="email"
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