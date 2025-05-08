"use client";
// https://api.themoviedb.org/3/person/{person_id}/movie_credits - to get movies related to particular cast
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { img_300, unavailable, loading } from "../config";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

const CreditDetail = () => {
  const [tvSeries, setTvSeries] = useState({
    movieCredits: null,
    personDetails: null,
  });
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchTvSeriesDetails = async () => {
      try {
        const [movieCreditsResponse, personDetailsResponse] = await Promise.all(
          [
            fetch(
              `https://api.themoviedb.org/3/person/${id}/${type}_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=credits`
            ),
            fetch(
              `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
            ),
          ]
        );

        const movieCreditsData = await movieCreditsResponse.json();
        const personDetailsData = await personDetailsResponse.json();

        setTvSeries((prevTvSeries) => ({
          ...prevTvSeries,
          movieCredits: {
            cast: movieCreditsData.cast || [],
            crew: movieCreditsData.crew || [],
            id: movieCreditsData.id || null,
          },
          personDetails: {
            adult: personDetailsData.adult || false,
            also_known_as: personDetailsData.also_known_as || [],
            biography: personDetailsData.biography || "",
            birthday: personDetailsData.birthday || "",
            deathday: personDetailsData.deathday || null,
            gender: personDetailsData.gender || null,
            homepage: personDetailsData.homepage || "",
            id: personDetailsData.id || null,
            imdb_id: personDetailsData.imdb_id || "",
            known_for_department: personDetailsData.known_for_department || "",
            name: personDetailsData.name || "",
            place_of_birth: personDetailsData.place_of_birth || "",
            popularity: personDetailsData.popularity || null,
            profile_path: personDetailsData.profile_path || "",
          },
        }));

        localStorage.setItem("prevId", id);
        localStorage.setItem("prevType", type);
      } catch (error) {
        console.error("Error fetching TV series details:", error);
      }
    };

    fetchTvSeriesDetails();
  }, [id, type]);

  // if (!tvSeries.movieCredits || !tvSeries.personDetails) {
  //   return <div>Loading...</div>;
  // }

  return (
      <>
        <div className="container-xxl">
          <div className="row py-5 my-5">
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
                      src={`${img_300}/${tvSeries?.personDetails?.profile_path}`}
                      className="movie-poster"
                      id="movie-poster"
                      alt={`Poster for ${tvSeries?.personDetails?.name}`}
                    />
                  </div>
                  <div className="card-details-right">
                    <h1 className="text-white">
                      {tvSeries?.personDetails?.name}
                    </h1>
                    <p className="text-white">{tvSeries.tagline}</p>
                    <p className="text-white">
                      Overview: {tvSeries?.personDetails?.biography}{" "}
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
                    className="col-md-3 col-sm-4 py-3 casts-card"
                  >
                    <div>
                      <Image
                        width={200}
                        height={300}
                        src={
                          el.poster_path !== null
                            ? `${img_300}/${el.poster_path}`
                            : unavailable
                        }
                        alt={`${el.original_title} profile`}
                      />
                      <p className="text-white">
                        {el.original_title}
                        {el.character ? `(${el.character})` : ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </>
  );
};

export default CreditDetail;
