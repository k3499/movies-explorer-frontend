const checkMovieTitle = (movie, query) => (movie.nameRU.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase())
  || (movie.nameEN && movie.nameEN.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase())));

const checkIfIsShort = (movie) => (movie.duration <= 40);

const searchMovies = (movies, query) => {
  const queryArr = query.toLowerCase().trim().split(' ');
  const result = movies.filter((movie) => {
    for (let i = 0; i < queryArr.length; i += 1) {
      if (!checkMovieTitle(movie, queryArr[i])) {
        return false;
      }
    }
    return true;
  });
  return result;
};

export {
  searchMovies,
  checkIfIsShort,
};
