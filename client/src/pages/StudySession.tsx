import Timer from '../components/DemoTimerComponent';

const StudySession = () => {
  return (
    <div className='outlet-content'>
      <h1>StudySession</h1>
      <Timer />
      <div className='studysession-timer-settings'>
        <label htmlFor='studytime'>Length</label>
        <select name='studytime' id='studytime'>
          <option value={1}>1 hour</option>
          <option value={2}>2 hours</option>
          <option value={4}>4 hours</option>
          <option value={6}>6 hours</option>
          <option value={8}>8 hours</option>
        </select>
        <label htmlFor='studyinterval' id='studyinterval'>
          Studying time
        </label>
        <select name='studyinterval' id='studyinterval'>
          <option value={20}>20 minutes</option>
          <option value={25}>25 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={35}>35 minutes</option>
          <option value={40}>40 minutes</option>
        </select>
        <label htmlFor='breakinterval' id='breakinterval'>
          Break time
        </label>
        <select name='breakinterval' id='breakinterval'>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={15}>15 minutes</option>
          <option value={20}>20 minutes</option>
        </select>
      </div>
    </div>
  );
};

export default StudySession;
