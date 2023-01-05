import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <img src={movie.large_cover_image} alt={`${movie.title} cover`} />
          <div className={style.detail__info}>
            <h1 className={style.detail__title}>{movie.title_long}</h1>
            <ul className={style.detail__genres}>
              {movie.genres.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className={style.detail__box}>
              <h2 className={style.detail__desc}>{movie.description_full}</h2>
              <div className={style.detail__infos}>
                <span className={style.detail__year}>{movie.year}</span>
                <span className={style.detail__runtime}>
                  {movie.runtime} minutes
                </span>
                <span className={style.detail__rating}>
                  Rating : {movie.rating}
                </span>
                <span className={style.detail__language}>
                  Language : {movie.language}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
