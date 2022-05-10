const imgaes = [
  'city.jpg',
  'elephant.jpg',
  'fall.jpg',
  'fuji.jpg',
  'ocean.jpg',
  'ocean2.jpg',
  'rail.jpg',
  'sun.jpg',
];

const randomIndexImages = Math.floor(Math.random() * imgaes.length);
const randomImages = imgaes[randomIndexImages];

const url = `url(img/${randomImages})`;

const background = document.querySelector('.background');
background.style.backgroundImage = url;
