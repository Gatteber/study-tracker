type session = {
  _id: string;
  completed: boolean;
  length: number;
  user: string;
  createdAt: string;
};

interface IStudySessions {
  studySessions: session[] | undefined;
}

const StudyCard = ({ studySessions }: IStudySessions) => {
  return (
    <div className='userprofile-study-card-box'>
      {studySessions &&
        studySessions.map(session => (
          <div className='userprofile-study-card' key={session._id}>
            <div className='userprofile-study-card-header'>
              <p>{session.createdAt.slice(0, 10)}</p>
              <button className='userprofile-study-card-delete'>x</button>
            </div>
            <p>
              Length:&nbsp;{session.length / 60 / 60}&nbsp;hour
              {session.length > 3600 ? 's' : ''}
            </p>
            <p>
              You {session.completed ? 'finished' : "didn't finish"} this
              session.
            </p>
          </div>
        ))}
    </div>
  );
};

export default StudyCard;
