import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllPlans = async (dispatch, page) => {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}plans?page=${page}`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "FETCH_PLANS", plans: response.data.plans, pages: response.data.pages });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}