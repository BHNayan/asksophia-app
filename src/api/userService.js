import axios from "axios";


export const verifyEmail = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error response:", error.response.data.message);
  }
}


// Asynchronous function to register a new user
export const register = async (userData, dispatch) => {
  try {
    // Make a POST request to register the user and receive a response
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users", userData);
    // Dispatch the REGISTER_USER action with the received data as payload
    dispatch({ type: "REGISTER_USER", payload: response.data.message });
  } catch (error) {
    // Dispatch the ERROR action with the error message as payload
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const signupGoogleUser = async (credential, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "auth/google/signup", {credential});
    dispatch({ type: "LOGIN_USER", payload: response.data });

    localStorage.setItem("user__asksophia", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const loginGoogleUser = async (credential, dispatch) => {
 try {
  const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "auth/google/login", {credential});
  if (response.data) {
      dispatch({ type: "LOGIN_USER", payload: response.data });
      localStorage.setItem("user__asksophia", JSON.stringify(response.data));
      return response.data
  }
 } catch (error) {
  dispatch({ type: "ERROR", payload: error.response.data.message });
 }
}


// Asynchronous function to log in a user
export const login = async (userData, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/login", userData);
    // Dispatch the LOGIN_USER action with the received data as payload
    dispatch({ type: "LOGIN_USER", payload: response.data });

    localStorage.setItem("user__asksophia", JSON.stringify(response.data));
  } catch (error) {
    // Dispatch the ERROR action with the error message as payload
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}


export const fetchUsers = async (dispatch, page) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}users?page=${page}`;
  try {
      const response = await axios.get(url, {withCredentials:true});
      dispatch({ type: "FETCH_USERS", users: response.data.users, pages: response.data.pages });
  } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message })
  }
}


export const putUser = async (type, userData, dispatch) => {
  try {
     await axios.put(process.env.REACT_APP_BACKEND_URL + 
      `${type === "admin" ? `users/user/admin/${userData._id}` : "users/user/update"}`, 
      userData, {withCredentials:true, headers: {
        'Content-Type': 'multipart/form-data'
      },});
 
      dispatch({ type: "PUT_USER" });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const updateUserSubscription = async (userData, dispatch) => {
  try {
     await axios.put(process.env.REACT_APP_BACKEND_URL +  "users/user/update-subscription", 
      userData, {withCredentials:true});
      dispatch({ type: "PUT_USER" });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

// Asynchronous function to fetch the authenticated user data
export const fetchAuthUser = async (dispatch) => {
  try {
    // Make a GET request to retrieve the authenticated user data and receive a response
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "users/auth/user", { withCredentials: true });

    // Dispatch the LOGIN_USER action with the received data as payload
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user__asksophia", JSON.stringify(response.data));
  } catch (error) {
    console.log(error)

    // Dispatch the ERROR action with the error message as payload
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}
export const getOneUser = async (id) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "users/user/" + id);
      return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const ContactEmail = async (data) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/contact", data, { withCredentials: true });
    return response;
  } catch (error) {
    console.log("Error response:", error.response.data.message);
  }
}

export const Logout = async (state, dispatch) => {
  dispatch({ type: "LOGOUT" });
  if (state.user && state.user.googleId) {
      await axios.get(process.env.REACT_APP_BACKEND_URL + "auth/logout", { withCredentials: true });
  }
  localStorage.removeItem("user__asksophia");
  dispatch({ type: "RESET" });
}

export const deleteUser = async (id, dispatch) => {
  try {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `users/user/admin/${id}`,  {withCredentials:true});
    dispatch({ type: "DELETE_USER" });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}