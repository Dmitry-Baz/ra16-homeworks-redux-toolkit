import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <Router>
      <nav
        style={{
          padding: "16px",
          backgroundColor: "#f0f0f0",
          marginBottom: "20px",
        }}
      >
        <Link to="/" style={{ marginRight: "16px" }}>
          Главная
        </Link>
        <Link to="/favorites">Избранное</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}
