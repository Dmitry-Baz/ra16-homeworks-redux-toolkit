import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  fetchMovieDetails,
  addToFavorites,
  removeFromFavorites,
} from "../features/movies/moviesSlice";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selectedMovie, loading, error, favorites } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!selectedMovie) return <div>Фильм не найден</div>;

  const isInFavorites = favorites.some(
    (fav) => fav.imdbID === selectedMovie.imdbID
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={
            selectedMovie.Poster !== "N/A"
              ? selectedMovie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={selectedMovie.Title}
          style={{ width: "300px", height: "450px", objectFit: "cover" }}
        />
        <div>
          <h1>
            {selectedMovie.Title} ({selectedMovie.Year})
          </h1>
          <p>
            <strong>Жанр:</strong> {selectedMovie.Genre}
          </p>
          <p>
            <strong>Режиссёр:</strong> {selectedMovie.Director}
          </p>
          <p>
            <strong>Актёры:</strong> {selectedMovie.Actors}
          </p>
          <p>
            <strong>Продолжительность:</strong> {selectedMovie.Runtime}
          </p>
          <p>
            <strong>Рейтинг IMDb:</strong> {selectedMovie.imdbRating}
          </p>
          <p>
            <strong>Награды:</strong> {selectedMovie.Awards}
          </p>
          <p>{selectedMovie.Plot}</p>
          <button
            onClick={() =>
              isInFavorites
                ? dispatch(removeFromFavorites(selectedMovie.imdbID))
                : dispatch(
                    addToFavorites({
                      imdbID: selectedMovie.imdbID,
                      Title: selectedMovie.Title,
                      Year: selectedMovie.Year,
                      Type: selectedMovie.Type,
                      Poster: selectedMovie.Poster,
                    })
                  )
            }
            style={{ marginTop: "20px", padding: "8px 16px" }}
          >
            {isInFavorites ? "Удалить из избранного" : "Добавить в избранное"}
          </button>
        </div>
      </div>
    </div>
  );
}
