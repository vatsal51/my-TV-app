"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
import { img_300, unavailable } from "../config";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "white",
};

export default function DetailsClient({ tvSeries, type }) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("prevId", tvSeries?.id || "");
        localStorage.setItem("prevType", type || "");
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, [tvSeries, type]);

  if (!tvSeries) return <div style={centerStyle}>NO DATA AVAILABLE</div>;

  const {
    poster_path,
    title,
    original_name,
    tagline,
    vote_average,
    genres,
    overview,
    credits,
  } = tvSeries;

  return (
    <div className="container-xxl">
      <div className="row py-5 my-5">
        <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline text-white">
          TV Series seasons and episodes
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <div className="card-details">
            <div className="card-details-wrapper">
              <div className="card-details-left">
                <Image
                  width={300}
                  height={450}
                  src={
                    poster_path
                      ? `${img_300}/${poster_path}`
                      : `${unavailable}?text=${title || original_name}`
                  }
                  className="movie-poster"
                  alt={title || original_name}
                />
              </div>
              <div className="card-details-right">
                <h1 className="text-white">{title || original_name}</h1>
                {tagline && <p className="text-white">{tagline}</p>}
                <p className="text-white rating">
                  Rating: {vote_average} <i className="bi bi-star-fill"></i>
                </p>
                {genres?.length > 0 && (
                  <h5 className="text-primary genre">
                    Genre:&nbsp;
                    {genres.map((g) => (
                      <span key={g.id} className="text-white me-2">
                        {g.name}
                      </span>
                    ))}
                  </h5>
                )}
                <p className="text-white">Overview: {overview}</p>
              </div>
            </div>
          </div>

          {credits?.cast?.length > 0 && (
            <>
              <h3 className="text-white my-3">Casts</h3>
              <div className="casts">
                {credits.cast.map((el) => (
                  <a
                    key={el.id}
                    href={`/credit-details?type=${type}&id=${el.id}`}
                    className="col-md-3 col-sm-4 py-3 casts-card text-decoration-none"
                  >
                    <div>
                      <Image
                        width={200}
                        height={300}
                        src={
                          el.profile_path
                            ? `${img_300}/${el.profile_path}`
                            : `${unavailable}?text=${el.name}`
                        }
                        alt={`${el.name} profile`}
                      />
                      <p className="text-white">
                        {el.name} {el.character && `(${el.character})`}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
