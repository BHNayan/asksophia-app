import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchAllTones = async (dispatch) => {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}tones`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "FETCH_TONES", payload: response.data});
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}
