import books from '../assets/BooksLanding.jpg';
import coffee from '../assets/Coffee.jpg';
import outdoor from '../assets/Outdoor.jpg';

type Slide = {
  src: string;
  alt: string;
  txt: string;
};

const slides: Slide[] = [
  {
    src: books,
    alt: 'track your studies',
    txt: 'Track your Studies.',
  },
  {
    src: outdoor,
    alt: 'improve your life',
    txt: 'Improve your Life.',
  },
  {
    src: coffee,
    alt: 'get what you want',
    txt: 'Get what you want.',
  },
];

export default slides;
