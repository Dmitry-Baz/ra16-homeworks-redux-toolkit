import type { MovieSearchResult } from "../features/movies/types";
import MovieCard from "./MovieCard";

interface Props {
  favorites: MovieSearchResult[];
  onRemove: (id: string) => void;
}

export default function FavoritesList({ favorites, onRemove }: Props) {
  if (favorites.length === 0) {
    return <p>Нет фильмов в избранном</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {favorites.map((movie) => (
        <div key={movie.imdbID} style={{ position: "relative" }}>
          <MovieCard movie={movie} onAddToFavorites={() => {}} />
          <button
            onClick={() => onRemove(movie.imdbID)}
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
  );
}
