import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllTools = async (dispatch, page) => {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}descriptions?page=${page}`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "FETCH_TOOLS", tools: response.data.tools, pages: response.data.pages });
        return response.data.tools;
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}

export const getOneTool = async (id, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}descriptions/tool/` + id);
        dispatch({ type: "SINGLE_TOOL", payload: response.data });
        return response.data
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}
