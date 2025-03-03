const initialState = {
  movies: [],
  movie: null,
  trailer: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "FETCH_MOVIE_DETAIL":
      return {
        ...state,
        movie: action.payload.movie,
        trailer: action.payload.trailer,
      };
    default:
      return state;
  }
};

export default movieReducer;
