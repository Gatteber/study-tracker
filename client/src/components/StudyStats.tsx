import { SessionData } from '../pages/UserProfile';

interface props {
  statsActive: boolean;
  handleStudyClick: () => void;
  studySessions: SessionData[] | undefined;
}

const StudyStats = ({
  handleStudyClick,
  statsActive,
  studySessions,
}: props) => {
  const calculateCompleted = (studyData: SessionData[] | undefined) => {
    if (studyData === undefined) return 0;
    let total = 0;
    for (let i = 0; i < studyData.length; i++) {
      if (studyData[i].completed === true) {
        total = total + 1;
      }
    }
    return total;
  };
  const calculateTimeStudied = (studyData: SessionData[] | undefined) => {
    if (studyData === undefined) return 0;
    let total = 0;
    for (let i = 0; i < studyData.length; i++) {
      if (studyData[i].completed === true) {
        total = total + studyData[i].length;
      }
    }
    return total;
  };
  const calculateMode = (studyData: SessionData[] | undefined) => {
    type TKey = {
      [key: string]: number;
    };
    if (studyData === undefined || studyData.length === 0) return 0;
    const modeMap: TKey = {};
    let maxEl = studyData[0].length,
      maxCount = 1;
    for (let i = 0; i < studyData.length; i++) {
      const el = studyData[i].length;
      if (modeMap[el] == null) {
        modeMap[el] = 1;
      } else {
        modeMap[el]++;
      }
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  };
  return (
    <div className={statsActive ? 'stats active' : 'stats'}>
      <div className={statsActive ? 'stats-bg active' : 'stats-bg'}></div>
      <div className={statsActive ? 'stats-box active' : 'stats-box'}>
        <div className='stats-header'>
          <h3 className='stats-text'>Your Study Stats</h3>
          <button
            onClick={() => {
              handleStudyClick();
            }}
          >
            {' '}
            X{' '}
          </button>
          <div className='stats-body'>
            <ul>
              <li>
                Study sessions: {studySessions ? studySessions.length : 0}{' '}
              </li>
              <li>Completed sessions: {calculateCompleted(studySessions)}</li>
              <li>
                Time studied:{' '}
                {calculateTimeStudied(studySessions) / 3600 + ' hours'}{' '}
              </li>
              <li>
                Most frequent study time:
                {calculateMode(studySessions) / 3600 + ' hours'}{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStats;
