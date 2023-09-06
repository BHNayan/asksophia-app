import axios from "axios";
axios.defaults.withCredentials = true;



export const fetchUserFolders = async (id, dispatch, page, folderType) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}folders/user/` + id + `?page=${page}&folderType=${folderType}`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "USER_FOLDERS", folders: response.data.folders, pages: response.data.pages });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}

export const postFolder = async (data, dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}folders`, data);
        dispatch({ type: "ADD_FOLDER" });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const getProjectsByFolderId = async (id, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}folders/projects/`+id);
        dispatch({ type: "TOOLS_BY_FOLDER", projects: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const assignToolToFolder = async (folderId, toolId, dispatch) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}folders/assign/${folderId}/${toolId}`);
        dispatch({ type: "ASSIGN_TOOL_FOLDER" });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const getToolsByFolder = async (folderId, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}folders/${folderId}`);
        dispatch({ type: "TOOLS_BY_FOLDER", tools: response.data.tools, pages: response.data.pages  });
        return response.data
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}

export const putFolder = async (id, dispatch) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}folders` + id);
        dispatch({ type: "PUT_FOLDER", payload: id });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const deleteFolder = async (id, dispatch) => {
    try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}folders/` + id);
        dispatch({ type: "DELETE_FOLDER", payload: id });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}


export const removeToolFromFolder = async (folderId, toolId, dispatch) => {
    try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}folders/delete/${folderId}/${toolId}`);
        dispatch({ type: "DELETE_PROJECT", payload: toolId });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

