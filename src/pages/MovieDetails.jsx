import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMovieDetails } from "../api/Api";
import "../styles/MovieDetails.css";

const MovieDetails = ({ favorites, setFavorites }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="movie-details">
        <img src={movie.Poster} alt={movie.Title} />
        <div>
          <h2>{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
