// pages/[id]/index.js
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

const TvSeriesDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [tvSeries, setTvSeries] = useState(null);
  const fetchTvSeriesDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6b99f46cc249aa0e4664f52a5c266bb4&language=en-US&append_to_response=credits`
      );
      const data = await response.json();
      setTvSeries(data);
      console.log("series data", data);
    } catch (error) {
      console.error("Error fetching TV series details:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchTvSeriesDetails();
    }
  }, [id]);

  if (!tvSeries) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-xxl">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
            TV Series seasons and episodes
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className="card-details">
              <div className="card-details-wrapper">
                <div className="card-details-left">
                  <Image
                    width={300}
                    height={450}
                    src={
                      "https://image.tmdb.org/t/p/w300/" + tvSeries.poster_path
                    }
                    className="movie-poster"
                    id="movie-poster"
                    alt={tvSeries.name}
                  />
                </div>
                <div className="card-details-right">
                  <h1 className="text-white">{tvSeries.name}</h1>
                  <p className="text-white">{tvSeries.tagline}</p>
                  <p className="text-white rating">
                    (Rating: {tvSeries.vote_average}
                    <i className="bi bi-star-fill"></i>)
                  </p>
                  <h5 className="text-primary genre">
                    Genre:&nbsp;&nbsp;
                    {tvSeries.genres.map((val) => {
                      return (
                        <span className="text-white" key={val[id]}>
                          {val.name}
                        </span>
                      );
                    })}
                  </h5>
                  <p className="text-white">Overview: {tvSeries.overview} </p>
                </div>
              </div>
            </div>
            <h3 className="text-white my-3">Casts</h3>
            <div className="casts">
              {tvSeries.credits.cast.map((el, i) => (
                <div key={i}>
                  <Image
                    width={300}
                    height={450}
                    src={
                      el.profile_path !== null
                        ? `https://image.tmdb.org/t/p/w300/${el.profile_path}`
                        : "https://placehold.co/100x150"
                    }
                    alt={`${el.name} profile`}
                  />
                  <p className="text-white">
                    {el.name}({el.character})
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TvSeriesDetails;
