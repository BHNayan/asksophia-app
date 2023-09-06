
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));
export const initialState = {
    tools: [],
    tool: null,
    pages: 0,
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    message: ""
}

export const toolsReducer = (state, action) => {
    switch (action.type) {
        case "FILTER_TOOLS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                search: action.search
            }
        case "CATEGORY_TOOLS":
            return {
                ...state,
                tools: action.tools,
                isLoading: false,
                isError: false,
                isSuccess: true,
                search: action.search
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