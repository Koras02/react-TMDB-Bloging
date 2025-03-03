import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../actions/movieActions";
import { Link } from "react-router-dom";
import "./MovieList.css";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies); // 상태에서 영화 목록 가져오기

  useEffect(() => {
    dispatch(fetchMovies()); // 영화 목록 가져오기
  }, [dispatch]);

  console.log("Current movies state:", movies);

  // movies가 배열인지 확인
  if (!Array.isArray(movies) || movies.length === 0) {
    return <div>영화 목록을 불러오는 중...</div>;
  }

  return (
    <div className="movie-list">
      <h1>Movies</h1>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
