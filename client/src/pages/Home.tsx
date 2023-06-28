import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className='outlet-content'>
      <div className='landing-box'>
        <div className='landing-box-left'>
          <h1>
            Study Tracker - Improve your focus, prepare yourself, and grow
          </h1>
          <p>
            Let's face it: Studying nowadays is hard. Study Tracker can help you
            to get more mileage out of your studying, even when you're tired.
          </p>
          <Link to='/demo'>
            <button id='landing-button'>Try it now!</button>
          </Link>
        </div>
      </div>
      <Hero />
      <div className='hero-transition'></div>
      <div className='cta'>
        <div className='cta-box'>
          <h3> What are you waiting for?</h3>
          <p>Get studying now.</p>
          <div className='cta-button-box'>
            <Link to='/signup'>
              <button id='landing-button'>Register</button>
            </Link>
            <Link to='/login'>
              <button id='landing-button'>Sign in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
