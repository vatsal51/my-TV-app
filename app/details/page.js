"use client"
import DetailsClient from "./DetailsClient";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "white",
};


import React, { useEffect, useState } from "react";
import { img_300, unavailable } from "../config";
import { useSearchParams } from "next/navigation";



export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const [tvSeries, setTvSeries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=credits`,
        );

        if (!response.ok) {
          console.error("Fetch failed:", response.status);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setTvSeries(data);
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

  return <DetailsClient tvSeries={tvSeries} type={type} />;
}
