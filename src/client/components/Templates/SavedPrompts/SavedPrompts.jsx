import { useContext, useEffect, useReducer } from 'react'
import { initialState, promptReducer } from '../../../../Reducers/promptReducer';
import { getUserSavedPrompts } from '../../../../api/promptService';
import { UserContext } from '../../../../App';
import { Link } from 'react-router-dom';

const SavedPrompts = ({prompts}) => {

  const [promptState, dispatch] = useReducer(promptReducer, initialState);
  const {state}= useContext(UserContext)

  const getUserPrompts = async () => {
    await getUserSavedPrompts(state.user._id, dispatch);
  }

  useEffect(() => {
    getUserPrompts()
  }, [prompts])

  return (
    <div className='bg-white rounded-[10px] lg:h-[620px] h-auto border border-gray-100 py-8 px-[22px]'>
        <h3 className='text-[20px] text-black leading-[24px] font-semibold'>Saved prompts</h3>
        <div className={` ${promptState && promptState.saved_prompts.length>0 ? '' : 
        'h-[300px] border-b border-gray-100 items-center'} 
        flex flex-col justify-center  mb-[18px]`}>
            {promptState && promptState.saved_prompts.length>0 ? 
            <>
              <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mt-4'>
              {promptState.saved_prompts.map((prompt) => {
                return <Link key={prompt._id} to={`/use-prompt/${prompt._id}`}
                 className="text-center rounded-md border border-gray-300 px-6 py-3 
                 text-md font-normal hover:bg-gray-100">{prompt.title}</Link>
              })}
              </div>
            </> :
            <>
            <img src="/images/icons/saved.png" alt="no prompts icon" />
            <p className="mt-4 text-black leading-[24px] text-[15px] font-normal">You don’t have any saved prompts</p>
            </>
            }
        </div>
    </div>
  )
}

export default SavedPrompts