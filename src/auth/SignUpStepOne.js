import { Helmet } from "react-helmet-async";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AuthRightSide from "../client/components/layouts/authRightSide";
import { useContext, useEffect, useState } from "react";
import { signupGoogleUser } from "../api/userService";
import { UserContext } from "../App";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpStepOne = ({ formData, handleChange, setStep, step }) => {
  const { email } = formData;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ||  "/chat";

  const { state, dispatch } = useContext(UserContext);
  const [isAgreed, setIsAgreed] = useState(false);

  const increaseStep = () => {
    if (!isAgreed) {
      toast.error("You need to agree to the terms and conditions before proceeding.");
    } else {
      setStep(step + 1);
    }
  };


  useEffect(() => {
    if (state.isError) {
      toast.error(state.message);
    }
    if (state.isSuccess) {
      toast.success(state.message);
      setTimeout(() => { 
        navigate(from, { replace: true });
      }, 3000);
    }
    if(state.user){
      navigate(from, { replace: true });
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


  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: (response) => signupGoogleUser(response.credential, dispatch),
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        theme: "filled_black",
        text: "continue_with",
        shape: "pill",
      });
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>AskSophia | Sign Up</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <div className="grid lg:grid-cols-3 grid-cols-1">
        <AuthRightSide url="/login" text="Already have an account?" btn="Sign In" />
          <div className="col-span-2 bg-white">
            <div className="flex items-center justify-center text-center h-screen">
              <div className="rounded-[10px] py-8 px-[100px]">
                <div className="w-full flex justify-center">
                  <img
                    src="/images/asksophialogo.jpeg"
                    alt="asksphia logo"
                    className="mb-4 w-[180px]"
                  />
                </div>
                <h3 className="text-gray-900 text-[36px] leading-[41px] font-bold mb-2">
                  Create a new Account
                </h3>
                <h3 className="text-gray-500 text-[14px] leading-[20px] font-light mb-[23px]">
                  Enter your details to proceed further
                </h3>

                <div>
                  <form className="signUp">
                    <div className="mb-4 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        name="email"
                        className="text-[14px] h-[54px] border border-gray-100 rounded-[10px] py-2 px-4 outline-0 w-full"
                        placeholder="Email"
                        required
                      />
                      <span className="absolute right-4 text-gray-400 top-1/2 transform -translate-y-1/2 h-5 w-5">
                      <EmailOutlinedIcon />
                      </span>
                    </div>
                    <div className="flex justify-start">
                      <div class="flex items-center mb-4">
                        <input
                          id="default-radio-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100"
                          checked={isAgreed} 
                          onChange={(e) => setIsAgreed(e.target.checked)}
                          required
                        />
                        <label
                          htmlFor="default-radio-1"
                          class="ml-[10px] text-[14px] leading-[20px] font-normal text-[#8083A3]"
                        >
                          I agree with terms & conditions
                        </label>
                      </div>
                    </div>
                    <div className="flex mt-[27px] ">
                      <button
                        onClick={increaseStep}
                        className="w-full text-[18px] bg-[#3E7EFF] rounded-md px-4 py-2 text-white"
                      >
                        Next Step
                      </button>
                    </div>
                  </form>
                  <div className="flex lg:hidden mt-[27px] ">
                      <Link to="/login" className="w-full text-[18px] bg-[#3E7EFF] rounded-md px-4 py-2 text-white">
                        Login
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
                  <div className="flex justify-center space-x-4 space-x-reverse">
                    <div id="signUpDiv" data-text="signup_with"></div>
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

export default SignUpStepOne;
