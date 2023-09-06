import { useEffect, useState } from "react";
import axios from "axios";

const Success = () => {
  const [status, setStatus] = useState("processing"); // Possible statuses: "processing", "success", "failure"

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    axios.post(`${process.env.REACT_APP_BACKEND_URL}paypal/success`, { token })
      .then(response => {
        if (response) {
          setStatus("success");
          window.location.href=`${process.env.NODE_ENV === "production" ? 
          process.env.REACT_APP_FRONTEND_URL_PROD : process.env.REACT_APP_FRONTEND_URL_DEV}`
          +"use-prompt/"+response.data.promptId;
        } else {
          setStatus("failure");
        }
      })
      .catch(error => {
        setStatus("failure");
        console.error('Payment completion failed', error);
      });
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center relative">
      {status === "processing" && <div style={overlayStyle}></div>}
      {status === "processing" && <h1 className="z-50 text-xl text-purple-500 font-bold">Finishing the procedure, do not reload the page...</h1>}
      {status === "success" && <h2 className="text-xl text-green-500 font-bold">Your payment was successful!</h2>}
      {status === "failure" && <h2 className="text-xl text-yellow-500 font-bold">Something went wrong, please try again.</h2>}
    </div>
  )
}

export default Success;
