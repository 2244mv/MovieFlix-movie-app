const API_KEY = "e9371981"; 
const BASE_URL = "https://www.omdbapi.com/";

export const getPopularMovies = async () => {
  const defaultSearch = "Avengers";
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${defaultSearch}`);
  const data = await res.json();
  return data.Search || [];
};

export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
};

export const getMovieDetails = async (id) => {
  if (!id) return null;
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  const data = await res.json();
  return data;
};
