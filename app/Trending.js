"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./pagination";
import CardLayout from "./CardLayout";


const Trending = () => {
  
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const data = await fetch(`
  https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`);
    const dataJ = await data.json();
    setState(dataJ.results);
    localStorage.setItem("trendingData", JSON.stringify(dataJ.results));
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
            <i className="bi bi-fire mx-4 text-danger"></i>
            <h4 className="fs-2 text-white text-decoration-underline">
              Trending Series Today
            </h4>
            <i className="bi bi-fire mx-4 text-danger"></i>
          </div>
          <CardLayout state={state} href="/details" />
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};
export default React.memo(Trending);
