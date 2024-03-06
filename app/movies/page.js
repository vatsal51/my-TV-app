// Movie.js
"use client"
import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "../pagination";
import Genre from "../Genre";
import CardLayout from "../CardLayout";

const Movie = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreIds = selectedGenres.map((g) => g.id).join(",");

  const updateSelectedGenres = (newSelectedGenres) => {
    setSelectedGenres(newSelectedGenres);
  };

  const fetchMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=6b99f46cc249aa0e4664f52a5c266bb4&include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreIds}`
      );

      const dataJ = await data.json();
      setState(dataJ.results);
      // localStorage.setItem("MoviesData", JSON.stringify(dataJ.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreIds]);

  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
            Movies
          </div>
          <Genre
            genres={genre}
            setGenre={setGenre}
            setPage={setPage}
            type="movie"
            selectedGenres={selectedGenres}
            updateSelectedGenres={updateSelectedGenres} 
          />
          <CardLayout state={state} href="/details" type="movie" />
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default Movie;
