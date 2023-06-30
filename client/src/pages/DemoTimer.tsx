import { Link } from 'react-router-dom';
import DemoTimerComponent from '../components/DemoTimerComponent';

const DemoTimer: React.FC = () => {
  return (
    <div className='outlet-content'>
      <h1 className='h1-demo-text'>Try StudyTracker!</h1>
      <DemoTimerComponent />
      <div className='instructions-box'>
        <p>Instructions:</p>
        <ol className='list-instructions' type='1'>
          <li>
            Prepare yourself. Get ready to study and have all your essentials
            nearby.
          </li>
          <li>
            Click the start button. It will begin counting down from 2 hours.
          </li>
          <li>
            Begin studying. You'll study for 25 minutes before having a 5 minute
            break.
          </li>
          <li>
            When you hear the alarm, take a break! You'll hear the alarm again
            when your break is finished.
          </li>
          <li>After the second alarm, it's back to studying.</li>
          <li>Repeat the process until the timer hits zero.</li>
          <li>
            Congratulations! You just completed your first study session. Take a
            breather, relax, and do it again!
          </li>
          <li>
            Pat yourself on the back for studying and focusing. Remember, you
            want to build positive habits as you grow!
          </li>
          <li>
            Like what you just did? Consider{' '}
            <Link className='signup-link' to='/signup'>
              signing up
            </Link>{' '}
            for more benefits such as having a record of your studies,
            customizing the timer, and more!
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DemoTimer;
