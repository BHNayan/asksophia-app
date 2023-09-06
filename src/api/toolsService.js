import axios from "axios";
axios.defaults.withCredentials = true;

export const getOneTool = async (category, dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}tools/category/` + category);
        dispatch({ type: "CATEGORY_TOOLS", payload: response.data });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}
