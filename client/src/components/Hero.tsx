import { useState, useEffect } from 'react';
import slides from '../data/Carousel';

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
    </div>
  );
};

export default Hero;
