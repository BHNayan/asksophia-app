import { Helmet } from 'react-helmet-async'
import Header from '../layouts/Header'
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import moment from 'moment';
import { WORDS_COUNT } from '../../../config/constants';
import MobileNav from '../layouts/MobileNav';

const TrackSubs = () => {
    const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 960);
    const [open, setOpen] = useState(false);

    const { state, userWords } = useContext(UserContext);

    const calculateValue=((userWords/WORDS_COUNT)*100).toFixed(0);
    return (
    <>
            <Helmet>
                <title>
                    Subscription | AskSophia
                </title>
            </Helmet>
            <Header />
            <MobileNav 
                user={state.user}
                open={open} 
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                setOpen={setOpen} />
            <section className='2xl:mx-[133px] md:mx-[80px] mx-2 mt-[42px] lg:h-screen min-h-screen'>
                <div className='flex justify-between items-center mb-[30px]'>
                    <div>
                        <h3 className='text-[36px] leading-[40px] font-bold mb-[16px]'>Subscription</h3>
                        <p className='text-gray-800 text-[16px] leading-[22px]'>Your workspace was created on {moment(state.user.createdAt).format('DD MMMM YYYY')}.</p>
                    </div>
                    <div className='md:flex hidden items-center'>
                        <p className='font-semibold text-[#A0A0A0] text-[20px] leading-[26px] mr-2'> {moment(new Date()).format('dddd')}</p>
                        <p className='font-medium text-[15px]'> {moment(new Date()).format('DD MMMM YYYY')}</p>
                    </div>
                </div>
                <div className='bg-white rounded-[10px] border border-gray-100 p-[30px]'>
                <div className='flex md:flex-row flex-col'>
                    <div className='xl:w-1/5 md:w-1/2 w-full'>
                        <p className='font-semibold text-[20px] leading-[24px]'>Words Generated</p>
                        <div className='h-[279px] w-[297px] my-[30px]'>
                            <CircularProgressbar 
                            value={userWords !== null ? calculateValue : 100}
                            text={`${userWords !== null  ? calculateValue : ''}%`} />
                        </div>
                        <div className='flex justify-between items-center mb-[20px]'>
                            <div className='flex items-center'>
                                <div className="rounded-full w-[18px] h-[18px] bg-gray-100 mr-3"></div>
                                <div className="font-medium text-[16px]">Total</div>
                            </div>
                            <p className='font-medium text-[16px]'>{userWords !== null ? userWords : 'Infinite'}</p>
                        </div>
                        <div className='flex justify-between items-center mb-[20px]'>
                            <div className='flex items-center'>
                                <div className="rounded-full w-[18px] h-[18px] bg-[#F84A93] mr-3"></div>
                                <div className="font-medium text-[16px]">Words generated</div>
                            </div>
                            <p className='font-medium text-[16px]'>{userWords!== null ? WORDS_COUNT - userWords : 'Infinite'}</p>
                        </div>
                        <Link to="/chat-history"
                        className='flex justify-center text-[16px] font-semibold px-[30px] py-[14px] text-cyan-600 bg-cyan-200 rounded-full'>
                            See generation history</Link>
                    </div>
                    <div className='mt-4 md:mt-0 xl:w-4/5 md:w-1/2 w-full xl:ml-[118px] md:ml-[60px] ml-0'>
                        <p className='font-semibold text-[20px] leading-[24px]'>Upgrade</p>
                        <p className='text-gray-800 text-[16px] leading-[22px]'>Get more words per month by upgrading today!</p>
                        <div className=' my-[20px]'>This is a switch</div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className='bg-gray-200 px-4 py-8 rounded-[10px]'>
                                <div className='pb-12 border-b border-b-gray-100'>
                                    <button className='bg-[#2DF880] mb-4 rounded-full px-4 py-2 font-semibold'>Pro</button>
                                    <h3 className='font-bold text-[36px] leading-[42px]'>Unlimited Words</h3>
                                </div>
                                <div className='pt-12'>
                                    <p className='font-bold text-[26px] mb-[10px] leading-[24px]'>$35 <span className='text-[20px] text-gray-500 font-semibold'>/month</span> </p>
                                    <p className='text-[16px] mb-8 leading-[22px] text-gray-800'>Billed monthly</p>
                                    <Link to="/plans" className="bg-black text-white font-semibold text-[18px] leading-[20px] p-4 rounded-full">Upgrade Now!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            </>
  )
}

export default TrackSubs