import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { removeFromFavorites } from "../features/movies/moviesSlice";
import FavoritesList from "../components/FavoritesList";

export default function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.movies);

  const handleRemove = (id: string) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Избранное</h1>
      <FavoritesList favorites={favorites} onRemove={handleRemove} />
    </div>
  );
}
