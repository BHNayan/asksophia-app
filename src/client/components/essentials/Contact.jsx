import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../layouts/Header'
import { ContactEmail, Logout } from '../../../api/userService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App'
import { Spinner } from '@material-tailwind/react'

const Contact = () => {
    const { state, dispatch } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [formData, setFormData] = useState({
        firstname: '', lastname: '', subject: '', email: '', message: ''
    })
    const navigate = useNavigate();

    const { firstname, lastname, subject, email, message } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMsg("");
        const res = await ContactEmail(formData);
        if(res.status===200){
            setIsLoading(false);
            setSuccessMsg("Your feedback was sent successfully.");
            setFormData({firstname: '', lastname: '', subject: '', email: '', message: ''});
        } else {
            setIsLoading(false);
            toast.error('Something went wrong', {theme:"dark", position:'bottom-center'});
        }
    }

    const onLogout = async () => {
        await Logout(state, dispatch);
        navigate("/login");
    }
    return (
        <>
            <Helmet>
                <title>
                    Contact Us | AskSophia
                </title>
            </Helmet>
            <Header onLogout={onLogout} />
            <section className='lg:mx-[133px] mx-[40px] my-[42px] lg:h-screen min-h-screen'>
                <Link to="/chat"
                      className='text-[18px] font-medium text-cyan-500'>Go To Home Page</Link>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4'>
                    <div>
                        <h3 className='lg:w-[500px] md:text-[36px] text-[26px] leading-[40px] font-bold mb-[16px]'>We love your hear from you, Get in touch</h3>
                        <p className='text-[#585757] text-[16px] leading-[22px]'>Let us know about your problems</p>
                    </div>
                    <div className='w-96'></div>
                </div>
                <div className='mt-[50px]'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
                            <div className="mb-6">
                                <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    value={firstname}
                                    onChange={handleChange}
                                    name="firstname"
                                    placeholder="First Name"
                                    className="rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    value={lastname}
                                    onChange={handleChange}
                                    name="lastname"
                                    placeholder="Last Name"
                                    className="rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
                                    Subject
                                </label>
                                <input
                                    type='text'
                                    onChange={handleChange}
                                    value={subject}
                                    name="subject"
                                    placeholder="Subject"
                                    className="rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    onChange={handleChange}
                                    value={email}
                                    name="email"
                                    placeholder="Email"
                                    className="rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className="">
                                <label className="mb-2 block font-semibold text-black text-[18px] leading-[24px]">
                                    Describe problem
                                </label>
                                <textarea
                                    rows="4"
                                    onChange={handleChange}
                                    value={message}
                                    name="message"
                                    placeholder="Write down your problem here..."
                                    className="rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400"
                                />
                            </div>
                           {!isLoading && successMsg && <div className='w-full flex justify-end mt-4'>
                                    <p className='block font-medium text-green-500'>{successMsg}</p>
                            </div>}
                            <div className='w-full flex justify-end mt-2'>
                               {isLoading ? <>
                               <Spinner className='w-16 h-16' />
                               </> : 
                                <button className='text-white bg-blue-400 rounded-full px-4 py-2'>Send</button>
                               }
                            </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Contact