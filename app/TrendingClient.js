"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./pagination";
import CardLayout from "./CardLayout";

export default function TrendingClient({ initialItems = [] }) {
  const [trending, setTrending] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 1 && initialItems?.length) {
      setTrending(initialItems);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
      console.warn("TMDB API key is not configured.");
      setTrending([]);
      return;
    }

    let isActive = true;
    const controller = new AbortController();

    const fetchTrending = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch trending items: ${response.status}`);
        }

        const data = await response.json();

        if (isActive) {
          setTrending(data.results || []);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching trending items:", error);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchTrending();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page, initialItems]);

  return (
    <div className="container">
      <div className="row py-5 my-5">
        <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
          <i className="bi bi-fire mx-4 text-danger"></i>
          <h4 className="fs-2 text-white text-decoration">
            Trending Series Today
          </h4>
          <i className="bi bi-fire mx-4 text-danger"></i>
        </div>
        {loading ? (
          <div className="text-white text-center my-3">Loading...</div>
        ) : (
          <CardLayout state={trending} href="/details" />
        )}
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
}
