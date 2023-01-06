import { useState, useEffect } from 'react';
import Movie from '../components/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import style from './Home.module.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={style.body}>
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
          <button className={style.home__btn}>
            <FontAwesomeIcon icon={faArrowUp} className={style.home__icon} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
