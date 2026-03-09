import type { MovieDetails } from "../features/movies/types";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: MovieDetails;
  isInFavorites: boolean;
  onToggleFavorite: () => void;
}

export default function MovieDetails({
  movie,
  isInFavorites,
  onToggleFavorite,
}: Props) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/300x450?text=No+Poster"
          }
          alt={movie.Title}
          style={{ width: "300px", height: "450px", objectFit: "cover" }}
        />
        <div>
          <h1>
            {movie.Title} ({movie.Year})
          </h1>
          <p>
            <strong>Жанр:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Режиссёр:</strong> {movie.Director}
          </p>
          <p>
            <strong>Актёры:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Продолжительность:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Рейтинг IMDb:</strong> {movie.imdbRating}
          </p>
          <p>
            <strong>Награды:</strong> {movie.Awards}
          </p>
          <p>{movie.Plot}</p>
          <button
            onClick={onToggleFavorite}
            style={{ marginTop: "20px", padding: "8px 16px" }}
          >
            {isInFavorites ? "Удалить из избранного" : "Добавить в избранное"}
          </button>
        </div>
      </div>
    </div>
  );
}
