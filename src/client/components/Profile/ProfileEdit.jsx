import React, { useContext, useEffect, useReducer, useState } from 'react'
import { getOneUser, putUser } from '../../../api/userService';
import { Spinner } from "@material-tailwind/react";
import { authReducer, initialState } from '../../../Reducers/authReducer';
import { UserContext } from '../../../App';
import { toast } from 'react-toastify';

const profileState = {
  bio: '', website: '', img_url: '',
  twitter: '', discord: '', github: '', facebook: '',
  instagram: '', tiktok: ''
}

const ProfileEdit = () => {
  const [userState, dispatch] = useReducer(authReducer, initialState);
  const { state } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  const { isSuccess, isError, message } = userState;

  const [formData, setFormData] = useState(profileState);
  const { bio, website, twitter, discord, github, facebook, instagram, tiktok } = formData;

  useEffect(() => {
    if (isError) {
      toast.warn(message);
    }
    if (isSuccess) {
      toast.success(message)
    }
  }, [isError, isSuccess, message])

  const getUserprofile = async () => {
    const prof = await getOneUser(state.user._id);
    setProfile(prof);
    setFormData({
      bio: prof.bio ? prof.bio : '', website: prof.website ? prof.website : '', img_url: prof.img_url ? prof.img_url : '',
      twitter: prof.twitter ? prof.twitter : '', discord: prof.discord ? prof.discord : '',
      github: prof.github ? prof.github : '', facebook: prof.facebook ? prof.facebook : '',
      instagram: prof.instagram ? prof.instagram : '', tiktok: prof.tiktok ? prof.tiktok : ''
    })
  }

  useEffect(() => {
    getUserprofile();
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setUploadImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      const FD = new FormData();
      Object.keys(formData).forEach((key) => {
        FD.append(key, formData[key]);
      });

      // Check if there's an image to upload
      if (uploadImage) {
        FD.append('file', uploadImage);
      }

      await putUser("", FD, dispatch);

      setIsLoading(false)
      await getUserprofile();
      dispatch({ type: "RESET" })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <div className=''>
      <h3 className='mb-2 block font-bold text-black text-[18px] leading-[24px]'>User details</h3>
      <div className='bg-white rounded-[10px] p-[22px] border border-gray-100'>
        <div className='flex md:justify-between flex-col md:flex-row border-b border-gray-100 pb-4'>
          <div className='flex items-center'>
            <img
              src={`${profile && profile.img_url ? `${profile.img_url}` : '/images/avatar.png'}`}
              className='md:flex hidden w-[70px] h-[70px] object-cover rounded-full mr-[10px]' alt="user profile" />
            <div className='flex flex-col'>
              <h4 className='mb-2 font-bold text-black md:text-[20px] text-[16px] leading-[24px]'>{profile && profile.username}</h4>
              <p className='mb-2 font-normal text-gray-400 md:text-[15px] text-[13px] leading-[20px]'>{profile && profile.email}</p>
            </div>
          </div>
          {isLoading ?
            <Spinner className="h-10 w-10 md:flex hidden" />
            : <button onClick={handleSubmit}
              className='bg-black rounded-full md:flex justify-center items-center hidden font-semibold md:w-[124px] w-[90px] px-2 
            md:h-[54px] h-[46px] text-white md:text-[18px] text-[14px] leading-[20px]'>Update</button>}
        </div>

        <form className='mt-4' encType='multipart/form-data'>
          <div className='mb-6'>
            <label className="block mb-2 text-md font-medium text-gray-900" htmlFor="file_input">Upload file</label>
            <input onChange={handleImageUpload}
              name="uploadImage"
              className="block w-full file:bg-gray-900 
            file:text-white md:file:p-4 file:p-2 text-[14px] 
            border border-gray-100 md:text-md text-gray-400
            rounded-lg cursor-pointer bg-gray-200"
              id="file_input" type="file" />
            <p className="mt-1 mb-2 text-sm text-gray-500"
              id="file_input_help">PNG, JPG or JPEG (MAX. 400x400px).</p>
            {image && <img src={image} alt="preview" className='object-cover rounded-full w-[120px] h-[120px]' />}
          </div>
          <div className='mb-6'>
            <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Bio</label>
            <textarea
              value={bio}
              name="bio"
              onChange={handleChange}
              placeholder='"Create a blog post about search engine optimization" "Write a press release about www.asksophia.com"'
              rows="2"
              className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 
              placeholder:text-gray-400'
            ></textarea>
          </div>
          <div className='mb-6'>
            <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Website</label>
            <input type="text" placeholder='Link' onChange={handleChange}
              name="website"
              value={website}
              className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
            />
          </div>
          <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
            <div className=''>
              <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Twitter</label>
              <input type="text" placeholder='@user' onChange={handleChange}
                name="twitter"
                value={twitter}
                className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
              />
            </div>
            <div className=''>
              <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Discord</label>
              <input type="text" placeholder='@user' onChange={handleChange}
                name="discord"
                value={discord}
                className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
              />
            </div>
            <div className=''>
              <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Github</label>
              <input type="text" placeholder='@user' onChange={handleChange}
                name="github"
                value={github}
                className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
              />
            </div>
            <div className=''>
              <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Facebook</label>
              <input type="text" placeholder='@user' onChange={handleChange}
                name="facebook"
                value={facebook}
                className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
              />
            </div>
            <div className=''>
              <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Instagram</label>
              <input type="text" placeholder='@user' onChange={handleChange}
                name="instagram"
                valie={instagram}
                className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
              />
            </div>
            <div className=''>
              <label className='mb-2 block font-semibold text-black text-[16px] leading-[24px]'>Tiktok</label>
              <input type="text" placeholder='@user' onChange={handleChange}
                name="tiktok"
                value={tiktok}
                className='rounded-[10px] bg-gray-200 resize-none w-full p-4 outline-0 text-md border border-gray-100 placeholder:text-gray-400'
              />
            </div>
          </div>
        </form>
        <div className='flex justify-end w-full'>
        {isLoading ?
            <Spinner className="h-10 w-10  mt-4" />
            : <button onClick={handleSubmit}
              className='bg-black rounded-full mt-4 font-semibold md:w-[124px] w-[90px] px-2 
            md:h-[54px] h-[46px] text-white md:text-[18px] text-[14px] leading-[20px]'>Update</button>}
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit