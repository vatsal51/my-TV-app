"use client";
import { motion } from "framer-motion";
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { img_300, unavailable } from "../app/config";
import Pagination from "./pagination";
const Trending = () => {
  const [state, setState] = useState([]); //initializing the state variable as an empty array
  const [page, setPage] = useState(1); // initializing the page variable with value as 1 // page no: 1
  const fetchTrending = async () => {
    const data = await fetch(`
  https://api.themoviedb.org/3/trending/all/day?api_key=6b99f46cc249aa0e4664f52a5c266bb4&page=${page}`);
    // https://api.themoviedb.org/3/tv/top_rated?api_key=6b99f46cc249aa0e4664f52a5c266bb4&page=${page}`);
    const dataJ = await data.json(); // fetching data from API in JSON Format
    setState(dataJ.results); //storing that data in the state
  };

  useEffect(() => {
    fetchTrending(); //calling the fetchTrending function only during the initial rendering of the app.
  }, [page]);

  return (
    <>
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
            <i className="bi bi-fire mx-4 text-danger"></i>
            <h4 className="fs-2 text-white text-decoration-underline">
              Trending Series Today
            </h4>
            <i className="bi bi-fire mx-4 text-danger"></i>
          </div>
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
              <div
                key={Val.id}
                className="col-md-3 col-sm-4 py-3 justify-content-center g-4"
              >
                <div id="card">
                <div className="card bg-dark">
                  <Image
                    src={
                      poster_path ? `${img_300}/${poster_path}` : unavailable
                    }
                    width={500}
                    height={500}
                    className="card-img-top pt-3 pb-0 px-3"
                    alt={title}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center fs-5">
                      {title || name} / {parseFloat(vote_average).toFixed(1)}{" "}
                      <i className="bi bi-star-fill"></i>
                    </h5>
                    <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                      <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                      <div>{first_air_date || release_date}</div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
      </motion.div>
    </>
  );
};
export default Trending;
