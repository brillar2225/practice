import { useState, useEffect, useRef, useCallback } from 'react';
import Movie from '../components/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import style from './Home.module.css';

function Home() {
  const [scroll, setScroll] = useState(0);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [opacity, setOpacity] = useState(0);
  const homeRef = useRef(null);
  const btnRef = useRef(null);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  const handleScroll = useCallback(() => {
    const homeHeight = homeRef.current.offsetHeight;

    setScroll(window.scrollY);
    setOpacity(scroll / homeHeight);

    if (scroll > homeHeight / 2) {
      btnRef.current.classList.add('visible');
    } else {
      btnRef.current.classList.remove('visible');
    }
    btnRef.current.style.opacity = opacity;
  }, [opacity, scroll]);

  useEffect(() => {
    getMovies();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={style.body} ref={homeRef}>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <div className={style.home}>
          <div className={style.home__movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                medium_cover_image={movie.medium_cover_image}
                title={movie.title}
                genres={movie.genres}
              />
            ))}
          </div>
          <a href='#root' className={style.home__btn} ref={btnRef}>
            <FontAwesomeIcon icon={faArrowUp} className={style.home__icon} />
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
