import {Navigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import {useContext} from 'react';
import UserProfile from '../pages/UserProfile';

const PrivateRoute = () => {
  const {user} = useContext(UserContext);
  return user._id !== '' ? <UserProfile /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
