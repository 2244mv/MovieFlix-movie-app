import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaHeart } from "react-icons/fa";
import { searchMovies } from "../api/Api";
import "../styles/Navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const timeoutRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const visibleResults = results.slice(0, 5);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([]);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        return;
      }
      const res = await searchMovies(value);
      setResults(res || []);
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (visibleResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % visibleResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + visibleResults.length) % visibleResults.length
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelectMovie(visibleResults[selectedIndex]);
      } else {
        handleSearchButton();
      }
    }
  };

  const handleSelectMovie = (movie) => {
    setQuery("");
    setResults([]);
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleSearchButton = async () => {
    if (!query.trim()) return;
    const res = await searchMovies(query);
    if (res && res.length > 0) {
      navigate(`/movie/${res[0].imdbID}`);
      setQuery("");
      setResults([]);
    } else {
      alert("No movie found!");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" className="logo">
          MovieFlix
        </Link>
      </div>

      {/* Search */}
      <div className="navbar-search" ref={searchRef}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
        />
        <button className="search-btn" onClick={handleSearchButton}>
          Search
        </button>

        {visibleResults.length > 0 && (
          <ul className="nav-suggestions" role="listbox">
            {visibleResults.map((movie, idx) => (
              <li
                key={movie.imdbID}
                className={selectedIndex === idx ? "active" : ""}
                role="option"
                aria-selected={selectedIndex === idx}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => handleSelectMovie(movie)}
              >
                {movie.Title} ({movie.Year})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <FaHome className="nav-icon" />
          <span className="nav-text">Home</span>
        </Link>

        <Link to="/favorites" className="nav-link">
          <FaHeart className="nav-icon" />
          <span className="nav-text">Favorites</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
