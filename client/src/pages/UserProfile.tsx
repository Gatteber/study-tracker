import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserProfile: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='outlet-content'>
      <h1>Hi, {user.name}</h1>
    </div>
  );
};
export default UserProfile;
