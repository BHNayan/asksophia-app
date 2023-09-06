import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllCategories = async (dispatch, page) => {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}categories?page=${page}`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "FETCH_CATEGORIES", categories: response.data.categories, pages: response.data.pages });
        return response.data.categories;
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}