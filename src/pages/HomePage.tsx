import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { searchMovies, addToFavorites } from "../features/movies/moviesSlice";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";

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
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

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
