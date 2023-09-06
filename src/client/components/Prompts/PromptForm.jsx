import React, { useContext, useEffect, useReducer, useState } from 'react'
import { editPrompt, getOnePrompt, postPrompt } from '../../../api/promptService'
import { initialState, promptReducer } from '../../../Reducers/promptReducer';
import SelectTopic from '../layouts/SelectTopic';
import Spinner from '../layouts/GeneralSpinner';
import { UserContext } from '../../../App';
import { toast } from 'react-toastify';
import EditorTag from '../items/EditorTag';
import ConnectPaypal from './ConnectPaypal';
import { getOneUser } from '../../../api/userService';


const generateRandomColor = () => {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  return "rgb(" + getRandomInt(256) + "," + getRandomInt(256) + "," + getRandomInt(256) + ")";
};


const PromptForm = ({ promptId }) => {
  const { state } = useContext(UserContext);

  const [promptState, dispatch] = useReducer(promptReducer, initialState);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isForSale, setIsForSale] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [hashtags, setHashtags] = useState([]);

  const [formData, setFormData] = useState({
    title: "", topics: [], price: "",
    description: "", template: ""
  })

  const { title, description, topics, price } = formData;
  const { prompt, isSuccess, isLoading } = promptState;

  const getCurrentUser = async()=>{
    const response = await getOneUser(state.user._id);
    setCurrentUser(response);
  }
  const fetchPrompt = async () => {
    if (promptId) {
      await getOnePrompt(promptId, dispatch);
    }
  };

  useEffect(()=>{
    getCurrentUser();
  },[])
  useEffect(() => {
    if (isSuccess) {
      toast.success("Operation succeeded")
    }
    dispatch({ type: "RESET" })
  }, [isSuccess, dispatch])

  useEffect(() => {
    if (promptId) {
      fetchPrompt()
    }
  }, [promptId]);

  useEffect(() => {
    if (prompt) {
      const { title, topics, description, template, price, isForSale } = prompt;
      setSelectedOptions(topics);
      setIsForSale(isForSale);
      setFormData({ title, topics, description, template, price });
      dispatch({ type: "RESET" })
    }
  }, [prompt, dispatch]);

  const handleCheckboxChange = (event) => {
    setIsForSale(event.target.checked);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const convertHashtags = (hashtags) => {
      return hashtags.map(hashtag => ({ title: hashtag, color: generateRandomColor() }));
    };

    // Use setHashtags to update your state
    const newHashtags = convertHashtags(hashtags);
    setHashtags(newHashtags);

    try {
      if (state.user && state.user.numberofPosts > 0) {
        if (promptId) {
          await editPrompt(promptId, { ...formData, hashtags: newHashtags, isForSale }, dispatch);
        } else {
          console.log(price)
          await postPrompt({ ...formData, hashtags: newHashtags, isForSale }, dispatch);
          setFormData({ title: "", topics: [], description: "", template: "", price: "" });
          setSelectedOptions([]);
        }
      } else {
        toast.error("You need to remove at least one post to create a prompt")
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      {isLoading && <Spinner />}
      <ConnectPaypal 
          user={currentUser}
          handleCheckboxChange={handleCheckboxChange} 
          isForSale={isForSale} />
      <form onSubmit={handleSubmit}>
        <div className=' mb-6'>
          <label className='mb-2 block font-bold text-black text-[18px] leading-[24px]'>Title</label>
          <input
            onChange={handleChange}
            name="title"
            value={title}
            type="text"
            placeholder='Write Title'
            className='rounded-[10px] w-full px-4 h-[54px] outline-0 text-md border border-gray-100 placeholder:text-gray-400'
          />
        </div>
        {isForSale && <div className=' mb-6'>
          <label className='mb-2 block font-bold text-black text-[18px] leading-[24px]'>Price</label>
          <input
            onChange={handleChange}
            name="price"
            value={price}
            type="number"
            placeholder='$5'
            className='rounded-[10px] w-full px-4 h-[54px] outline-0 text-md 
            border border-gray-100 placeholder:text-gray-400'
          />
        </div>}
        <div className="mb-6">
          <label className='mb-2 block font-bold text-black text-[18px] leading-[24px]'>Topic</label>
          <SelectTopic
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className='mb-6'>
          <div className="grid grid-cols-4 gap-1">
            {topics.map((tag, index) => {
              return <p key={index} className="text-[15px] font-medium leading-[20px] bg-white cursor-pointer border border-gray-100 rounded-full px-4 py-2 text-center text-black"> {tag} </p>
            })}
          </div>
        </div>
        <div className=' mb-6'>
          <label className='mb-2 block font-bold text-black text-[18px] leading-[24px]'>Description</label>
          <textarea
            onChange={handleChange}
            name="description"
            value={description}
            placeholder='Type here...'
            rows="4"
            className='rounded-[10px] resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
          ></textarea>
        </div>
        <div className=' mb-6'>
          <label className='mb-2 block font-bold text-black text-[18px] leading-[24px]'>Prompt</label>
          <EditorTag formData={formData} setFormData={setFormData} setHashtags={setHashtags} hashtags={hashtags} />
        </div>
        <div className="flex flex-wrap">
          {hashtags.map((item, index) => {
            return <div key={index} className="mr-2 cursor-pointer bg-gray-200 rounded-full px-4 py-2">
              {typeof item === "object" ? item.title : item}
            </div>
          })}
        </div>
        <div className='relative flex justify-end my-[20px]'>
          <button className='fixed right-48 w-[146px] font-semibold bottom-4 bg-[#EEE] rounded-full px-4 py-2 text-black'>Cancel</button>
          <button className='fixed right-8 bottom-4 bg-cyan-400 font-semibold rounded-full px-4 py-2 text-white'>Publish Prompt</button>
        </div>
      </form>
    </div>
  )
}

export default PromptForm