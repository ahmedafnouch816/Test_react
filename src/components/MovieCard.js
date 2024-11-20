import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMovie, toggleLikeDislike } from '../redux/moviesSlice';
import '../styles.css';



const MovieCard = ({ movie }) => {
  const { id, title, category, likes, dislikes, liked } = movie;
  const dispatch = useDispatch();

  // Calcul du ratio likes/dislikes
  const total = likes + dislikes;
  const likePercentage = total > 0 ? (likes / total) * 100 : 0;

  const handleDelete = () => {
    dispatch(deleteMovie(id));
  };

  const handleToggleLikeDislike = () => {
    dispatch(toggleLikeDislike(id));
  };

  return (
    <div className="movie-card">
      <h3>{title}</h3>
      <p>{category}</p>
      <div className="gauge">
        <div className="likes" style={{ width: `${likePercentage}%` }}></div>
      </div>
      <p>
        👍 {likes} | 👎 {dislikes}
      </p>
      <button onClick={handleToggleLikeDislike} className={`toggle-button ${liked ? 'liked' : ''}`}>
        {liked ? 'Dislike' : 'Like'}
      </button>
      <button onClick={handleDelete} className="delete-button">
        Supprimer
      </button>
    </div>
  );
};

export default MovieCard;
