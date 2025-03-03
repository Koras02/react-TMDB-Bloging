import React from "react";
import MovieList from "./components/MovieList";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/[id]";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
};

export default App;
