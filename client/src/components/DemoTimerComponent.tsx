import { useState, useEffect, SetStateAction, useContext } from 'react';
import alarm from '../assets/alarm-clock-short-6402.mp3';
import { UserContext } from '../context/UserContext';

interface props {
  totalTime: number;
  studyInterval: number;
  breakInterval: number;
  submitSession?: boolean;
  setSubmitSession?: React.Dispatch<SetStateAction<boolean>>;
}

const Timer: React.FC<any> = ({
  totalTime,
  studyInterval,
  breakInterval,
  submitSession,
  setSubmitSession,
}: props) => {
  const [count, setCount] = useState(totalTime);
  const [elapsed, setElapsed] = useState(0);
  const [start, setStart] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [studyText, setStudyText] = useState<string>('Studying');
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState('');
  const { user } = useContext(UserContext);

  const handleRestart = () => {
    setStart(false);
    setCount(totalTime);
    setElapsed(0);
    setIsBreak(false);
    setStudyText('Studying');
    setHours(2);
    setMinutes(0);
    setSeconds(0);
    document.title = 'StudyTracker';
  };

  const handleSubmit = async (time: number) => {
    const data = {
      _id: user._id,
      length: time,
      completed: false,
      comment: '',
    };
    const apiUrlProxy = '/api/study-sessions/new';
    try {
      const createNewSession = await fetch(apiUrlProxy, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newSession = await createNewSession.json();
      if (newSession) {
        setSessionId(newSession._id);
        console.log(newSession);
      } else {
        //session creation failed
        alert(newSession.message);
      }
    } catch (err) {
      console.error(err);
    }
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

  //bind timer/hours to user selected time
  useEffect(() => {
    const calculateHours = (seconds: number) => {
      return Math.floor(seconds / 3600);
    };
    setCount(totalTime);
    setHours(calculateHours(totalTime));
  }, [totalTime]);

  useEffect(() => {
    const alarmSound = new Audio(alarm);
    const checkStatus = () => {
      //7200s = 2h 1500s = 25m 300s = 5m
      if (elapsed >= studyInterval) {
        setStudyText('Break');
        alarmSound.play();
        setElapsed(0);
        setIsBreak(!isBreak);
      }
      if (elapsed >= breakInterval && studyText === 'Break') {
        setStudyText('Studying');
        alarmSound.play();
        setElapsed(0);
        setIsBreak(!isBreak);
      }
    };
    if (start) {
      const timer = setTimeout(() => {
        if (submitSession) {
          setSubmitSession!(false);
          handleSubmit(totalTime);
        }
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
  }, [
    start,
    elapsed,
    count,
    minutes,
    studyText,
    isBreak,
    breakInterval,
    studyInterval,
  ]);

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
