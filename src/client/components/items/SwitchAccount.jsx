import { useContext, useEffect, useReducer, useState } from "react";
import { accountReducer, initialState } from "../../../Reducers/accountReducer"
import { getUserBelongsToAccounts, switchAccountFunc, switchOriginalAccount } from "../../../api/accountServices";
import { UserContext } from "../../../App";
import { getOneUser } from "../../../api/userService";

const SwitchAccount = ({userId}) => {
    const [accountState, dispatchAccount] = useReducer(accountReducer, initialState);
    const [childUser, setChildUser] = useState(null);
    const {state, dispatch} = useContext(UserContext);
    const {account_member} = accountState;
    const {user}= state;
    const getAccounts = async () => { await getUserBelongsToAccounts(dispatchAccount, userId);}
    const isChildUser = async () => {
        const child = await getOneUser(user.userAccessingAccount)
        setChildUser(child);
    }

    const switchAccount = async (user_id, accountId)=>{
        await switchAccountFunc(user._id, dispatch, user_id, accountId);
        window.location.reload()
    }
    const goBackToAccount = async (user_id)=>{
        await switchOriginalAccount(dispatch, user_id);
        window.location.reload()
    }

    useEffect(()=>{
        getAccounts();
        isChildUser();
    }, [])

  return (
   <>
   {!user.userAccessingAccount ? <>
   {accountState && account_member && account_member.length > 0 &&
    account_member.map((account, index) => {
        return <div key={account.members[index]} className="py-4 px-[28px]  mb-4 text-md text-yellow-900 rounded-lg bg-yellow-50">
        <span className="font-medium">Login As </span> 
        <span 
         onClick={()=>switchAccount(account.owner._id, account._id)}
         className="font-semibold hover:underline cursor-pointer">{account.owner.email}</span>
    </div>
    })
    } </>  : <>
    {childUser &&
    <div className="py-4 px-[28px]  mb-4 text-md text-yellow-900 rounded-lg bg-yellow-50">
        <span className="font-medium">Go Back to your account </span> 
        <span 
         onClick={()=>goBackToAccount(childUser._id)}
         className="font-semibold hover:underline cursor-pointer">{childUser.email}</span>
    </div>} </>
   }
   </>
  )
}

export default SwitchAccount