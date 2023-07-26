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
            className='stats-button'
            onClick={() => {
              handleStudyClick();
            }}
          >
            {' '}
            X{' '}
          </button>
        </div>
        <div className='stats-body'>
          <ul className='stats-list'>
            <li>
              Study sessions:{' '}
              <span className='stats-numbertext'>
                {studySessions ? studySessions.length : 0}
              </span>{' '}
            </li>
            <li>
              Completed sessions:{' '}
              <span className='stats-numbertext'>
                {calculateCompleted(studySessions)}
              </span>
            </li>
            <li>
              Time studied:{' '}
              <span className='stats-numbertext'>
                {calculateTimeStudied(studySessions) / 3600 + ' hours'}{' '}
              </span>
            </li>
            <li>
              Most frequent study time:{' '}
              <span className='stats-numbertext'>
                {calculateMode(studySessions) / 3600 + ' hours'}{' '}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudyStats;
