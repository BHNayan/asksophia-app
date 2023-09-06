import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../api/userService";
import { Helmet } from "react-helmet-async";

import {
  PersonOutlined,
  VisibilityOutlined,
  EmailOutlined,
  VisibilityOffOutlined
} from "@mui/icons-material";
import { toast } from "react-toastify";
import AuthRightSide from "../client/components/layouts/authRightSide";

const SignUp = ({ formData, handleChange }) => {
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation();
  const from = location.state?.from?.pathname ||  "/chat";

  const { username, email, password, cpassword } = formData;
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isError) {
      toast.error(state.message);
    }
    if (state.isSuccess) {
      toast.success(state.message);
    }
    dispatch({ type: "RESET" });
  }, [
    state.isError,
    state.isSuccess,
    state.isLoading,
    state.message,
    navigate,
    dispatch,
  ]);

  // Submit the htmlForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email || !username) {
      toast.error("Fields should not be empty", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const userData = { username, email, password };
      await register(userData, dispatch);
    }
  };

  return (
    <>
      <Helmet>
        <title>AskSophia | Sign up</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <div className="grid lg:grid-cols-3 grid-cols-1">
          <AuthRightSide
            url="/login"
            text="Already have an account?"
            btn="Sign In"
          />
          <div className="col-span-2 bg-white">
            <div className="flex items-center justify-center text-center h-screen">
              <div className="bg-white border border-gray-100 rounded-[10px] py-8 px-[100px]">
                <div className="w-full flex justify-center">
                  <img
                    src="/images/asksophialogo.jpeg"
                    alt="asksphia logo"
                    className="mb-4 w-[180px]"
                  />
                </div>
                <h3 className="text-gray-900 text-[36px] leading-[41px] font-bold mb-2">
                  Create a New Account
                </h3>
                <h3 className="text-gray-500 text-[14px] leading-[20px] font-light mb-[23px]">
                  Enter your details carefully
                </h3>
                <div>
                  <form className="signUp" onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        className="text-[14px] h-[54px] border border-gray-100 rounded-[10px] py-2 px-4 outline-0 w-full"
                        placeholder="Email"
                        required
                      />
                      <span className="absolute right-4 text-gray-400 top-1/2 transform -translate-y-1/2 h-5 w-5">
                        <EmailOutlined />
                      </span>
                    </div>
                    <div className="mb-4 relative">
                      <input
                        type="text"
                        value={username}
                        onChange={handleChange}
                        id="username"
                        name="username"
                        className="text-[14px] h-[54px] border border-gray-100 rounded-[10px] py-2 px-4 outline-0 w-full"
                        placeholder="Username"
                        required
                      />
                      <span className="absolute right-4 text-gray-400 top-1/2 transform -translate-y-1/2 h-5 w-5">
                        <PersonOutlined />
                      </span>
                    </div>
                    <div className="mb-4 relative">
                      <input
                        type={`${visible ? 'text' : 'password'}`}
                        value={password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        className="text-[14px] h-[54px] border border-gray-100 rounded-[10px] py-2 px-4 outline-0 w-full"
                        placeholder="Password"
                        required
                      />
                      <span onClick={()=>setVisible(!visible)} className="cursor-pointer absolute right-4 text-gray-400 top-1/2 transform -translate-y-1/2 h-5 w-5">
                      {visible ? <VisibilityOutlined /> : <VisibilityOffOutlined/>}
                      </span>
                    </div>
                    <div className="mb-[22px] relative">
                      <input
                        type={`${visible ? 'text' : 'password'}`}
                        value={cpassword}
                        onChange={handleChange}
                        id="cpassword"
                        name="cpassword"
                        className="text-[14px] h-[54px] border border-gray-100 rounded-[10px] py-2 px-4 outline-0 w-full"
                        placeholder="Repeat Password"
                        required
                      />
                      <span  onClick={()=>setVisible(!visible)} className="cursor-pointer absolute right-4 text-gray-400 top-1/2 transform -translate-y-1/2 h-5 w-5">
                      {visible ? <VisibilityOutlined /> : <VisibilityOffOutlined/>}
                      </span>
                    </div>
                    <div className="flex mt-[27px] mb-4">
                      <button className="w-full text-[18px] bg-[#3E7EFF] rounded-md px-4 py-2 text-white">
                        Sign Up
                      </button>
                    </div>
                  </form>
                  <div className="flex lg:hidden mt-[27px] ">
                      <Link to="/login" className="w-full text-[18px] bg-[#3E7EFF] rounded-md px-4 py-2 text-white">
                        Login
                      </Link>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
