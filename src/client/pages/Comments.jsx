import { useEffect, useReducer, useState } from "react";
import { commentReducer, initialCommentState } from "../../Reducers/commentReducer";
import CommentsBody from "../components/Comments/CommentsBody/CommentsBody"
import CommentsHeader from "../components/Comments/CommentsHeader/CommentsHeader"
import { fetchCommentsForPrompts } from "../../api/commentsService";

const Comments = ({ id }) => {
    const [commentState, dispatch] = useReducer(commentReducer, initialCommentState);
    const { comments, isLoading, hasMore } = commentState;
    const [editing, setEditing] = useState(null);

    const getComments = async () => {
        dispatch({ type: "FETCH_COMMENTS_START" })
        await fetchCommentsForPrompts(id, dispatch);
    }

    useEffect(() => {
        getComments()
    }, [id])


    return (
        <div>
            <CommentsHeader
                id={id}
                dispatch={dispatch} />
            <CommentsBody id={id}
                editing={editing}
                setEditing={setEditing}
                hasMore={hasMore}
                comments={comments}
                dispatch={dispatch}
                isLoading={isLoading} />
        </div>
    )
}

export default Comments