import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(3600);
  const [start, setStart] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => {
        setCount(count - 1);
        setHours(Math.floor(count / 3600));
        setMinutes(Math.floor((count / 60) % 60));
        setSeconds(Math.floor(count % 60));
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [start, count]);
  return (
    <>
      <div>
        {hours < 9 ? '0' + hours : hours}:
        {minutes < 9 ? '0' + minutes : minutes}:
        {seconds < 9 ? '0' + seconds : seconds}
      </div>
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
    </>
  );
}

export default App;
