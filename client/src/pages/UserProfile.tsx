import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import StudyCard from '../components/StudyCard';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import StudyStats from '../components/StudyStats';
import EditProfile from '../components/EditProfile';

export type SessionData = {
  _id: string;
  completed: boolean;
  length: number;
  user: string;
  createdAt: string;
  comment: string;
};

const UserProfile: React.FC = () => {
  const { user } = useContext(UserContext);
  const [studySessions, setStudySessions] = useState<SessionData[]>();
  const [modalSession, setModalSession] = useState<SessionData>();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [statsActive, setStatsActive] = useState<boolean>(false);
  const [editProfileActive, setEditProfileActive] = useState<boolean>(false);
  const handleClick = (data: SessionData | undefined) => {
    setModalSession(data);
    setModalActive(modalActive => !modalActive);
  };
  //TODO: evaluate if this is best way to handle.
  const handleStudyClick = () => {
    setStatsActive(statsActive => !statsActive);
  };
  const handleEditClick = () => {
    setEditProfileActive(editProfileActive => !editProfileActive);
  };
  const calculateStudyTime = (array: SessionData[]) => {
    let studyTime = 0;
    array.map(item => (studyTime += item.length));
    return studyTime;
  };
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
        setStudySessions(sessionsFound);
      } catch (err) {
        console.error(err);
      }
    };
    getStudySessions();
  }, []);
  console.log(studySessions);
  return (
    <div className='outlet-content'>
      <Modal
        modalSession={modalSession}
        modalActive={modalActive}
        handleClick={handleClick}
        setStudySessions={setStudySessions}
      />
      <StudyStats
        handleStudyClick={handleStudyClick}
        statsActive={statsActive}
        studySessions={studySessions}
      />
      <EditProfile
        handleEditClick={handleEditClick}
        editProfileActive={editProfileActive}
      />
      <div className='userprofile-greeting'>
        <h1>Welcome back, {user.name}!</h1>
        <p>
          You've studied for&nbsp;
          {studySessions &&
            Math.floor(calculateStudyTime(studySessions) / 3600)}
          &nbsp;hours.
        </p>
      </div>
      <div className='userprofile-box'>
        <div className='userprofile-nav'>
          <ul className='userprofile-buttons'>
            <li>
              <Link to='/'>
                <button className='study-button'>Home</button>
              </Link>
            </li>
            <li>
              <Link to='study-session'>
                <button className='study-button'>Start session</button>
              </Link>
            </li>
            <li>
              <button
                className='study-button'
                onClick={() => {
                  handleStudyClick();
                }}
              >
                Study stats
              </button>
            </li>
            <li className='userprofile-last-item'>
              <button
                className='study-button'
                onClick={() => {
                  handleEditClick();
                }}
              >
                Edit profile
              </button>
            </li>
          </ul>
        </div>
        <div className='userprofile-studylog'>
          <h3 className='userprofile-recent-log'>Your recent sessions:</h3>
          <StudyCard
            studySessions={studySessions}
            setStudySessions={setStudySessions}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
