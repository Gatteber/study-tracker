import {useState, useEffect, ChangeEvent} from 'react';

const Timer: React.FC = () => {
  const [count, setCount] = useState(610);
  const [start, setStart] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [createTimer, setCreateTimer] = useState('00:00:00');
  const [studyText, setStudyText] = useState<string>('Studying.');

  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => {
        setCount(count - 1);
        setHours(Math.floor(count / 3600));
        setMinutes(Math.floor((count / 60) % 60));
        setSeconds(Math.floor(count % 60));
        //hacky breaktime setup.
        if (minutes % 5 === 0) {
          setStudyText('Break.');
        } else {
          setStudyText('Studying.');
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [start, count, minutes]);

  //form element only accepts numbers, so we can assert we will receive something parsable by parseInt
  const maxLengthCheck = (field: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(field.currentTarget.value) > 7) {
      field.currentTarget.value = field.currentTarget.value.slice(0, 6);
    }
    const [timeHours, timeMinutes, timeSeconds] = [
      field.currentTarget.value.slice(0, 2),
      field.currentTarget.value.slice(2, 4),
      field.currentTarget.value.slice(4, 6),
    ];
    setCreateTimer(`${timeHours}:${timeMinutes}:${timeSeconds}`);
  };
  return (
    <>
      <div>
        {hours <= 9 ? '0' + hours : hours}:
        {minutes <= 9 ? '0' + minutes : minutes}:
        {seconds <= 9 ? '0' + seconds : seconds}
      </div>
      <div>{createTimer}</div>
      <button
        onClick={() => {
          setStart(true);
        }}
      >
        Start Timer
      </button>
      <button
        onClick={() => {
          setStart(start ? false : true);
        }}
      >
        {' '}
        Pause Timer
      </button>
      <input
        type="number"
        name="number"
        id="number"
        onChange={(e) => maxLengthCheck(e)}
        placeholder="00:00:00"
      />
      <div>Currently: {studyText}</div>
    </>
  );
};

export default Timer;
