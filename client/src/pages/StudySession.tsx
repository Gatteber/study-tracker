import { useState } from 'react';
import Timer from '../components/DemoTimerComponent';

const StudySession = () => {
  const [totalTime, setTotalTime] = useState<number>(7200);
  const [studyInterval, setStudyInterval] = useState<number>(1500);
  const [breakInterval, setBreakInterval] = useState<number>(300);
  const [hideSettings, setHideSettings] = useState<boolean>(true);
  const [submitSession, setSubmitSession] = useState<boolean>(true);

  const handleClick = () => {
    setHideSettings(hideSettings => !hideSettings);
  };
  return (
    <div className='outlet-content'>
      <h1>StudySession</h1>
      <Timer
        totalTime={totalTime}
        studyInterval={studyInterval}
        breakInterval={breakInterval}
        submitSession={submitSession}
        setSubmitSession={setSubmitSession}
      />
      <div className='settings-box'>
        {hideSettings ? (
          <button
            className='settings-button'
            onClick={() => {
              handleClick();
            }}
          >
            Edit Settings
          </button>
        ) : (
          <div className='studysession-timer-settings'>
            <label htmlFor='studytime'>Length</label>
            <select
              name='studytime'
              id='studytime'
              value={totalTime}
              onChange={e => setTotalTime(parseInt(e.target.value))}
            >
            <option value={60}>1 minute(dev only)</option>
              <option value={3600}>1 hour</option>
              <option value={7200}>2 hours</option>
              <option value={14400}>4 hours</option>
              <option value={21600}>6 hours</option>
              <option value={28800}>8 hours</option>
            </select>
            <label htmlFor='studyinterval' id='studyinterval'>
              Studying time
            </label>
            <select
              name='studyinterval'
              id='studyinterval'
              value={studyInterval}
              onChange={e => setStudyInterval(parseInt(e.target.value))}
            >
              <option value={1200}>20 minutes</option>
              <option value={1500}>25 minutes</option>
              <option value={1800}>30 minutes</option>
              <option value={2100}>35 minutes</option>
              <option value={2400}>40 minutes</option>
            </select>
            <label htmlFor='breakinterval' id='breakinterval'>
              Break time
            </label>
            <select
              name='breakinterval'
              id='breakinterval'
              value={breakInterval}
              onChange={e => setBreakInterval(parseInt(e.target.value))}
            >
              <option value={300}>5 minutes</option>
              <option value={600}>10 minutes</option>
              <option value={900}>15 minutes</option>
              <option value={1200}>20 minutes</option>
            </select>
            <button
              onClick={() => {
                handleClick();
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySession;
