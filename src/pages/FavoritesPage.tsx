import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { removeFromFavorites } from "../features/movies/moviesSlice";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.movies);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Избранное</h1>
      {favorites.length === 0 ? (
        <p>Нет фильмов в избранном</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {favorites.map((movie) => (
            <div key={movie.imdbID} style={{ position: "relative" }}>
              <MovieCard movie={movie} onAddToFavorites={() => {}} />
              <button
                onClick={() => dispatch(removeFromFavorites(movie.imdbID))}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
