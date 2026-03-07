import type { MovieSearchResult } from "../features/movies/types";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: MovieSearchResult;
  onAddToFavorites: () => void;
}

export default function MovieCard({ movie, onAddToFavorites }: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        width: "200px",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/200x300?text=No+Poster"
        }
        alt={movie.Title}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div style={{ padding: "12px" }}>
        <h3>{movie.Title}</h3>
        <p>
          {movie.Year} • {movie.Type}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToFavorites();
          }}
          style={{ marginTop: "8px", padding: "4px 8px", fontSize: "12px" }}
        >
          В избранное
        </button>
      </div>
    </div>
  );
}
