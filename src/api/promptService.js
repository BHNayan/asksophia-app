import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllPrompts = async (topic, dispatch, page, order) => {
    const url = topic
        ? `${process.env.REACT_APP_BACKEND_URL}prompts/${topic}?page=${page}&order=${order}`
        : `${process.env.REACT_APP_BACKEND_URL}prompts?page=${page}&order=${order}`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "FETCH_PROMPTS", prompts: response.data.prompts, pages: response.data.pages });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}


export const fetchUserPrompts = async (id, dispatch, page) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}prompts/user/` + id + `?page=${page}`;
    try {
        const response = await axios.get(url);
        
        dispatch({ type: "USER_PROMPTS", prompts: response.data.prompts, pages: response.data.pages });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}

export const postPrompt = async (data, dispatch) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}prompts`, data);
        dispatch({ type: "ADD_PROMPT" });
        return result;
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}
export const editPrompt = async (id, data, dispatch) => {
    try {
        const result = await axios.put(`${process.env.REACT_APP_BACKEND_URL}prompts/edit/` + id, data);
        dispatch({ type: "EDIT_PROMPT" });
        return result;
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const getOnePrompt = async (id, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prompts/prompt/` + id);
        dispatch({ type: "SINGLE_PROMPT", payload: response.data });
        return response.data
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}

export const getUserSavedPrompts = async (id, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prompts/` + id + '/savedprompts');
        dispatch({ type: "SAVED_PROMPTS", payload: response.data });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}
export const getPromptsByTopic = async (topic, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prompts/` + topic);
        dispatch({ type: "TOPIC", payload: response.data });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}


export const deletePrompt = async (id, dispatch) => {
    try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}prompts/` + id);
        dispatch({ type: "DELETE_PROMPT", payload: id });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

