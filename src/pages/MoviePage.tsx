import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  fetchMovieDetails,
  addToFavorites,
  removeFromFavorites,
} from "../features/movies/moviesSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieDetails from "../components/MovieDetails";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
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
  if (!selectedMovie)
    return <div style={{ padding: "20px" }}>Фильм не найден</div>;

  const isInFavorites = favorites.some(
    (fav) => fav.imdbID === selectedMovie.imdbID
  );

  const toggleFavorite = () => {
    if (isInFavorites) {
      dispatch(removeFromFavorites(selectedMovie.imdbID));
    } else {
      dispatch(
        addToFavorites({
          imdbID: selectedMovie.imdbID,
          Title: selectedMovie.Title,
          Year: selectedMovie.Year,
          Type: selectedMovie.Type,
          Poster: selectedMovie.Poster,
        })
      );
    }
  };

  return (
    <MovieDetails
      movie={selectedMovie}
      isInFavorites={isInFavorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}
