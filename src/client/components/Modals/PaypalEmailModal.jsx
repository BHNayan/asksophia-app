import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from 'react-toastify';

const PaypalEmailModal = ({ open, setOpen }) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(process.env.REACT_APP_BACKEND_URL + "paypal/callback", { email });
            setOpen(false);
            setIsLoading(false);
            setEmail("");
        } catch (error) {
            toast.error("Something went wrong");
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} size={"md"} handler={handleOpen} className='relative'>
             {isLoading && <div className="z-10 absolute h-full w-full top-0 
             left-0 flex justify-center items-center" 
             style={{background:"rgba(255,255,255, 0.6)"}}>
                <Spinner className='w-16 h-16' />
            </div>}
            <DialogBody divider>
                <div className='w-full flex items-center justify-center'>
                    <img
                        width={200}
                        src="/images/logos/paypalLogo.png"
                        alt="paypal logo"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='mb-2 block font-bold text-black text-[18px] leading-[24px]'>Paypal Email</label>
                        <input
                            required
                            type="email"
                            placeholder="Your paypal's Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className='rounded-[10px] w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400'
                        />
                    </div>
                </form>
            </DialogBody>
            <DialogFooter className='bordet-0'>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen(null)}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="blue"
                    onClick={handleSubmit}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default PaypalEmailModal