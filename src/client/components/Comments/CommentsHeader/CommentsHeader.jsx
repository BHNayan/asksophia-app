import { useState } from "react"
import { fetchCommentsForPrompts, postCommentForPrompt } from "../../../../api/commentsService";

const CommentsHeader = ({id, dispatch}) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await postCommentForPrompt(id,{text, promptId:id} ,dispatch);
    await fetchCommentsForPrompts(id, dispatch);
    dispatch({type:"RESET"});
    setText("");
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex items-center">
      <img className="rounded-full w-8 h-8 mr-2 object-cover"
        src={`/images/avatar.png`} alt="avatar" />
      <input
        type="text"
        name="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Write your thoughts here ..."
        className="rounded-[10px] mt-3 w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400"
      />
    </div>
    </form>
  )
}

export default CommentsHeader