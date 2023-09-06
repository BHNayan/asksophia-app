
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));
export const initialState = {
    prompts: [],
    saved_prompts:[],
    prompt: null,
    pages: 0,
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    message: ""
}

export const promptReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROMPT":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: action.payload
            }
        case "EDIT_PROMPT":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: action.payload
            }

        case "DELETE_PROMPT":
            return {
                ...state,
                prompts: state.prompts.filter((prompt) => prompt._id !== action.payload),
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: "PROMPT offer deleted successfully"
            }
        case "SINGLE_PROMPT":
            return {
                ...state,
                prompt: action.payload,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case "FETCH_PROMPTS":
            return {
                ...state,
                prompts: action.prompts,
                pages: action.pages,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        case "SAVED_PROMPTS":
            return {
                ...state,
                saved_prompts: action.payload,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        case "TOPIC":
            return {
                ...state,
                prompts: action.payload,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        case "FILTER_PROMPTS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                search: action.search
            }
        case "FETCH_USER_PROMPTS_START":
                return {
                  ...state,
                  isLoading: true,
                }
        case "USER_PROMPTS":
            return {
                ...state,
                prompts: action.prompts,
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