"use client"
import React, { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import { img_300, unavailable } from "../config";
import Pagination from "../pagination";
import Genre from "../Genre";
import useGenre from "../useGenre";
import Header from "../Header";
import Footer from "../Footer";
import Link from "next/link";

const Movie = () => {

  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [value, setValue] = useState([]);
  // const [season, setSeason] = useState([])
  const genreURL = useGenre(value);

  const fetchTrending = async () => {
    const data = await fetch(`
      

https://api.themoviedb.org/3/movie/popular?api_key=6b99f46cc249aa0e4664f52a5c266bb4&page=${page}&with_genres=${genreURL}`);
    // https://api.themoviedb.org/3/discover/tv?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    const dataJ = await data.json();
    setState(dataJ.results);
   
  };
  useEffect(() => {
    fetchTrending();
  }, [page,genreURL ]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
            Movies
          </div>
          <Genre
            genre={genre}
            setGenre={setGenre}
            setPage={setPage}
            type="tv"
            value={value}
            setValue={setValue}
          />
          {state.map((Val) => {
            const {
              name,
              title,
              poster_path,
              first_air_date,
              release_date,
              media_type,
              vote_average,
              id,
            } = Val;

            return (
              <>
                <Link href={`/#`} as={`/#`} onClick={(e)=>e.preventDefault()} key={id}
                  // query: { seriesId: Val.id },
               
                   className="col-md-3 col-sm-4 py-3">
                  <div id="card" >
                    <div className="card bg-dark" >
                      <img
                        src={
                          poster_path ? `${img_300}/${poster_path}` : unavailable
                        }
                        className="card-img-top pt-3 pb-0 px-3"
                        alt={title || name}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-center fs-5">
                          {title || name} / {vote_average} <i className="bi bi-star-fill"></i>

                        </h5>
                        <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                          <div>{media_type === "movie" ? "Movie" : "TV"}</div>
                          <div>{first_air_date || release_date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Movie;