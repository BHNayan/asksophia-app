import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
    EmailIcon,
    FacebookIcon,
    InstapaperIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
  } from "react-share";
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

export default function SocialMedia({open, handleOpen, title}) {

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="min-w-[98%] md:min-w-[50%]">
        <DialogHeader>Share {title ? title : ''}</DialogHeader>
        <DialogBody divider>
            <div className="flex justify-center items-center my-2">
                <img src="/images/sophia_longhair.png" alt="AskSophia"/>
            </div>
            <div>
          <div className="flex justify-center items-center">
          <FacebookShareButton url={window.location.href} className="mr-2">
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton className="mr-2"
                title={title ? title : ''}
                url={window.location.href}
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <InstapaperShareButton className="mr-2"
                title={title ? title : ''}
                url={window.location.href}
            >
                <InstapaperIcon size={32} round />
            </InstapaperShareButton>
            <EmailShareButton className="mr-2"
                title={title ? title : ''}
                url={window.location.href}
            >
                <EmailIcon size={32} round />
            </EmailShareButton>
            <LinkedinShareButton className="mr-2"
                title={title ? title : ''}
                url={window.location.href}
            >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton className="mr-2"
                title={title ? title : ''}
                url={window.location.href}
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
            </div>
        </DialogBody>
        <DialogFooter>
  
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}