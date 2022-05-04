const getQuotes = document.querySelector('.quote');
const getAuthor = document.querySelector('.author');

const quotes = [
  {
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
  },
  {
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
  },
  {
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt',
  },
  {
    quote:
      'If you look at what you have in life, you will always have more. If you look at what you do not have in life, you will never have enough.',
    author: 'Oprah Winfrey',
  },
  {
    quote:
      'Life is a succession of lessons which must be lived to be understood.',
    author: 'Ralph Waldo Emerson',
  },
  {
    quote:
      'You will face many defeats in life, but never let yourself be defeated.',
    author: 'Maya Angelou',
  },
  {
    quote: 'The only impossible journey is the one you never begin.',
    author: 'Tony Robbins',
  },
  {
    quote: 'Only a life lived for others is a life worthwhile.',
    author: 'Albert Einstein',
  },
  {
    quote: 'The purpose of our lives is to be happy.',
    author: 'Dalai Lama',
  },
  {
    quote: 'Life is ours to be spent, not to be saved.',
    author: 'D.H.Lawrence',
  },
  {
    quote: 'Life is a long lesson in humility.',
    author: 'James M.Brrie',
  },
  {
    quote: 'Love the life you live. Live the life you love.',
    author: 'Bob Marley',
  },
];

const randomIndexQuote = Math.floor(Math.random() * quotes.length);

getQuotes.innerHTML = quotes[randomIndexQuote].quote;
getAuthor.innerHTML = quotes[randomIndexQuote].author;
