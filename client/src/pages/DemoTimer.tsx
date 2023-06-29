import DemoTimerComponent from '../components/DemoTimerComponent';

const DemoTimer: React.FC = () => {
  return (
    <div className='outlet-content'>
      <h1 className='h1-demo-text'>Try StudyTracker!</h1>
      <DemoTimerComponent />
    </div>
  );
};

export default DemoTimer;
