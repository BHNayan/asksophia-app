import { useState } from "react";
import PaypalEmailModal from "../Modals/PaypalEmailModal";

const ConnectPaypal = ({ isForSale, handleCheckboxChange, user }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='relative flex justify-between'>
            <div class="flex items-center mb-4">
                <input
                    onClick={handleCheckboxChange}
                    id="isForSale"
                    type="checkbox"
                    checked={isForSale} name="isForSale"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                <label htmlFor="isForSale" className="ml-2 block font-bold text-purple-600 text-[16px] leading-[22px]">For Sale?</label>
            </div>
           {isForSale && !user.isPaypalConnected && <button
                onClick={()=>setOpen(!open)}
                className='rounded-full bg-blue-500 px-4 py-2 text-white'>
                Connect to Paypal
            </button>}
            <PaypalEmailModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default ConnectPaypal