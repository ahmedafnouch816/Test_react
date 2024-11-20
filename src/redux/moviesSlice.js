
import { movies$ } from '../movies'; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




// Charger les films
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const movies = await new Promise((resolve) => setTimeout(() => resolve(movies$), 100));
  return movies;
});
const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    filters: [],
    currentPage: 1, 
    moviesPerPage: 4, 
    status: 'idle',
    error: null,
  },
  reducers: {
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
    toggleLikeDislike: (state, action) => {
      const movie = state.movies.find((movie) => movie.id === action.payload);
      if (movie) {
        if (movie.liked) {
          movie.likes--;
          movie.dislikes++;
          movie.liked = false;
        } else {
          movie.likes++;
          movie.dislikes--;
          movie.liked = true;
        }
      }
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1; 
    },
    setPage: (state, action) => {
      state.currentPage = action.payload; 
    },
    setMoviesPerPage: (state, action) => {
      state.moviesPerPage = action.payload; 
      state.currentPage = 1; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.map((movie) => ({ ...movie, liked: false }));
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { deleteMovie, toggleLikeDislike, setFilters, setPage, setMoviesPerPage } = moviesSlice.actions;
export default moviesSlice.reducer;
