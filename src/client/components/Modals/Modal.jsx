import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
 
export default function Modal({open, setOpen, tool}) {
    const handleOpen = () => setOpen(!open);
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = text => {
        navigator.clipboard.writeText(text).then(function() {
         setIsCopied(true);
         setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        }, function(err) {
          setIsCopied(false);
        });
      };
  return (
    <>
      {tool && <Dialog open={open} handler={handleOpen} className="min-w-[98%] md:min-w-[50%]">
        <DialogHeader>{tool.title}</DialogHeader>
        <DialogBody divider>
            <div className="flex justify-center items-center my-2">
                <img src="/images/sophia_longhair.png" alt="AskSophia"/>
            </div>
            <div dangerouslySetInnerHTML={{ __html: tool.response }}></div>
        </DialogBody>
        <DialogFooter>
        {isCopied && <div>Copied!</div>}
        <Button
            variant="text"
            onClick={copyToClipboard}
            className="mx-2"
          >
            <span>Copy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>}
    </>
  );
}