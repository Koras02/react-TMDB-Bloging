import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams(); // URL에서 영화 ID를 가져오기
  const [movie, setMovie] = useState(null); // 초기값 null
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovie(data);

      // 트레일러 정보 가져오기
      const videoResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
      );
      const videoData = await videoResponse.json();

      // 한국어 트레일러 구현
      const koreanTrailer = videoData.results.find(
        (video) => video.language === "ko" && video.type === "Trailer"
      );
      setTrailer(
        koreanTrailer ||
          videoData.results.find((video) => video.type === "Trailer") // 한국어 트레일러 없으면 기존 트레일러
      );
      // setTrailer(trailerVideo);
      setLoading(false);
    };

    fetchMovieDetail();
  }, [id, apiKey]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!movie) {
    return <div>정보 없음</div>;
  }

  return (
    <div class="movie-detail">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Data: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <div class="genres">
        <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
      </div>

      {/* 트레일러 구현 */}
      {trailer && (
        <div class="trailer">
          <h2>Watch the Trailer</h2>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
          ></iframe>
        </div>
      )}
      <a href="#" className="button">
        Watch Trailer
      </a>
    </div>
  );
};

export default MovieDetail;
