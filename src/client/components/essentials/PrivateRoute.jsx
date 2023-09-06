import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import { Spinner } from '@material-tailwind/react';

const PrivateRoute = () => {
  const { state, userWords } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if(userWords !== 0 || !state.user) {
      setLoading(false);
    }
  }, [userWords, state.user]);

  if (loading) {
    return <>
      <div className="flex flex-col justify-center items-center h-screen">
       <div className='flex flex-col justify-center items-center'>
          <img src="/images/sophia.png" alt="logo" className="w-1/3 mb-2" />
          <p className='text-gray-400 text-lg font-medium'>The page is Loading</p>
       </div>
       <Spinner className="h-12 w-12" />
      </div>
    </>; 
  }

  if (!state.user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  
  if (userWords > 0 || userWords === null) {
    return <Outlet />;
  } else {
    return <Navigate to='/plans' replace />;
  }
};
export default PrivateRoute;