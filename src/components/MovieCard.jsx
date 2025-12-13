import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/MovieCard.css";

const MovieCard = ({ movie, favorites, setFavorites }) => {
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="movie-card">
      {/* Favorite Icon at Top Right */}
      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorite ? (
          <FaHeart color="#e50914" size={20} />
        ) : (
          <FaRegHeart color="#fff" size={20} />
        )}
      </div>

      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
