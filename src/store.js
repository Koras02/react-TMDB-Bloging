import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducer/movieReducer";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
