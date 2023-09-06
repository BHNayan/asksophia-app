import axios from "axios";
axios.defaults.withCredentials = true;

export const subscribe = async (data) => {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}subscribe`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
       console.log(error)
    }
}
