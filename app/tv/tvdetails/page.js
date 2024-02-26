// pages/[id]/index.js
"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
// import { useRouter } from 'next/router';

const TvSeriesDetails = () => {
  // const router = useRouter();
  //  const { pathname } = router.asPath;
  // const id = pathname.split('/').pop();
  // const id = usePathname().split('/').pop();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  // router = router.split('/')[2]
  const [tvSeries, setTvSeries] = useState(null);
  const fetchTvSeriesDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=6b99f46cc249aa0e4664f52a5c266bb4&language=en-US&append_to_response=credits`
      ); // Replace with your API endpoint
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

  // Render TV series details, seasons, and episodes here

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
        <div className="container-xxl">
          <div className="row py-5 my-5">
            <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
              TV Series seasons and episodes
            </div>
            <div className="card-details">
              <div className="card-details-wrapper">
                <div className="card-details-left">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w300/" + tvSeries.poster_path
                    }
                    className="movie-poster"
                    id="movie-poster"
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
                <div>
                  <img
                    key={i}
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

            {/* <h2 className="text-white">Seasons</h2>
          <p className="text-white">{tvSeries.number_of_seasons}</p>
          <div className="d-flex flex-wrap gap-1">
            {tvSeries.seasons.map((val, i) => {
              return (
                <button className="btn btn-outline-primary" key={i}>
                  {val.name}{" "}
                </button>
              );
            })}
          </div>
         
          <h2 className="text-white">Episodes</h2>
          <p className="text-white">{tvSeries.number_of_episodes}</p> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TvSeriesDetails;
