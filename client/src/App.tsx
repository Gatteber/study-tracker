import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(100);
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [start, count]);
  return (
    <>
      <div>{count}</div>
      <button
        onClick={() => {
          setStart(true);
        }}
      ></button>
    </>
  );
}

export default App;
