import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {UserContext} from '../context/UserContext';

const PrivateRoute = () => {
  const {user} = useContext(UserContext);
  return user._id !== '' ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
