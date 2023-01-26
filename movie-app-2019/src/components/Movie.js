import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './Movie.module.css';

// If the component doesn't need any state, it deosn't have to be a class component.
function Movie({ id, url, title, desc, year, rating, genres }) {
  return (
    <Link to={`/movies/${id}`} className={style.movie}>
      <img src={url} alt={title} title={title} className={style.movie__img} />
      <div className={style.movie__infos}>
        <div className={style.movie__title__group}>
          <h1 className={style.movie__title}>{title}</h1>
          <div className={style.movie__details}>
            <p className={style.movie__year}>Released in {year}</p>
            <p className={style.movie__rating}>Rating: {rating}</p>
          </div>
        </div>
        <h2 className={style.movie__desc}>
          {desc.length < 290 ? desc : `${desc.slice(0, 300)}...`}
        </h2>
        <ul className={style.movie__genres}>
          {genres.length < 6
            ? genres.map((genre, index) => (
                <li key={index} className={style.movie__genre}>
                  {genre}
                </li>
              ))
            : genres.slice(0, 4).map((genre, index) => (
                <li key={index} className={style.movie__genre}>
                  {genre}
                </li>
              ))}
        </ul>
      </div>
    </Link>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  year: PropTypes.number,
  rating: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
