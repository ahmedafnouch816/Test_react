import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setPage, setMoviesPerPage } from '../redux/moviesSlice'; // Import de fetchMovies
import MovieCard from './MovieCard';
import Filter from './Filter';
import Pagination from './Pagination';

const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, filters, currentPage, moviesPerPage, status } = useSelector((state) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  // Appliquer les filtres
  const filteredMovies = filters.length
    ? movies.filter((movie) => filters.includes(movie.category))
    : movies;

  // Logique pour la pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleMoviesPerPageChange = (event) => {
    dispatch(setMoviesPerPage(Number(event.target.value)));
  };

  return (
    <div>
      <Filter />
      <div className="movies-container">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredMovies.length / moviesPerPage)}
        >
          Suivant
        </button>
        
      </div>


      <div className="items-per-page">
          <label>Films par page:</label>
          <select onChange={handleMoviesPerPageChange} value={moviesPerPage}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default MoviesList;
