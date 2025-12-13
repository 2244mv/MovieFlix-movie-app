import { useState, useEffect } from "react";
import { searchMovies } from "../api/Api";
import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";
import "../styles/Home.css";

import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";

const categories = [
  { title: "Action", search: "Action" },
  { title: "Horror", search: "Horror" },
  { title: "Comedy", search: "Comedy" },
  { title: "Drama", search: "Drama" },
];

const banners = [Banner1, Banner2, Banner3];

const Home = ({ favorites, setFavorites }) => {
  const [rows, setRows] = useState({});
  const [currentBanner, setCurrentBanner] = useState(0);

  // Fetch movie rows
  useEffect(() => {
    const fetchAllCategories = async () => {
      const tempRows = {};
      for (const cat of categories) {
        const movies = await searchMovies(cat.search);
        tempRows[cat.title] = movies;
      }
      setRows(tempRows);
    };

    fetchAllCategories();
  }, []);

  // Banner slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* 🔥 BANNER SECTION */}
      <div className="banner-wrapper">
        <div className="featured-banner">
          {banners.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Banner"
              className={`banner-img ${
                index === currentBanner ? "visible" : "hidden"
              }`}
            />
          ))}

          <div className="banner-overlay" />

          <div className="banner-content">
            <h1>Welcome to MovieFlix</h1>
            <p>Discover your favorite movies and explore genres!</p>
          </div>
        </div>
      </div>

      {/* 🎬 MOVIE ROWS */}
      <div className="container">
        {Object.keys(rows).map((cat) => (
          <MovieRow
            key={cat}
            title={cat}
            movies={rows[cat]}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
