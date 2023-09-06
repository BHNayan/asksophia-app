import React, { useEffect } from 'react'
import { getOneUser } from '../api/userService';

const useWords = (state, setUserWords) => {

    useEffect(() => {
        if(state.user){
          const getUserWords = async () => {
          const currentUser = await getOneUser(state.user._id);
           setUserWords(currentUser.words);
         }
         getUserWords();
       
        }
      }, [state.user, setUserWords]);

  return (
    <></>
  )
}

export default useWords