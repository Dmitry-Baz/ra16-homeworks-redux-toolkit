import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { searchMovies, addToFavorites } from "../features/movies/moviesSlice";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query.trim()));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Поиск фильмов</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название фильма..."
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit">Найти</button>
      </form>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : searchResults.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {searchResults.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onAddToFavorites={() => dispatch(addToFavorites(movie))}
            />
          ))}
        </div>
      ) : query ? (
        <p>Фильмы не найдены</p>
      ) : null}
    </div>
  );
}
