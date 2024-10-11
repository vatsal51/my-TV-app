"use client";

import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "../pagination";
import Genre from "../Genre";
import CardLayout from "../CardLayout";

const TV = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [value, setValue] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const updateSelectedGenres = (newSelectedGenres) => {
    setSelectedGenres(newSelectedGenres);
  };
  const genreIds = selectedGenres.map((g) => g.id).join(",");

  const fetchTvSeries = async () => {
    const data = await fetch(`
    https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreIds}`);
    // https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    const dataJ = await data.json();
    setState(dataJ.results);
    localStorage.setItem("TvData", JSON.stringify(dataJ.results));
  };
  useEffect(() => {
    const storedData = localStorage.getItem("TvData");
    fetchTvSeries();
  }, [page, genreIds]);
  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
            TV Series
          </div>
          <Genre
            genres={genre}
            setGenre={setGenre}
            setPage={setPage}
            type="tv"
            selectedGenres={selectedGenres}
            updateSelectedGenres={updateSelectedGenres}
          />
          <div className="card-container row">
            <CardLayout state={state} href="/details" type="tv" />
          </div>
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default TV;
