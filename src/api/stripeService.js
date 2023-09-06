import axios from "axios";
axios.defaults.withCredentials = true;

export const payFunction = async (data) => {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}paypal/pay`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
       console.log(error)
    }
}