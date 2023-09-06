
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user__asksophia"));
export const initialFolderState = {
    folders: [],
    projects:[],
    pages: 0,
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

export const folderReducer = (state, action) => {
    switch (action.type) {
        case "ADD_FOLDER":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: action.payload
            }

        case "DELETE_FOLDER":
            return {
                ...state,
                folders: state.folders.filter((folder) => folder._id !== action.payload),
                isLoading: true,
                isError: false,
                isSuccess: true,
                message: "PROJECT  deleted successfully"
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
        case "ASSIGN_TOOL_FOLDER":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
            }
        case "TOOLS_BY_FOLDER":
            return {
                ...state,
                projects:action.projects,
                pages: action.pages,
                isLoading: true,
                isError: false,
            }
        case "PUT_FOLDER":
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: true,
            }
        case "FETCH_FOLDERS_START":
            return {
                ...state,
                isLoading: true,
            }
        case "FETCH_FOLDERS":
            return {
                ...state,
                folders: action.folders,
                pages: action.pages,
                isLoading: false,
                isError: false
            }
        case "USER_FOLDERS":
            return {
                ...state,
                folders: action.folders,
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