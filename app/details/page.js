"use client";
// https://api.themoviedb.org/3/person/{person_id}/movie_credits - to get movies related to particular cast
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState, memo } from "react";
import { useSearchParams } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

const Details = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [tvSeries, setTvSeries] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("prevId");
    const storedType = localStorage.getItem("prevType");
    if (id && id === storedId && type === storedType) {
      const storedData = localStorage.getItem(`data_${id}_${type}`);
      if (storedData) {
        setTvSeries(JSON.parse(storedData));
        return;
      }
    }
    const fetchTvSeriesDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=6b99f46cc249aa0e4664f52a5c266bb4&language=en-US&append_to_response=credits`
        );
        const data = await response.json();
        setTvSeries(data);
        localStorage.setItem("prevId", id);
        localStorage.setItem("prevType", type);
        localStorage.setItem(`data_${id}_${type}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching TV series details:", error);
      }
    };

    fetchTvSeriesDetails();
  }, [id, type]);

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
                    alt={tvSeries.title}
                  />
                </div>
                <div className="card-details-right">
                  <h1 className="text-white">{tvSeries.title}</h1>
                  <p className="text-white">{tvSeries.tagline}</p>
                  <p className="text-white rating">
                    (Rating: {tvSeries.vote_average}
                    <i className="bi bi-star-fill"></i>)
                  </p>
                  <h5 className="text-primary genre">
                    Genre:&nbsp;&nbsp;
                    {tvSeries.genres.map((val, i) => {
                      return (
                        <span className="text-white" key={i}>
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

export default Details;
