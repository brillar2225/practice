import React from 'react';
import axios from 'axios';
import Movie from './components/Movie';

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
      <div>
        {isLoading
          ? 'Loading'
          : movies.map((movie) => {
              return (
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
              );
            })}
      </div>
    );
  }
}

export default App;
