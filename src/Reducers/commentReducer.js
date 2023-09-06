const user = JSON.parse(localStorage.getItem("user__asksophia"));

export const initialCommentState = {
  comments: [],
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  hasMore: false,
  message: "",
};

export const commentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: true,
        message: action.payload,
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
        isLoading: true,
        isError: false,
        isSuccess: true,
        message: "Comment deleted successfully",
      };

    case "FETCH_COMMENTS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "APPEND_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, ...action.comments],
        isLoading: false,
        isError: false,
        hasMore: action.hasMore,
      };
    case "FETCH_COMMENTS":
      return {
        ...state,
        comments: action.comments,
        isLoading: false,
        isError: false,
        hasMore: action.hasMore,
      };

    case "USER_COMMENTS":
      return {
        ...state,
        comments: action.comments,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    case "UPDATE_COMMENT":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.comment._id ? action.comment : comment
        ),
        isLoading: false,
        isSuccess: true,
        message: "Comment updated successfully",
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload,
      };
    case "RESET":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
        hasMore: false,
        message: "",
      };

    default:
      throw new Error("You are dispatching something that is not in reducer");
  }
};
