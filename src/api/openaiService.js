import axios from "axios";
axios.defaults.withCredentials = true;

// Define an async function to get a response from the ChatGPT API
export const getResponse = async (prompt) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + "chatgpt",
    { prompt }
  );
  return response.data.result;
};

export const getChatResponse = async (chatData) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + "chat-sophia",
    { chatData }
  );
  return response.data.result;
};

export const saveChat = async (chatData, conversId) => {
  const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "save-chat", { chatData, conversId })
  return response.data
}

export const getChatHistory = async (conversId) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}chat-history/get/${conversId}`;
  try {
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.log(error)
  }
}

export const fetchAllChats = async (dispatch, page, userId) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}chat-history/${userId}?page=${page}`;
  try {
      const response = await axios.get(url);
      dispatch({ type: "USER_CHATS", chats: response.data.chats, pages: response.data.pages });
  } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message })
  }
}


export const deleteChat = async (id, dispatch) => {
  try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}chat-history/` + id);
      dispatch({ type: "DELETE_CHAT", payload: id });
  } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}


export const getImage = async (prompt) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + "image",
    { prompt }
  );
  return response.data;
};

// Define an async function to export data to an Excel file
export const exportToExcel = async (output) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/export`,
      { output },
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};
