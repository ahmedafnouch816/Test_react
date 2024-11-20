import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/moviesSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const selectedFilters = useSelector((state) => state.movies.filters);

  // Récupérer dynamiquement les catégories disponibles
  const categories = Array.from(new Set(movies.map((movie) => movie.category)));

  const handleFilterChange = (category) => {
    let updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(category)) {
      updatedFilters = updatedFilters.filter((filter) => filter !== category);
    } else {
      updatedFilters.push(category);
    }
    dispatch(setFilters(updatedFilters));
  };

  return (
    <div className="filter">
      <h4>Filtrer par catégorie</h4>
      <div className="filter-container">
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={selectedFilters.includes(category)}
              onChange={() => handleFilterChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};
export default Filter;
