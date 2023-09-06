import { Spinner } from "@material-tailwind/react";
import moment from "moment";
import { deleteComment, fetchMoreComments, updateComment } from "../../../../api/commentsService";
import { useContext, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { UserContext } from "../../../../App";

const CommentsBody = ({ id, hasMore, dispatch, comments, isLoading, setEditing, editing }) => {
  const [isMore, setIsMore] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const { state } = useContext(UserContext);

  const displayMore = async () => {
    setIsMore(true);
    await fetchMoreComments(id, dispatch, comments.length);
    dispatch({ type: "RESET" });
    setIsMore(false)
  }
  const saveChanges = async (commentId) => {
    await updateComment(commentId, { text: updatedComment }, dispatch);
    dispatch({ type: "RESET" });
    toggleEdit(commentId)
  }

  const removeComment = async (commentId) => {
    alert("Are you sure you want to delete this comment?");
    await deleteComment(commentId, dispatch);
    dispatch({ type: "RESET" });
  }

  const toggleEdit = (id) => {
    if (editing === id) {
      setEditing(null);
    } else {
      setEditing(id);
    }
  }


  if (isLoading) {
    return <>
      <div className="flex flex-col justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    </>
  }
  return (
    <div className="mt-6">
      {comments && comments.length > 0
        ? comments.map((comment) => {
          return <div key={comment._id} className="py-4 border border-b-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-[80%]">
                <div className="flex items-center">
                  <img className="rounded-full w-8 h-8 mr-2 object-cover"
                    src={`${comment.user.img_url ? comment.user.img_url : '/images/avatar.png'}`} alt="avatar" />
                  <p className="text-purple-500 text-md font-medium mr-4">{comment.user.username}</p>
                  <p className="md:flex hidden font-normal text-[14px] text-[#969696] leading-[20px]">{moment(comment.createdAt).fromNow()}</p>
                </div>
              </div>
              <div>
                {state.user && state.user._id === comment.user._id && (
                  <>
                    <button onClick={() => {
                      setUpdatedComment(comment.text);
                      toggleEdit(comment._id);
                    }}>
                      <EditOutlinedIcon className="text-gray-400 mr-2" />
                    </button>
                    <button onClick={() => {
                      removeComment(comment._id);
                    }}>
                      <CloseOutlinedIcon className="text-gray-400" />
                    </button>
                  </>
                )}
              </div>
            </div>
            {editing === comment._id ? (
              <div>
                <textarea
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                  className="w-full p-2 rounded-md border resize-none outline-0 border border-gray-100"
                  rows="4"
                />
                <button className="bg-blue-500 rounded-full px-6 py-2 text-white mr-2"
                  onClick={() => saveChanges(comment._id)}>Save</button>
                <button onClick={() => toggleEdit(comment._id)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p className="text-gray-800 text-[18px] font-normal">{comment.text}</p>
              </div>
            )}
          </div>
        }) : <>
          <div className="flex text-center my-6">
            <p className="text-gray-500 text-md">No comments.</p>
          </div>
        </>}
      {comments && hasMore &&
        <div className="mt-6 flex items-center justify-center"
          onClick={displayMore}>
          {isMore ?
            <Spinner />
            : <p className="cursor-pointer hover:underline text-blue-500 text-[18px]">Display more</p>}
        </div>}
    </div>
  )
}

export default CommentsBody