import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import Plans from './Plans';

const BillingRoute = () => {
  const { state } = useContext(UserContext);

  return state.user ? <Plans /> : <Navigate to='/login' replace />;
};

export default BillingRoute;
