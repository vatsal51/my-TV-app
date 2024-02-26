"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./pagination";
import CardLayout from "./CardLayout";

const Trending = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    console.log("trending call");
    const data = await fetch(`
  https://api.themoviedb.org/3/trending/all/day?api_key=6b99f46cc249aa0e4664f52a5c266bb4&page=${page}`);
    // https://api.themoviedb.org/3/tv/top_rated?api_key=6b99f46cc249aa0e4664f52a5c266bb4&page=${page}`);
    const dataJ = await data.json();
    setState(dataJ.results);
    localStorage.setItem("trendingData", JSON.stringify(dataJ.results));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("trendingData");
    if (storedData) {
      setState(JSON.parse(storedData));
    } else {
      fetchTrending();
    }
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
          <CardLayout state={state} />
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};
export default React.memo(Trending);
