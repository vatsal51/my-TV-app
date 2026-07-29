"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

export default function CreditDetailClient({ tvSeries, type }) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("prevId", tvSeries?.personDetails?.id || "");
        localStorage.setItem("prevType", type || "");
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, [tvSeries, type]);

  if (!tvSeries) return <div style={centerStyle}>NO DATA AVAILABLE</div>;

  return (
    <div className="container-xxl">
      <div className="row py-5 my-5">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <div className="card-details">
            <div className="card-details-wrapper">
              <div className="card-details-left">
                <Image
                  width={300}
                  height={450}
                  src={
                    tvSeries?.personDetails?.profile_path
                      ? `${img_300}/${tvSeries?.personDetails?.profile_path}`
                      : `${unavailable}?text=${tvSeries?.personDetails?.name}`
                  }
                  className="movie-poster"
                  id="movie-poster"
                  alt={`Poster for ${tvSeries?.personDetails?.name}`}
                />
              </div>
              <div className="card-details-right">
                <h1 className="text-white">{tvSeries?.personDetails?.name}</h1>
                <p className="text-white">{tvSeries.tagline}</p>
                <p className="text-white">
                  Overview:
                  {tvSeries?.personDetails?.biography
                    ? tvSeries?.personDetails?.biography
                    : "No overview available."}
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-white my-3">Movies Credits</h3>
          <div className="casts">
            {tvSeries?.movieCredits?.cast.map((el, i) => (
              <Link
                href={`/details?type=${type}&id=${el.id}`}
                as={`/details?type=${type}&id=${el.id}`}
                key={i}
                className="col-md-3 col-sm-4 py-3 casts-card text-decoration-none"
              >
                <div>
                  <Image
                    width={200}
                    height={300}
                    src={
                      el.poster_path
                        ? `${img_300}/${el.poster_path}`
                        : unavailable
                    }
                    alt={`${el.original_title || el.name} profile`}
                  />
                  <p className="text-white">
                    {el.original_title || el.name}
                    {el.character ? ` (${el.character})` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
