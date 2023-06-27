import { useState, useEffect } from 'react';
import slides from '../data/Carousel';
import idea from '../assets/idea-svgrepo-com.svg';
import question from '../assets/question-mark-svgrepo-com.svg';
import brain from '../assets/brain-14-svgrepo-com.svg';

type Slide = {
  src: string;
  alt: string;
  txt: string;
};

const Hero: React.FC = () => {
  const data: Slide[] = slides;
  const [slideIndex, setSlideIndex] = useState<number>(0);
  useEffect(() => {
    const rotateCarousel = setTimeout(() => {
      if (slideIndex >= 2) {
        setSlideIndex(0);
      } else {
        setSlideIndex(slideIndex + 1);
      }
    }, 10000);
    return () => clearTimeout(rotateCarousel);
  }, [slideIndex]);
  return (
    <div className='hero-section'>
      <h2>Why Study Tracker?</h2>
      <div className='hero-box'>
        <div className='hero-box-left'>
          {data.map((slide, i: number) => {
            return (
              <p
                key={i}
                className={slideIndex === i ? 'hero-box-left-text' : ''}
              >
                {slideIndex === i ? slide.txt : null}
              </p>
            );
          })}
        </div>
        <div className='hero-box-right'>
          <div className='hero-c'>
            {data.map((slide, i: number) => {
              return (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  id={i.toString()}
                  key={i}
                  className={
                    slideIndex === i
                      ? 'hero-img-c hero-img-c-active'
                      : 'hero-img-c'
                  }
                ></img>
              );
            })}
          </div>
          <div className='hero-dotbox-c'>
            {data.map((_, i: number) => {
              return (
                <span
                  className={slideIndex === i ? 'dot-c dot-c-active' : 'dot-c'}
                  key={i}
                ></span>
              );
            })}
          </div>
        </div>
      </div>
      <p className='hero-text'>
        Study Tracker combines the Pomodoro method of studying with a trackable
        study section, just like a game. As you study more, you can see a visual
        represntation of how much you study, and when you finally get the test
        score you're looking for, you know it's going to feel great.
      </p>
      <h3 className='get-informed'>Get informed.</h3>
      <div className='hero-info'>
        <div className='hero-info-question'>
          <p>
            <strong>Question:</strong>
          </p>
          <p>What is "Pomodoro"?</p>
          <img src={question} alt='question svg'></img>
        </div>
        <div className='hero-info-answer'>
          <p>
            The Pomodoro method of studing is a spaced studying method that
            involves taking a break after a set amount of working or studying
            time. Usually, this is done in a 25 minute work, 5 minute break
            cycle. However, there are many common styles. It allows your brain
            to take a break, while still keeping the user engaged.
          </p>
        </div>
        <div className='hero-info-answer'>
          <p>
            Studying isn't something that most people enjoy. It takes time,
            effort, and above all, dedication. Study Tracker helps you manage
            your expectations by building good study habits. Good habits lead to
            productive studying, which leads to a successful life.
          </p>
        </div>
        <div className='hero-info-question'>
          <p>
            <strong>Problem:</strong>
          </p>
          <p>You hate studying.</p>
          <img src={brain} alt='question svg'></img>
        </div>
        <div className='hero-info-question'>
          <p>
            <strong>Solution:</strong>
          </p>
          <p>Take control.</p>
          <img src={idea} alt='question svg'></img>
        </div>
        <div className='hero-info-answer'>
          <p>
            Using Study Tracker to establish good studying habits allows you to
            feel control over your studying. You can get what you want done,
            without the need to constantly beat yourself up over your lack of
            studying time. Repetition and timing is key.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
