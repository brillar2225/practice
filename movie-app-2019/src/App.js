import React from 'react';
import axios from 'axios';
import Movie from './components/Movie';
import style from './App.module.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=rating&minimum_rating=8'
    );
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <div className={style.body__container}>
        {isLoading ? (
          <div className={style.loading}>
            <div className={style.loading__bar}>loading</div>
          </div>
        ) : (
          movies.map((movie) => {
            return (
              <div className={style.movies}>
                <Movie
                  key={movie.id}
                  id={movie.id}
                  url={movie.medium_cover_image}
                  title={movie.title}
                  desc={movie.summary}
                  year={movie.year}
                  rating={movie.rating}
                  genres={movie.genres}
                />
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default App;
