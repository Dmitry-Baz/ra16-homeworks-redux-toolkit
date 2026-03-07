import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type { MovieSearchResult, MovieDetails, SearchResponse } from "./types";

const API_KEY = "64405bd2";

export const searchMovies = createAsyncThunk<
  MovieSearchResult[],
  string,
  { rejectValue: string }
>("movies/search", async (query, { rejectWithValue }) => {
  if (!query.trim()) return [];
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
        query
      )}`
    );
    if (!res.ok) throw new Error("Network error");
    const data: SearchResponse = await res.json();
    if (data.Response === "False") {
      return rejectWithValue(data.Error || "Фильмы не найдены");
    }
    return data.Search || [];
  } catch (err) {
    return rejectWithValue("Ошибка сети или API");
  }
});

export const fetchMovieDetails = createAsyncThunk<
  MovieDetails,
  string,
  { rejectValue: string }
>("movies/fetchDetails", async (imdbID, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
    );
    if (!res.ok) throw new Error("Network error");
    const data: MovieDetails = await res.json();
    if (data.Response === "False") {
      return rejectWithValue("Фильм не найден");
    }
    return data;
  } catch (err) {
    return rejectWithValue("Не удалось загрузить детали фильма");
  }
});

interface MoviesState {
  searchResults: MovieSearchResult[];
  selectedMovie: MovieDetails | null;
  favorites: MovieSearchResult[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  searchResults: [],
  selectedMovie: null,
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<MovieSearchResult>) {
      const exists = state.favorites.some(
        (fav) => fav.imdbID === action.payload.imdbID
      );
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (fav) => fav.imdbID !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка поиска";
        state.searchResults = [];
      });

    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка загрузки";
        state.selectedMovie = null;
      });
  },
});

export const { addToFavorites, removeFromFavorites, clearError } =
  moviesSlice.actions;
export default moviesSlice.reducer;
