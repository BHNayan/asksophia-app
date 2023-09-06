import axios from "axios";
axios.defaults.withCredentials = true;


export const likePrompt = async (id) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}prompt/` + id + '/like', {});
        return result;
    } catch (error) {
        console.log(error)
    }
}
export const unlikePrompt = async (id) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}prompt/` + id + '/unlike', {});
        return result;
    } catch (error) {
        console.log(error)
    }
}


export const savePrompt = async (id) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}prompt/` + id + '/savePrompt', {});
        return result;
    } catch (error) {
        console.log(error)
    }
}
export const unsavePrompt = async (id) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}prompt/` + id + '/unsavePrompt', {});
        return result;
    } catch (error) {
        console.log(error)
    }
}
export const upvotePrompt = async (id) => {
    try {
        const result = await axios.put(`${process.env.REACT_APP_BACKEND_URL}prompt/` + id + '/upvote', {});
        return result;
    } catch (error) {
        console.log(error)
    }
}
export const downvotePrompt = async (id) => {
    try {
        const result = await axios.put(`${process.env.REACT_APP_BACKEND_URL}prompt/` + id + '/downvote', {});
        return result;
    } catch (error) {
        console.log(error)
    }
}
export const usedByPrompt = async (id) => {
    try {
        const result = await axios.put(`${process.env.REACT_APP_BACKEND_URL}prompt/` + id + '/usedby', {});
        return result;
    } catch (error) {
        console.log(error)
    }
}