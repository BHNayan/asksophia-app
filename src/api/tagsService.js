import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllTags = async (dispatch, page) => {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}tags?page=${page}`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "FETCH_TAGS", tags: response.data.tags, pages: response.data.pages });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}
