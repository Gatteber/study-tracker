import { SetStateAction } from 'react';
import { SessionData } from '../pages/UserProfile';

interface IStudySessions {
  studySessions: SessionData[] | undefined;
  setStudySessions: React.Dispatch<SetStateAction<SessionData[] | undefined>>;
  handleClick: (session: SessionData | undefined) => void;
}

const StudyCard = ({
  studySessions,
  setStudySessions,
  handleClick,
}: IStudySessions) => {
  const sortedSessions = studySessions?.sort((a, b) => {
    //sort by newest date
    const sessionA = a.createdAt;
    const sessionB = b.createdAt;
    if (sessionA > sessionB) {
      return -1;
    }
    if (sessionA < sessionB) {
      return 1;
    }
    return 0;
  });
  const handleDelete = async (sessionID: string) => {
    const apiUrlProxy = '/api/study-sessions/';
    const deletedData = {
      _id: sessionID,
    };
    try {
      const deleted = await fetch(apiUrlProxy, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletedData),
      });
      const res = await deleted.json();
      if (res) {
        setStudySessions(
          sortedSessions?.filter(session => session._id !== sessionID)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='userprofile-study-card-box'>
      {studySessions &&
        sortedSessions?.map(session => (
          <div className='userprofile-study-card' key={session._id}>
            <div className='userprofile-study-card-header'>
              <p>{session.createdAt.slice(0, 10)}</p>
              <button
                className='userprofile-study-card-delete'
                onClick={() => handleDelete(session._id)}
              >
                x
              </button>
            </div>
            <p>
              Length:&nbsp;{session.length / 60 / 60}&nbsp;hour
              {session.length > 3600 ? 's' : ''}
            </p>
            <p>
              You {session.completed ? 'finished' : "didn't finish"} this
              session.
            </p>
            <p>-- Notes --</p>
            <p>{session.comment === '' ? 'N/A' : session.comment}</p>
            <button onClick={() => handleClick(session)}>Edit note</button>
          </div>
        ))}
    </div>
  );
};

export default StudyCard;
