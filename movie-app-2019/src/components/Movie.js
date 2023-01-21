import React from 'react';
import PropTypes from 'prop-types';

// If the component doesn't need any state, it deosn't have to be a class component.

function Movie({ id, url, title, desc, year, rating, genres }) {
  return (
    <div key={id}>
      <img src={url} alt={title} />
      <h1>{title}</h1>
      <h2>{desc}</h2>
      <p>Released in {year}</p>
      <p>Rating: {rating}</p>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
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
