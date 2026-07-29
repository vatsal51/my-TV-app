"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CreditDetailClient from "./CreditDetailClient";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "white",
};

export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const [tvSeries, setTvSeries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTvSeriesDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=${type}_credits`,
        );

        if (!response.ok) {
          console.error("Fetch failed:", response.status);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        const creditsKey = `${type}_credits`;
        const creditsData = data[creditsKey] ||
          data.movie_credits ||
          data.tv_credits || { cast: [], crew: [], id: null };

        setTvSeries({
          movieCredits: {
            cast: creditsData.cast || [],
            crew: creditsData.crew || [],
            id: creditsData.id || data.id || null,
          },
          personDetails: {
            adult: data.adult || false,
            also_known_as: data.also_known_as || [],
            biography: data.biography || "",
            birthday: data.birthday || "",
            deathday: data.deathday || null,
            gender: data.gender || null,
            homepage: data.homepage || "",
            id: data.id || null,
            imdb_id: data.imdb_id || "",
            known_for_department: data.known_for_department || "",
            name: data.name || "",
            place_of_birth: data.place_of_birth || "",
            popularity: data.popularity || null,
            profile_path: data.profile_path || "",
          },
        });
      } catch (error) {
        console.error("Error fetching TV series details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && type) fetchTvSeriesDetails();
  }, [id, type]);

  if (isLoading) return <div style={centerStyle}>Loading...</div>;
  if (!tvSeries) return <div style={centerStyle}>NO DATA AVAILABLE</div>;

  return <CreditDetailClient tvSeries={tvSeries} type={type} />;
}
