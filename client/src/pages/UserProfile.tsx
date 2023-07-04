import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserProfile: React.FC = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getStudySessions = async () => {
      const apiUrlProxy = '/api/study-sessions';
      try {
        const fetchSessions = await fetch(apiUrlProxy, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const sessionsFound = await fetchSessions.json();
        console.log(sessionsFound);
      } catch (err) {
        console.error(err);
      }
    };
    getStudySessions();
  }, []);
  return (
    <div className='outlet-content'>
      <h1>Hi, {user.name}</h1>
      <p> the id is {user._id}</p>
    </div>
  );
};
export default UserProfile;
