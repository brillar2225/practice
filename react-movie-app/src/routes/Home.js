import { useState, useEffect, useRef, useCallback } from 'react';
import Movie from '../components/Movie';
import Button from '../components/Button';
import style from './Home.module.css';

function Home() {
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

    setOpacity(window.scrollY / (homeHeight - window.scrollY));

    if (window.scrollY > homeHeight / 4) {
      btnRef.current.classList.add(style.visible);
    } else {
      btnRef.current.classList.remove(style.visible);
    }
  }, []);

  useEffect(() => {
    getMovies();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={style.container} ref={homeRef}>
      {loading ? (
        <div className={style.loading}>
          <div className={style.loading__bar}>loading</div>
        </div>
      ) : (
        <div className={style.home}>
          <div className={style.home__box}>
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
            <Button style={style} opacity={opacity} btnRef={btnRef} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
