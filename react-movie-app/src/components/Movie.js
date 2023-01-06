import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './Movie.module.css';

function Movie({ id, medium_cover_image, title, genres }) {
  return (
    <Link to={`/movies/${id}`} className={style.movie}>
      <img
        src={medium_cover_image}
        alt={title + 'image'}
        className={style.movie__img}
      />
      <h1 className={style.movie__title}>{title}</h1>
      <ul className={style.movie__genres}>
        {genres.length < 5
          ? genres.map((li, id) => (
              <li className={style.movie__genre} key={id}>
                {li}
              </li>
            ))
          : genres.slice(0, 4).map((li, id) => (
              <li className={style.movie__genre} key={id}>
                {li}
              </li>
            ))}
      </ul>
    </Link>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
