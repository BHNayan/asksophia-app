import moment from 'moment';
import AddMember from '../components/Modals/AddMember';
import { useContext, useEffect, useReducer, useState } from 'react';
import { accountReducer } from '../../Reducers/accountReducer';
import { initialState } from '../../Reducers/authReducer';
import { fetchAccounts, removeUserFromAccount } from '../../api/accountServices';
import { UserContext } from '../../App';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Members = () => {
    const [open, setOpen] = useState(false);
    const {state} = useContext(UserContext)
    const [accountState, dispatch] = useReducer(accountReducer, initialState);
    const {accounts} = accountState;

    const fetchAddedMembers = async ()=>{
        if(state.user.plan === "premium"){
            await fetchAccounts(dispatch, state.user._id)
        }
    }
   
    useEffect(()=>{
        fetchAddedMembers();
    },[])
    
    const removeMember = async (memberId)=>{
        if(state.user.plan === "premium"){
            alert('Are you sure you want to remove this member?')
            await removeUserFromAccount(dispatch, accounts._id, memberId);
        } else {
            alert('Not Authorized')
        }
        
    }

    return (
        <>
        <section className='lg:mx-[133px] mx-[80px] mt-[42px] h-screen'>
                    <div className='flex justify-between items-center mb-[30px]'>
                        <div>
                            <h3 className='text-[36px] leading-[40px] font-bold mb-[16px]'>Account Members</h3>
                            <p className='text-gray-800 text-[16px] leading-[22px]'>Your workspace was created on </p>
                        </div>
                        <div className=''>
                            <p className='font-semibold text-[#A0A0A0] text-[20px] leading-[26px]'> {moment(new Date()).format('dddd')}</p>
                            <p className='font-medium text-[15px] leading-[20px]'> {moment(new Date()).format('DD MMMM YYYY')}</p>
                        </div>
                    </div>
                    <div className='bg-white rounded-[10px] border border-gray-100 p-[30px]'>
                    <div className='my-4'>
                        <button onClick={()=>setOpen(true)} className='bg-cyan-400 rounded-full px-4 py-2 text-white'>Add New Members</button>
                    </div>
                    {accountState && accounts && accounts.members 
                    && accounts.members.length > 1
                     ? accounts.members.map((item) => {
                        return item._id !== state.user._id && 
                        <div key={item._id} className='flex justify-between border border-gray-100 mb-3 shadow-md rounded-md px-6 py-3'>
                                {item.email}
                                <span onClick={()=>removeMember(item._id)}
                                className='cursor-pointer'
                                ><DeleteOutlineOutlinedIcon/></span>
                        </div>
                    }) : <>
                    <p className='text-gray-800 text-[16px] leading-[22px]'>You have not added any members to your account</p>
                    </>}
                    </div>
                </section>
                <AddMember
                fetchAddedMembers={fetchAddedMembers} 
                open={open} 
                setOpen={setOpen} 
                dispatch={dispatch}
                accountState={accountState}/>
        </>
    )
}

export default Members