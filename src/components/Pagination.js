import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/moviesSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, movies, moviesPerPage, filters } = useSelector((state) => state.movies);

  // Appliquer les filtres pour déterminer le nombre total de films visibles
  const filteredMovies = filters.length
    ? movies.filter((movie) => filters.includes(movie.category))
    : movies;

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)} className="prev-next-button">
          Précédent
        </button>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)} className="prev-next-button">
          Suivant
        </button>
      )}
    </div>
  );
};

export default Pagination;
