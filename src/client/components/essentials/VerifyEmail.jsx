import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../../../api/userService";

const VerifyEmail = () => {
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            const url = `${process.env.REACT_APP_BACKEND_URL}users/${param.id}/verify/${param.token}`;
            await verifyEmail(url);
        };
        verifyEmailUrl();
    }, [param]);


    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
                <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                    <h3 className="text-2xl">Thanks for signing up for AskSophia</h3>
                    <div className="w-full flex flex-col justify-center items-center">
                        <img src="/images/whiteLogo.png" alt="asksophia logo" className="w-[200px] my-4" />
                        <img src="/images/sophia_longhair.png" alt="asksophia logo" className="w-[150px] mb-4" />
                    </div>
                    <div>
                        <p className="mb-4">Your email address is verified Click on:</p>
                        <Link to="/login" className="w-full text-[18px] bg-[#3E7EFF] rounded-md px-4 py-2 text-white">login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VerifyEmail