export const fetchMovieDetail = (id) => async (dispatch) => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  // const response = await fetch(
  //   `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  // );

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  const movieData = await movieResponse.json();

  // 트레일러 정보 가져오기
  const videoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  const videoData = await videoResponse.json();

  // 한국어 트레일러 검색
  const koreanTrailer = videoData.result.find(
    (video) => video.language === "ko" && video.type === "Trailer"
  );

  // 한국어 트레일러 없을 경우 영어 트레일러 대체
  const trailer =
    koreanTrailer ||
    videoData.results.find((video) => video.type === "Trailer");

  dispatch({
    type: "FETCH_MOVIE_DETAIL",
    payload: {
      movie: movieData,
      trailer: trailer ? trailer.key : null,
    },
  });
};

// 액션 생성자
export const fetchMovies = () => async (dispatch) => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY; // API 키 확인
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );
    const data = await response.json();

    console.log("Fetched movies data:", data); // API 응답 확인

    if (data.results && Array.isArray(data.results)) {
      dispatch({
        type: "FETCH_MOVIES",
        payload: data.results,
      });
    } else {
      console.error("Fetched data is not an array:", data.results);
      dispatch({
        type: "FETCH_MOVIES",
        payload: [],
      });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    dispatch({
      type: "FETCH_MOVIES",
      payload: [],
    });
  }
};
