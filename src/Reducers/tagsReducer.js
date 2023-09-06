
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));
export const initialState = {
    tags: [],
    pages: 0,
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    message: ""
}

export const tagsReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_TAGS":
            return {
                ...state,
                tags: action.tags,
                pages: action.pages,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        case "ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                message: action.payload
            }
        case "RESET":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: false,
                message: ""
            };

        default:
            throw new Error("You are dispatching something that is not in reducer");
    }
}