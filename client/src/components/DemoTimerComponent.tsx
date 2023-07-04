import { useState, useEffect } from 'react';
import alarm from '../assets/alarm-clock-short-6402.mp3';

const Timer: React.FC = () => {
  const [count, setCount] = useState(7200);
  const [elapsed, setElapsed] = useState(0);
  const [start, setStart] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [studyText, setStudyText] = useState<string>('Studying');
  const [isBreak, setIsBreak] = useState<boolean>(false);

  const handleRestart = () => {
    setStart(false);
    setCount(7200);
    setElapsed(0);
    setIsBreak(false);
    setStudyText('Studying');
    setHours(2);
    setMinutes(0);
    setSeconds(0);
    document.title = 'StudyTracker';
  };

  useEffect(() => {
    const unloadCallback = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      document.title = 'StudyTracker';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => {
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, []);

  useEffect(() => {
    const alarmSound = new Audio(alarm);
    const checkStatus = () => {
      //7200s = 2h 1500s = 25m 300s = 5m
      if (elapsed >= 1500) {
        setStudyText('Break');
        alarmSound.play();
        setElapsed(0);
        setIsBreak(!isBreak);
      }
      if (elapsed >= 300 && studyText === 'Break') {
        setStudyText('Studying');
        alarmSound.play();
        setElapsed(0);
        setIsBreak(!isBreak);
      }
    };
    if (start) {
      const timer = setTimeout(() => {
        setCount(count - 1);
        setElapsed(elapsed + 1);
        setHours(Math.floor(count / 3600));
        setMinutes(Math.floor((count / 60) % 60));
        setSeconds(Math.floor(count % 60));
        checkStatus();
        document.title = `StudyTracker - ${studyText}`;
      }, 1000);

      if (count === 0) {
        alarmSound.play();
        setStart(false);
        setStudyText('Finished!');
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [start, elapsed, count, minutes, studyText, isBreak]);

  return (
    <>
      <div className='timer-box'>
        <div className={isBreak ? 'timer-component break' : 'timer-component'}>
          <div className={isBreak ? 'timer-numbers break' : 'timer-numbers'}>
            {hours <= 9 ? '0' + hours : hours}:
            {minutes <= 9 ? '0' + minutes : minutes}:
            {seconds <= 9 ? '0' + seconds : seconds}
          </div>
          <div className='timer-button-box'>
            <button
              onClick={() => {
                setStart(!start);
              }}
              className={isBreak ? 'timer-button break' : 'timer-button'}
            >
              {start ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => {
                handleRestart();
              }}
              className={isBreak ? 'timer-button break' : 'timer-button'}
            >
              Reset
            </button>
          </div>
          <p className={isBreak ? 'study-status break' : 'study-status'}>
            Currently: {studyText}.
          </p>
        </div>
      </div>
    </>
  );
};

export default Timer;
