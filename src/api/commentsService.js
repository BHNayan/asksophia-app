import axios from "axios";
axios.defaults.withCredentials = true;

// Fetch all comments for a specific project
export const fetchCommentsForPrompts = async (promptId, dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}comments/${promptId}`;
    try {
        const response = await axios.get(url);
        dispatch({ type: "FETCH_COMMENTS", comments: response.data.comments, hasMore:response.data.hasMore });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message })
    }
}

// Post a new comment for a project
export const postCommentForPrompt = async (promptId, commentData, dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}comments/${promptId}`;
    try {
        const response = await axios.post(url, commentData);
        dispatch({ type: "ADD_COMMENT", comment: response.data });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

// Update an existing comment
export const updateComment = async (commentId, updatedData, dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}comments/${commentId}`;
    try {
        const response = await axios.put(url, updatedData);
        dispatch({ type: "UPDATE_COMMENT", comment: response.data });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

export const fetchMoreComments = async (commentId, dispatch, currentCommentsCount) => {
    const page = Math.ceil(currentCommentsCount / 5) + 1;
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}comments/${commentId}?page=${page}`);
        dispatch({ type: "APPEND_COMMENTS", comments: response.data.comments, hasMore:response.data.hasMore});
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

// Delete a comment
export const deleteComment = async (commentId, dispatch) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}comments/${commentId}`;
    try {
        await axios.delete(url);
        dispatch({ type: "DELETE_COMMENT", payload: commentId });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}
