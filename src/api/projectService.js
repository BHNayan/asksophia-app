import axios from "axios";
axios.defaults.withCredentials = true;


export const fetchUserProjects = async (id, dispatch, page) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}projects/user/` + id + `?page=${page}`;
    try {
        const response = await axios.get(url);
 
        dispatch({ type: "USER_PROJECTS", projects: response.data.projects, pages: response.data.pages });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}

export const postProject = async (data, dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}projects`, data);
        dispatch({ type: "ADD_PROJECT" });
        return res.data;
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const editProject = async (chatId,data, dispatch) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}projects/edit/`+chatId, data);
        dispatch({ type: "EDIT_PROJECT" });
        return res.data;
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const getOneProject = async (id, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}projects/` + id);
        dispatch({ type: "SINGLE_PROJECT", payload: response.data });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}


export const deleteProject = async (id, dispatch) => {
    try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}projects/` + id);
        dispatch({ type: "DELETE_PROJECT", payload: id });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

