import axios from 'axios';
import React from 'react';
import style from './About.module.css';

class About extends React.Component {
  state = {
    isLoading: true,
    movie: [],
  };

  async componentDidMount() {
    const { id } = this.props;
    const {
      data: {
        data: { movie },
      },
    } = await axios.get(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    this.setState({ movie, isLoading: false });
  }

  render() {
    const { movie, isLoading } = this.state;
    const bg = {
      backgroundImage: `url('${movie.background_image_original}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <div className={style.body__container} style={bg}>
        {isLoading ? (
          <div className={style.loading}>
            <div className={style.loading__bar}>loading</div>
          </div>
        ) : (
          <div className={style.about}>
            <div className={style.about__container}>
              <img
                src={movie.large_cover_image}
                title={movie.title}
                alt={movie.title}
              />
              <div className={style.about__infos}>
                <div className={style.about__title__group}>
                  <h1 className={style.about__title}>{movie.title}</h1>
                  <ul className={style.about__genres}>
                    {movie.genres.map((genre, index) => (
                      <li className={style.about__genre} key={index}>
                        {genre}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={style.about__details}>
                  <h2 className={style.about__desc}>
                    {movie.description_full}
                  </h2>
                  <p className={style.about__detail}>
                    Released year: {movie.year}
                  </p>
                  <p className={style.about__detail}>
                    Rating: {movie.rating} / 10
                  </p>
                  <p className={style.about__detail}>
                    Language: {movie.language}
                  </p>
                  <p className={style.about__detail}>
                    Language: {movie.language}
                  </p>
                  <p className={style.about__detail}>
                    Runtime: {movie.runtime}{' '}
                    {movie.rutime <= 1 ? 'minute' : 'mitunes'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default About;
