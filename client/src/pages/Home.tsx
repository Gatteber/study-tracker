import Hero from '../components/Hero';
import Timer from '../components/Timer';

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
          <button id='landing-button'>Try it now!</button>
        </div>
      </div>
      <Hero />
      <div className='hero-transition'></div>
      <div className='cta'>
        <h3> What are you waiting for?</h3>
        <p>Let's study together</p>
        <button id='landing-button'>Sign up</button>
      </div>
      <Timer />
    </div>
  );
};
export default Home;
