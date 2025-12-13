import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieRow.css";

// Skeleton card component
const MovieSkeleton = ({ index }) => (
  <div
    className="movie-item skeleton movie-load"
    style={{ animationDelay: `${index * 0.08}s` }}
  >
    <div className="image-placeholder"></div>
    <div className="text-placeholder"></div>
  </div>
);

const MovieRow = ({
  title = "Movies",
  movies = [],
  favorites,
  setFavorites,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    // Simulate API loading delay
    setTimeout(() => {
      setLoaded(true);
      setLoadingData(false); // data "fetched"
    }, 1500);
  }, []);

  const placeholders = Array(8).fill(0); // Number of skeleton cards

  return (
    <section
      className={`movie-row ${loaded ? "loaded" : ""}`}
      aria-label={title}
    >
      <div className="row-header">
        <h2>{title}</h2>
      </div>

      <div className="movies-row scrollable" ref={rowRef}>
        {loadingData
          ? placeholders.map((_, index) => (
              <MovieSkeleton key={index} index={index} />
            ))
          : movies.map((movie, index) => {
              const key = movie?.imdbID ?? movie?.id ?? index;
              return (
                <div
                  key={key}
                  className="movie-item movie-load"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <MovieCard
                    movie={movie}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default MovieRow;
