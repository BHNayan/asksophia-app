
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));
export const initialState = {
    accounts: {},
    account_member:[],
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    message: ""
}

export const accountReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ACCOUNTS":
            return {
                ...state,
                accounts: action.payload.accounts,
                isLoading: false,
                isError: false
            }
        case "FETCH_ACCOUNTs_MEMBER":
            return {
                ...state,
                account_member: action.payload,
                isLoading: false,
                isError: false
            }
        case "ADD_USER_TO_ACCOUNT":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: action.payload
            }
            case "DELETE_ACCOUNT":
                return {
                    ...state,
                    accounts: {
                        ...state.accounts,
                        members: state.accounts.members.filter((account) => {
                            return account._id !== action.payload.memberId;
                        }),
                    },
                    isLoading: false,  // Consider whether this is correct in your use case.
                    isError: false,
                    isSuccess: true,
                    message:action.payload.message
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