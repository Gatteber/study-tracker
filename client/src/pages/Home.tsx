import BooksLanding from '../assets/BooksLanding.jpg';
import Timer from '../components/Timer';

const Home: React.FC = () => {
  return (
    <div className='outlet-content'>
      <div className='landing-box'>
        <div className='landing-box-left'>
          <h1>
            Study Tracker - Improve your focus, attune your mind, and study hard
          </h1>
          <p>
            Let's face it: studying nowadays is hard. Study Tracker can help you
            to get more mileage out of your studying, even when you're tired.
          </p>
          <button>Sign up for free!</button>
        </div>
        <div className='landing-box-right'>
          <img
            src={BooksLanding}
            className='landing-box-picture'
            alt='landing box picture'
          ></img>
        </div>
      </div>
      <Timer />
    </div>
  );
};
export default Home;
