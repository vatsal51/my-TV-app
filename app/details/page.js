"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { img_300, unavailable } from "../config";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "white",
};

const Details = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const [tvSeries, setTvSeries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=credits`
        );

        if (!response.ok) {
          console.error("Fetch failed:", response.status);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setTvSeries(data);
        localStorage.setItem("prevId", id || "");
        localStorage.setItem("prevType", type || "");
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && type) fetchDetails();
  }, [id, type]);

  if (isLoading) return <div style={centerStyle}>Loading...</div>;
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
                  src={poster_path ? `${img_300}/${poster_path}` : unavailable}
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
                  <Link
                    key={el.id}
                    href={`/credit-details?type=${type}&id=${el.id}`}
                    className="col-md-3 col-sm-4 py-3 casts-card"
                  >
                    <div>
                      <Image
                        width={200}
                        height={300}
                        src={
                          el.profile_path
                            ? `${img_300}/${el.profile_path}`
                            : unavailable
                        }
                        alt={`${el.name} profile`}
                      />
                      <p className="text-white">
                        {el.name} {el.character && `(${el.character})`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Details;
