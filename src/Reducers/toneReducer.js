
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("admin__asksophia"));
export const initialState = {
    tones: [],
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    message: ""
}

export const toneReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_TONES":
            return {
                ...state,
                tones: action.payload,
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