

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));

export const initialState = {
    user: user ? user : null,
    users:[],
    pages:0,
    currentUser:null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}
// Export the authReducer function which takes the current state and an action as its arguments
export const authReducer = (state, action) => {
    // Use a switch statement to handle different action types
    switch (action.type) {
        // Handle the REGISTER_USER action type
        case "REGISTER_USER":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: action.payload,
            };

        // Handle the LOGIN_USER action type
        case "LOGIN_USER":
            return {
                ...state,
                user: action.payload,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: "User is loggedIn",
            };
        case "CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload,
            };

            case "FETCH_USERS":
            return {
                ...state,
                users: action.users,
                pages: action.pages,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        case "PUT_USER":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: "User updated",
            };
            case "DELETE_USER":
                return {
                    ...state,
                    users: state.users.filter((user) => user._id !== action.payload),
                    isLoading: true,
                    isError: false,
                    isSuccess: true,
                    message: "USER offer deleted successfully"
                }
        // Handle the LOGOUT action type
        case "LOGOUT":
            return {
                ...state,
                user: null, // Clear the user data
                isLoading: true,
            };

        // Handle the ERROR action type
        case "ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true, // Set the error state to true
                isSuccess: false,
                message: action.payload, // Set the message to the error message from the payload
            };

        // Handle the RESET action type
        case "RESET":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: false,
                message: "", // Clear the message
            };

        // Throw an error for unrecognized action types
        default:
            throw new Error("You are dispatching something that is not in reducer");
    }
};