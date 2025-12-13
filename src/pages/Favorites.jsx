import React from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import "../styles/Favorites.css";

const Favorites = ({ favorites, setFavorites }) => (
  <>
    <Navbar />
    <div className="container">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((m) => (
            <MovieCard
              key={m.imdbID}
              movie={m}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      )}
    </div>
  </>
);

export default Favorites;
