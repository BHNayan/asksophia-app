
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));
export const initialState = {
    chats: [],
    chat:null,
    pages: 0,
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    message: ""
}

export const chatReducer = (state, action) => {
    switch (action.type) {
       
        case "DELETE_CHAT":
            return {
                ...state,
                chats: state.chats.filter((chat) => chat._id !== action.payload),
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: "Chat deleted successfully"
            }
        case "SINGLE_CHAT":
            return {
                ...state,
                chat: action.payload,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case "FETCH_CHATS_START":
            return {
                ...state,
                isLoading: true,
            }
        case "USER_CHATS":
            return {
                ...state,
                chats: action.chats,
                pages: action.pages,
                isLoading: false,
                isError: false,
            }
       
        case "FILTER_CHATS":
            return {
                ...state,
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