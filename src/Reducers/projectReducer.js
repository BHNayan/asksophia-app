
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));
export const initialProjectState = {
    projects: [],
    pages: 0,
    project:{},
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    search: '',
    message: ""
}

export const projectReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROJECT":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: action.payload
            }
        case "EDIT_PROJECT":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: action.payload
            }
        case "DELETE_PROJECT":
            return {
                ...state,
                projects: state.projects.filter((project) => project._id !== action.payload),
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: "PROJECT  deleted successfully"
            }
        case "SINGLE_PROJECT":
            return {
                ...state,
                project: action.payload,
                isLoading: true,
                isError: false,
                isSuccess: true,
            }
        case "FETCH_PROJECTS_START":
            return {
                ...state,
                isLoading: true,
            }
        case "FETCH_PROJECTS":
            return {
                ...state,
                projects: action.projects,
                pages: action.pages,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        case "USER_PROJECTS":
            return {
                ...state,
                projects: action.projects,
                pages: action.pages,
                isLoading: false,
                isError: false,
                isSuccess: true
            }
       
        case "FILTER_PROJECTS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                search: action.search
            }
        case "START_LOADING":
            return {
                ...state,
                isLoading: true,
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