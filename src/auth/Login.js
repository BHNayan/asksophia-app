import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, loginGoogleUser } from "../api/userService";
import {
  VisibilityOutlined,
  EmailOutlined,
  VisibilityOffOutlined
} from "@mui/icons-material";import { toast } from "react-toastify";

import { Helmet } from "react-helmet-async";
import AuthRightSide from "../client/components/layouts/authRightSide";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  const [visible, setVisible] = useState(false)

  const from = location.state?.from?.pathname || "/chat";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (state.isError) {
      toast.error(state.message);
    }
    if (state.user || state.isSuccess) {
        navigate(from, { replace: true });
    }
    
    dispatch({ type: "RESET" });
  }, [
    state.isError,
    state.isLoading,
    state.isSuccess,
    state.user,
    state.message,
    navigate,
    dispatch,
  ]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, dispatch);
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: (response) => loginGoogleUser(response.credential, dispatch),
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        theme: "filled_black",
        text: "signin_with",
        shape: "pill",
      });
    }
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>AskSophia | Sign in</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <div className="grid lg:grid-cols-3 grid-cols-1">
          <AuthRightSide
            url="/sign-up"
            text="You don’t have an account?"
            btn="Sign Up"
          />
          <div className="col-span-2 bg-white">
            <div className="flex items-center justify-center text-center h-screen">
              <div className="ounded-[10px] py-8 px-[100px]">
                <div className="w-full flex justify-center">
                  <img
                    src="/images/asksophialogo.jpeg"
                    alt="asksphia logo"
                    className="mb-4 w-[180px]"
                  />
                </div>
                <h3 className="text-gray-900 text-[36px] leading-[41px] font-bold mb-2">
                  Sign In to your account
                </h3>
                <h3 className="text-gray-500 text-[14px] leading-[20px] font-light mb-[23px]">
                  Enter your details to proceed further
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
                    <div className="flex justify-end">
                      <Link className="text-[14px] text-[#3E7EFF]">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="flex mt-[27px] ">
                      <button className="w-full text-[18px] bg-[#3E7EFF] rounded-md px-4 py-2 text-white">
                        Sign In
                      </button>
                    </div>
                   
                  </form>
                  <div className="flex lg:hidden mt-[27px] ">
                      <Link to="/sign-up" className="w-full text-[18px] bg-[#3E7EFF] rounded-md px-4 py-2 text-white">
                        Sign Up
                      </Link>
                    </div>
                  <div className="relative my-4">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-[#E4E6E8]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="mt-10 flex justify-center space-x-4 space-x-reverse">
                      <div id="loginDiv"></div>
                    </div>
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
export default Login;
