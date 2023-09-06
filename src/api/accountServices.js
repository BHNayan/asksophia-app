import axios from "axios";
axios.defaults.withCredentials = true;



export const addUserToAccount = async (dispatch, accountId, emailToAdd) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}account/${accountId}/user`;
    try {
      const response = await axios.post(url, { emailToAdd });
      dispatch({ type: "ADD_USER_TO_ACCOUNT", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  }

  
export const fetchAccounts = async (dispatch, userId) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}account/${userId}/accounts`;
    try {
      const response = await axios.get(url);
     
      dispatch({ type: "FETCH_ACCOUNTS", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  }


export const getUserBelongsToAccounts = async (dispatch, userId) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}account/${userId}/member`;
    try {
      const response = await axios.get(url);
      dispatch({ type: "FETCH_ACCOUNTs_MEMBER", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  }

export const switchAccountFunc = async(connectedId, dispatch, userId, accountId)=>{
  const url = `${process.env.REACT_APP_BACKEND_URL}account/${userId}/current-account`;
  try {
    const response = await axios.put(url,{ accountId, connectedId });
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user__asksophia", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}
export const switchOriginalAccount = async(dispatch, userId)=>{
  const url = `${process.env.REACT_APP_BACKEND_URL}account/${userId}/original-account`;
  try {
    const response = await axios.get(url);
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user__asksophia", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const removeUserFromAccount = async (dispatch, accountId, memberId) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}account/${accountId}/member/${memberId}`;
    try {
      const response = await axios.delete(url);
      dispatch({ type: "DELETE_ACCOUNT", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
  }
